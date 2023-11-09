'use client';

// Importez les dépendances nécessaires
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainUserBooksModel } from '@/models';
import { useParams } from 'next/navigation';
import ModalDeleteUser from '@/components/ModalDeleteUser';
import ModalDeleteBookRent from '@/components/ModalDeleteBookRent';
import React from 'react';

// Définissez le composant UserDetailsPage
const UserDetailsPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [userBooks, setUserBooks] = useState<PlainUserBooksModel[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenBook, setIsModalOpenBook] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);


    // Fonction pour ouvrir la modal de suppression
    const openModal = () => {
        setIsModalOpen(true);
    }

    // Fonction pour fermer la modal
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const openModalBook = (bookId: number) => {
        setSelectedBookId(bookId);
        setIsModalOpenBook(true);
    }

    const closeModalBook = () => {
        setSelectedBookId(null);
        setIsModalOpenBook(false);
    }


    // Fonction pour supprimer l'utilisateur
    const onDeleteUser = () => {
        axios.post(`http://localhost:3001/users/delete/${id}`)
            .then((response) => {
                closeModal();
                window.location.href = '/users';
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    }

    // Fonction pour supprimer le livre loué
    const onDeleteBook = () => {
        if (selectedBookId) {
            axios.post(`http://localhost:3001/usersBooks/delete/${selectedBookId}`)
                .then((response) => {
                    closeModalBook();
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error deleting book:', error);
                });
        }
    }

    // Effet pour récupérer les livres loués par l'utilisateur
    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                // Récupérer les livres loués par l'utilisateur à partir de localhost:3001/usersBooks
                const userBooksResponse = await axios.get<PlainUserBooksModel[]>('http://localhost:3001/usersBooks');
                // Filtrer les livres pour ceux qui appartiennent à l'utilisateur avec l'ID correspondant
                const booksForUser = userBooksResponse.data.filter(userBook => userBook.user.id === id);
                setUserBooks(booksForUser);
            } catch (error) {
                console.error('Erreur lors de la récupération des livres :', error);
            }
        };

        if (id) {
            fetchUserBooks();
        }
    }, [id]);

    // Affichage conditionnel en attendant le chargement des données
    if (!userBooks) {
        return <p>Loading...</p>;
    }

    // Si userBooks est un tableau vide
    if (userBooks.length === 0) {
        return <p>Aucun livre loué par cet utilisateur.</p>;
    }

    // Rendu de la page avec les livres loués par l'utilisateur
    return (
        <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">User Details</h1>
            <div className="p-4 border border-gray-300 rounded-lg text-center">
                <p>{userBooks.length > 0
                    ? `Livres loués par ${userBooks[0].user.firstName} ${userBooks[0].user.lastName} :`
                    : "Aucun livre loué"}
                </p>
                <ul>
                    {userBooks.map(userBook => (
                        <li key={userBook.id}>{userBook.book.name}
                        <button className="block mx-auto bg-red-500 text-white py-2 px-4 rounded"
                        onClick={() => openModalBook(parseInt(userBook.id))}
                        >Supprimer le livre</button>
                        {isModalOpenBook && (<ModalDeleteBookRent onClose={closeModalBook} onDelete={onDeleteBook}/>)}
                        </li>
                        
                    ))}
                </ul>
            </div>
            <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={openModal}
            >
                Supprimer l'utilisateur
            </button>
            {isModalOpen && (
                <ModalDeleteUser onClose={closeModal} onDelete={onDeleteUser} />
            )}
        </div>
    );
};

// Exportez le composant UserDetailsPage
export default UserDetailsPage;
