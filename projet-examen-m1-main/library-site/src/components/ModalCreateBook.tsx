// ModalCreateBook.tsx
import React, { useState } from 'react';
import { PlainBookModel } from '../models/book.model';
import { PlainAuthorModel } from '../models/author.model';

interface ModalCreateBookProps {
  onClose: () => void;
  onCreateBook: (newBook: PlainBookModel) => void;
  authors: PlainAuthorModel[];
  /*genres: {
    id: string;
    name: string;
  }[]*/
}

const ModalCreateBook: React.FC<ModalCreateBookProps> = ({ onClose, onCreateBook, authors/*, genres*/ }) => {
  const [bookData, setBookData] = useState({
    name: "",
    writtenOn: "",
    authorId: "",
    author: {
        id: "",
        firstName: "",
        lastName: "",
    },
    bookGenres: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(name == "authorId"){
        const selectedAuthor = authors.find((author) => author.id === value);
        if (selectedAuthor) {
            // Mettez à jour les propriétés de l'auteur
            setBookData((prevData) => ({
              ...prevData,
              authorId: selectedAuthor.id,
              author: {
                id: selectedAuthor.id,
                firstName: selectedAuthor.firstName,
                lastName: selectedAuthor.lastName,
              },
            }));
        } else {
            // Pour les autres champs, mettez à jour normalement
            setBookData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
        }
    }

    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateBook = () => {
    
    const { name, writtenOn, authorId } = bookData;

    onCreateBook(bookData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-1/3 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Créer un nouveau livre</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Titre du livre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={bookData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="writtenOn" className="block text-sm font-medium text-gray-700">
            Année de publication
          </label>
          <input
            type="text"
            id="writtenOn"
            name="writtenOn"
            value={bookData.writtenOn}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="authorId" className="block text-sm font-medium text-gray-700">
            Sélectionner un auteur
          </label>
          <select
            id="authorId"
            name="authorId"
            value={bookData.authorId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="-1">Sélectionner un auteur</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.firstName} {author.lastName}
              </option>
            ))}
          </select>
        </div>
        {/*<div className="mb-4">
          <label htmlFor="genreId" className="block text-sm font-medium text-gray-700">
            Sélectionner un genre
          </label>
          <select
            id="genreId"
            name="genreId"
            value={bookData.authorId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="-1">Sélectionner un genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
            </div>*/}
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
            onClick={handleCreateBook}
          >
            Créer
          </button>
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateBook;
