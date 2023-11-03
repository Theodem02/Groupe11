'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, Typography, Grid } from '@mui/material';
//import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainAuthorModel, PlainBookModel } from '../../../models';
import Link from '@mui/material/Link';

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();
  const [authorDetails, setAuthorDetails] = useState<PlainAuthorModel | null>(null);
  const [authorBooks, setAuthorBooks] = useState<PlainBookModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les détails de l'auteur
        const authorResponse = await axios.get<PlainAuthorModel>(`http://localhost:3001/authors/${id}`);
        setAuthorDetails(authorResponse.data);

        // Récupérer la liste des livres de l'auteur
        const booksResponse = await axios.get<PlainBookModel[]>(`http://localhost:3001/books?authorId=${id}`);
        setAuthorBooks(booksResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!authorDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Author Details</h1>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card className="transition duration-300 ease-in-out transform hover:scale-105">
            <CardContent>
              <Typography variant="h5" component="div">
                {authorDetails.firstName} {authorDetails.lastName}
              </Typography>
              {authorDetails.photoUrl && (
                <img src={authorDetails.photoUrl} alt={`${authorDetails.firstName} ${authorDetails.lastName}`} className="rounded-full overflow-hidden w-48 h-48 mx-auto mt-4" />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="transition duration-300 ease-in-out transform hover:scale-105">
            <CardContent>
              <Typography variant="h5" component="div">
                Books by {authorDetails.firstName} {authorDetails.lastName}
              </Typography>
              <ul className="list-disc mt-2">
                {authorBooks.map((book) => (
                  <li key={book.id} className="mb-2">
                    <Link href={`/books/${book.id}`}>
                      <a className="text-blue-500 hover:underline">{book.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthorDetailsPage;
