'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainAuthorModel, PlainBookModel } from '../../../models';
import Link from '@mui/material/Link';
import ModalDeleteBook from '@/components/ModalDeleteBook';
import ModalDeleteAuthor from '@/components/ModalDeleteAuthor';
import ModalAddBookToAuthor from '@/components/ModalAddBookToAuthor';
import ModalCreateBookAuthor from '@/components/ModalCreateBookAuthor';

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();
  const [authorDetails, setAuthorDetails] = useState<PlainAuthorModel | null>(null);
  const [authorBooks, setAuthorBooks] = useState<PlainBookModel[]>([]);
  const [books , setBooks] = useState<PlainBookModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false) ;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isModalOpenBook, setIsModalOpenBook] = useState(false) ; 
  const [showCreateModal1, setShowCreateModal1] = useState(false);

  // Liste des genres
  const [genres, setGenre] = useState<{id: string, name: string}[]>([]); // Liste des genres depuis la base de données
  
    // pour afficher/enlever la modale d'ajout de livre : 
  
    const openCreateModal = () => {
      setShowCreateModal(true);
    };
    const closeCreateModal = () => {
      setShowCreateModal(false);
    };

    const openCreateModal1 = () => {
      setShowCreateModal1(true);
    };
    const closeCreateModal1 = () => {
      setShowCreateModal1(false);
    };

  // gerer les fermetures et ouvertures de la modale pour addBook :

  const openModal = () =>{

    setIsModalOpen(true);
  }

  const closeModal =()=>{

    setIsModalOpen(false);
  }

  const Addbook= () => {
    
  }

  // modale pour supprimer un livre :

  
  const openModalBook = () =>{
    setIsModalOpenBook(true);
  }

  const closeModalBook =()=>{

    setIsModalOpenBook(false);
  }

  const onDeleteBook = (bookId: string) => {
    axios.post(`http://localhost:3001/books/delete/${bookId}`)
      .then((response) => {
        closeModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
      });
  }

  const onDeleteAuthor = () => {
    axios.post(`http://localhost:3001/authors/delete/${id}`)
      .then((response) => {
        closeModal();
        window.location.href = '/authors';
      })
      .catch((error) => {
        console.error('Error deleting author:', error);
      });
  }

  const CreatebookAuthor = (newBook: PlainBookModel) => {
    newBook.authorId = authorDetails ? authorDetails.id: "";
    newBook.author.firstName = authorDetails ? authorDetails.firstName: "";
    newBook.author.lastName = authorDetails ? authorDetails.lastName: "";
    newBook.author.id = authorDetails ? authorDetails.id: "";
    console.log(newBook);
    
    
    axios.post('http://localhost:3001/books', newBook);
    // Don't forget to close the modal afterward.
    closeCreateModal();
    window.location.reload();
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les détails de l'auteur en utilisant l'ID de l'auteur
        const authorResponse = await axios.get<PlainAuthorModel>(`http://localhost:3001/authors/${id}`);
        setAuthorDetails(authorResponse.data);

        // Récupérer la liste complète de tous les livres
        const allBooksResponse = await axios.get<PlainBookModel[]>(`http://localhost:3001/books`);
        setBooks(allBooksResponse.data);

        // Filtrer les livres pour ne garder que ceux de l'auteur actuel
        const authorBooksData = allBooksResponse.data.filter((book) => book.authorId === id);
        setAuthorBooks(authorBooksData);

        // Récupérer la liste des genres
        axios.get<{id: string, name: string}[]>('http://localhost:3001/genres').then((response) => {
          const genreData = response.data;
          setGenre(genreData);
        });
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
  console.log(authorDetails);
  console.log(authorBooks); 
  
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
                <img
                  src={authorDetails.photoUrl}
                  alt={`${authorDetails.firstName} ${authorDetails.lastName}`}
                  className="rounded-full overflow-hidden w-48 h-48 mx-auto mt-4"
                />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="transition duration-300 ease-in-out transform hover:scale-105">
            <CardContent>
              <Typography variant="h5" component="div">
                {authorBooks.length} Books by {authorDetails.firstName} {authorDetails.lastName}
              </Typography>
              <ul className="list-none mt-2">
                {authorBooks.map((book) => (
                  <li key={book.id} className="mb-2">
                    <Link href={`/books/${book.id}`}>
                      <a className="text-gray-500 ">{book.name}</a>
                    </Link>
                    <button className="block mx-auto bg-red-500 text-white py-2 px-4 rounded"
                    onClick={openModalBook}
                    >Supprimer le livre</button>
                    {isModalOpenBook && (<ModalDeleteBook onClose={closeModalBook} onDelete={() => onDeleteBook(book.id)}/>)}
                    
                  </li>
                ))}
              </ul>
              
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md text-center">
  </div>
  <button className="block mx-auto bg-red-500 text-white py-2 px-4 rounded"
  onClick={openModal}
  >Supprimer l'auteur</button>
  {isModalOpen && (<ModalDeleteAuthor onClose={closeModal} onDelete={onDeleteAuthor}/>)}

   <button
          className="bg-green-400 text-white py-1 px-1 rounded-md m-4"
          onClick={openCreateModal}
          >Ajouter un livre </button>
          { showCreateModal && ( <ModalAddBookToAuthor onClose={closeCreateModal} onCreateBookToAuthor={Addbook} books={books}/>
          )}
  <button
    className="bg-green-400 text-white py-1 px-1 rounded-md m-4"
    onClick={openCreateModal1}>
    Créer un livre
    </button>
          { showCreateModal1 && ( <ModalCreateBookAuthor onClose={closeCreateModal1} onCreateBook={CreatebookAuthor} genres={genres}/>
          )}
    </div>
  );
};

export default AuthorDetailsPage;