// ModalCreateBook.tsx
import React, { useState } from 'react';
import { PlainBookModel } from '../models/book.model';
import { PlainAuthorModel } from '../models/author.model';

interface ModalCreateBookProps {
  onClose: () => void;
  onCreateBook: (newBook: PlainBookModel) => void;
  genres: {
    id: string;
    name: string;
  }[]
}

const ModalCreateBookAuthor: React.FC<ModalCreateBookProps> = ({ onClose, onCreateBook, genres }) => {
  const [bookData, setBookData] = useState({
    name: "",
    writtenOn: "",
    authorId: "",
    author: {
        id: "",
        firstName: "",
        lastName: "",
    },
    genreId: "",
    genres: [{
      id: "",
      name: "",
    }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "genreId"){
      setBookData((prevData) => ({
        ...prevData,
        genres: [{
          id: value,
          name: genres.find((genre) => genre.id === value)?.name || "",
        }],
      }));
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
          <label htmlFor="genreId" className="block text-sm font-medium text-gray-700">
            Sélectionner un genre
          </label>
          <select
            id="genreId"
            name="genreId"
            value={bookData.genreId}
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
            </div>
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

export default ModalCreateBookAuthor;
