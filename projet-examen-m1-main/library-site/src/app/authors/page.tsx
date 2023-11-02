'use client';

import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainAuthorModel } from '@/models';

const AuthorsPage: FC = () => {
  const [authors, setAuthors] = useState<PlainAuthorModel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // État du terme de recherche

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

  return (
    <div>
      <h1>Authors</h1>
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un auteur"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredAuthors.map((author) => (
          <li key={author.id}>
            {author.id} - {author.firstName} {author.lastName} 
            <img src={author.photoUrl} alt={author.firstName}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsPage;
