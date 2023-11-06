'use client';

import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainUserModel } from '@/models';
import Link from 'next/link';

const UsersPage: FC = () => {
    const [users, setUsers] = useState<PlainUserModel[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<PlainUserModel[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3001/users').then((response) => {
            if (Array.isArray(response.data)) {
                const usersData: PlainUserModel[] = response.data;
                setUsers(usersData);
            } else {
                console.error('Les données renvoyées ne sont pas un tableau valide.');
            }
        }).catch((error) => {
            console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
        });
    }, []);

    useEffect(() => {
        const filteredUsers = users.filter((user) =>
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredUsers);
    }, [searchTerm, users]);

    return (
        <div>
            <h1 className="text-3xl font-bold w-full flex justify-center">Users</h1>

            <input
                type="text"
                placeholder="Rechercher un utilisateur"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-1/4 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 m-4"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((user) => (
                    <Link href={`/users/${user.id}`} key={user.id}>
                        <div className="p-4 border border-gray-300 rounded-lg text-center">
                            <p className="font-bold">
                                {user.lastName} {user.firstName}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default UsersPage;
