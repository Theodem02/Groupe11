'use client';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainUserModel, PlainUserBooksModel } from '@/models'; // Assurez-vous d'importer les types appropriés
import Link from 'next/link';

const UsersPage: FC = () => {
    const [users, setUsers] = useState<PlainUserModel[]>([]);
    const [usersBooks, setUsersBooks] = useState<PlainUserBooksModel[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [bookSearchTerm, setBookSearchTerm] = useState<string>(''); // Nouvel état pour le terme de recherche de livre

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<PlainUserModel[]>('http://localhost:3001/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchUsersBooks = async () => {
            try {
                const response = await axios.get<PlainUserBooksModel[]>('http://localhost:3001/usersBooks');
                setUsersBooks(response.data);
            } catch (error) {
                console.error('Error fetching users books:', error);
            }
        };

        fetchUsers();
        fetchUsersBooks();
    }, []);

    const handleUserSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
    };

    const handleBookSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setBookSearchTerm(term);
    };

    // Filtrer les utilisateurs en fonction du terme de recherche
    const filteredUsers = users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(searchTerm);
    });

    // Filtrer les utilisateurs en fonction du livre
    const usersWithBook = bookSearchTerm
        ? usersBooks
            .filter((userBook) => userBook.book.name.toLowerCase().includes(bookSearchTerm))
            .map((userBook) => userBook.user.id)
        : users.map((user) => user.id);

    const filteredUsersWithBook = filteredUsers.filter((user) => usersWithBook.includes(user.id));

    return (
        <div>
            {/* Barre de recherche pour les utilisateurs */}
            <input
                type="text"
                placeholder="Rechercher un utilisateur"
                value={searchTerm}
                onChange={handleUserSearch}
                className="w-1/4 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 m-4"
            />

            {/* Barre de recherche pour les livres */}
            <input
                type="text"
                placeholder="Rechercher un livre"
                value={bookSearchTerm}
                onChange={handleBookSearch}
                className="w-1/4 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 m-4"
            />

            <ul>
                {filteredUsersWithBook.map((user) => (
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`}>
                            {user.firstName} {user.lastName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;
