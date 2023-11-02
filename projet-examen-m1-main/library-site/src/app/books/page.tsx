'use client';

import React, { FC, useEffect, useState } from 'react';
import { PlainBookModel } from '../../models/book.model';
import axios from 'axios';
import Link from 'next/link';

const BooksPage: FC = () => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<PlainBookModel[]>([]);

  useEffect(() => {
    axios.get<PlainBookModel[]>('http://localhost:3001/books').then((response) => {
      const bookData = response.data;
      setBooks(bookData);
      setFilteredBooks(bookData);
    });
  }, []);

  const handleSort = () => {
    const sortedBooks = [...filteredBooks];
    sortedBooks.sort((a, b) =>
      sortBy === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    setFilteredBooks(sortedBooks);
  };

  const handleSortById = () => {
    const sortedBooks = [...filteredBooks];
    sortedBooks.sort((a, b) =>
      sortBy === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    );
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    setFilteredBooks(sortedBooks);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === '') {
      setFilteredBooks(books);
    } else {
      const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchTerm)
      );
      setFilteredBooks(filteredBooks);
    }

    setSearchTerm(searchTerm);
  };

  return (
    <>
      <h1 className="text-3xl font-bold w-full flex justify-center">Books</h1>
     
      <button  className="bg-red-400 text-white py-1 px-1 rounded-md m-4 " onClick={handleSort}> Trier par ordre alphabétique </button> &ensp;
      <button className="bg-blue-400 text-white py-1 px-1 rounded-md m-4" onClick={handleSortById}>Trier par id</button>
      <input  className="w-1/4 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 m-4"
        type="text"
        placeholder="Rechercher par nom"
        value={searchTerm}
        onChange={handleSearch}
      />
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
          {filteredBooks.map((book) => (
            <Link href={`/books/${book.id}`}>

              <li key={book.id} className="m-4" >
                <div className="p-4 border border-gray-300 rounded-lg h-[200px]" > 
                  <p  className="text-lg font-semibold">{book.name} </p>
                  <p>ID: {book.id}</p>
                  <p>Année de publication: {book.writtenOn}</p>
                  <p>Prénom de l'auteur: {book.author.firstName}</p>
                  <p>Nom de l'auteur: {book.author.lastName}</p>
                </div>
              </li>
            </Link>
            ))}
        </ul>
    </>
  );
};
export default BooksPage;
