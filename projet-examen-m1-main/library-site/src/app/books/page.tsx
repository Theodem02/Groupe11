'use client';

import React, { FC, ReactElement, useEffect, useState } from 'react';
import { PlainBookModel } from '../../models/book.model';
import axios from 'axios';

const BooksPage: FC = () => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<PlainBookModel[]>([]);

  useEffect(() => {
    // Effectue une requête GET pour récupérer les livres depuis votre API
    axios.get('http://localhost:3001/books').then((response) => {
      const bookData = response.data;
      setBooks(bookData);
      setFilteredBooks(bookData);
    });
  }, []);

  const handleSort = () => {
    const sortedBooks = [...filteredBooks];
    // Tri par ordre alphabétique
    sortedBooks.sort((a, b) => (sortBy === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    setFilteredBooks(sortedBooks);
  };

  const handleSortById = () => {
    const sortedBooks = [...filteredBooks];
    // Tri par id
    sortedBooks.sort((a, b) => (sortBy === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)));
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    setFilteredBooks(sortedBooks);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
  
    // Si le champ de recherche est vide, revenez à la liste complète
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
      <h1>Books</h1>
      <button onClick={handleSort}>Trier par ordre alphabétique</button> &ensp;
      <button onClick={handleSortById}>Trier par id</button>
      <input
        type="text"
        placeholder="Rechercher par nom"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            {book.id} - {book.name} - {book.writtenOn}
          </li>
        ))}
      </ul>
    </>
  );
};

export default BooksPage;
