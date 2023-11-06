'use client';

import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainBookModel } from '../../../models/book.model';

const BooksDetailsPage: FC = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState<PlainBookModel | null>(null);

  useEffect(() => {
    if (id) {
      axios.get<PlainBookModel>(`http://localhost:3001/books/${id}`)
        .then((response) => {
          setBookDetails(response.data);
        })
        .catch((error) => {
          console.error('Error fetching book details:', error);
        });
    }
  }, [id]);
  console.log(bookDetails);
  if (!bookDetails) {
    return <p>Loading...</p>;
  }

  return (
    
    
    <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md text-center">
    <h1 className="text-2xl font-bold mb-2 text-gray-800">Book Details</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col justify-center items-center">
        <div className="text-lg text-gray-600">
          <span className="font-semibold">ID:</span> {bookDetails.id}
        </div>
        <div className="text-lg text-gray-600">
          <span className="font-semibold">Name:</span> {bookDetails.name}
        </div>
        <div className="text-lg text-gray-600">
          <span className="font-semibold">Author First Name:</span> {bookDetails.author.firstName}
        </div>
        <div className="text-lg text-gray-600">
          <span className="font-semibold">Written On:</span> {bookDetails.writtenOn}
        </div>
        <div className="text-lg text-gray-600">
          <span className="font-semibold">Author Last Name:</span> {bookDetails.author.lastName}
        </div>
        <div className="text-lg text-gray-600">
          <span className="font-semibold">Genre:</span> {bookDetails.genres.length > 0 ? bookDetails.genres[0].name : ''}
        </div>
      </div>
      <div className="rounded-full overflow-hidden mx-auto w-48 h-48">
        <img className="object-cover w-full h-full" src={bookDetails.author.photoUrl} alt={bookDetails.author.firstName} />
      </div>

    </div>
  </div>
  
  );
};

export default BooksDetailsPage;