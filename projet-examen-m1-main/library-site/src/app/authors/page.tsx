'use client';

import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainAuthorModel } from '@/models';
import Link from 'next/link';
import ModalCreateAuthor from '@/components/ModalCreateAuthor';

const AuthorsPage: FC = () => {
  const [authorsWithBookCount, setAuthorsWithBookCount] = useState<PlainAuthorModel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // État du terme de recherche
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/authors').then((response) => {
      if (Array.isArray(response.data)) {
        const authorsData: PlainAuthorModel[] = response.data;
        const authorsWithCount: PlainAuthorModel[] = [];

        authorsData.forEach((author) => {
          axios.get(`http://localhost:3001/books/author/${author.id}`).then((booksResponse) => {
            const bookCount = booksResponse.data.length;
            const authorWithCount: PlainAuthorModel = { ...author, bookCount };
            authorsWithCount.push(authorWithCount);

            if (authorsWithCount.length === authorsData.length) {
              setAuthorsWithBookCount(authorsWithCount);
            }
          });
        });
      } else {
        console.error('Les données renvoyées ne sont pas un tableau valide.');
      }
    }).catch((error) => {
      console.error('Une erreur s\'est produite lors de la récupération des auteurs :', error);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  // Filtrer les auteurs en fonction du terme de recherche
  const filteredAuthors = authorsWithBookCount.filter((author) => {
    const fullName = `${author.firstName} ${author.lastName}`.toLowerCase();
    return fullName.includes(searchTerm);
  });

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold w-full flex justify-center">Authors</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un auteur"
        value={searchTerm}
        onChange={handleSearch}
        className="w-1/4 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 m-4"
      />
      <button className="bg-green-400 text-white py-1 px-1 rounded-md m-4" onClick={openCreateModal}>
        Créer un auteur
      </button>
      {showCreateModal && <ModalCreateAuthor onClose={closeCreateModal} />}
      {/* Liste des auteurs filtrés */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAuthors.map((author) => (
          <Link href={`/authors/${author.id}`} key={author.id}>
            <li className="p-4 border border-gray-300 rounded-lg text-center">
              <div className="rounded-full overflow-hidden mx-auto w-24 h-24">
                <img src={author.photoUrl} alt={`${author.firstName} ${author.lastName}`} />
              </div>
              <p className="mt-2 font-bold">
                {author.id} - {author.firstName} {author.lastName} ({author.bookCount} books)
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsPage;
