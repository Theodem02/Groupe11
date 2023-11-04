'use client';

import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainAuthorModel } from '@/models';
import Link from 'next/link';
import ModalCreateBook from '@/components/ModalCreateBook';
import ModalCreateAuthor from '@/components/ModalCreateAuthor';

const AuthorsPage: FC = () => {
  const [authors, setAuthors] = useState<PlainAuthorModel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // État du terme de recherche
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/authors', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAuthors(response.data);
        } else {
          console.error('Les données renvoyées ne sont pas un tableau valide.');
        }
      })
      .catch((error) => {
        console.error('Une erreur s\'est produite lors de la récupération des auteurs :', error);
      });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };  

  // Filtrer les auteurs en fonction du terme de recherche
  const filteredAuthors = authors.filter((author) => {
    const fullName = `${author.firstName} ${author.lastName}`.toLowerCase();
    return fullName.includes(searchTerm);
  });

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const createAuthor = (newAuthor: PlainAuthorModel) => {
    axios.post('http://localhost:3001/authors', newAuthor).then((response) => {
      const authorData = response.data;
      setAuthors([...authors, authorData]);
    });
    closeCreateModal();
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
      <button className="bg-green-400 text-white py-1 px-1 rounded-md m-4" onClick={openCreateModal}>Creer un auteur</button>
      {showCreateModal && (
        <ModalCreateAuthor onClose={closeCreateModal} onCreateAuthor={createAuthor}/>
      )}
      {/* Liste des auteurs */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAuthors.map((author) => (
          <Link href={`/authors/${author.id}`}>
          <li key={author.id} className="p-4 border border-gray-300 rounded-lg text-center">
            <div className="rounded-full overflow-hidden mx-auto w-24 h-24">
            <img src={author.photoUrl} alt={author.firstName}/>
            </div>
            <p className="mt-2 font-bold"> {author.id} - {author.firstName} {author.lastName} </p> 
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsPage;
