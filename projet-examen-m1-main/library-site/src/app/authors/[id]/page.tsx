'use client';

import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainAuthorModel } from '../../../models/author.model'; // Assurez-vous d'importer le modèle approprié pour l'auteur

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();
  const [authorDetails, setAuthorDetails] = useState<PlainAuthorModel | null>(null);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get<PlainAuthorModel>(`http://localhost:3001/authors/${id}`);
        setAuthorDetails(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'auteur :', error);
      }
    };

    if (id) {
      fetchAuthorDetails();
    }
  }, [id]);

  if (!authorDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Author Details</h1>
      <div className="flex flex-col justify-center items-center">
        <div className="text-lg text-gray-600">
          <span className="font-semibold">First Name:</span> {authorDetails.firstName}
        </div>
        <div className="text-lg text-gray-600">
          <span className="font-semibold">Last Name:</span> {authorDetails.lastName}
        </div>
        {authorDetails.photoUrl && (
          <img src={authorDetails.photoUrl} alt={`${authorDetails.firstName} ${authorDetails.lastName}`} className="rounded-fulloverflow-hidden w-29 h-29 mx-auto" />
        )}
        {/* Ajoutez d'autres détails de l'auteur ici */}
      </div>
    </div>
  );
};

export default AuthorDetailsPage;
