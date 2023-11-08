'use client';

import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainUserModel, PlainBookModel } from '@/models';
import { useParams } from 'next/navigation';

const UserDetailsPage: FC = () => {
    const { id } = useParams<{ id: string }>(); // Récupérez l'ID de l'utilisateur à partir de l'URL
    const [userDetails, setUserDetails] = useState<PlainUserModel | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupérer les détails de l'utilisateur en utilisant l'ID de l'utilisateur
                const userResponse = await axios.get<PlainUserModel>(`http://localhost:3001/users/${id}`);
                setUserDetails(userResponse.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!userDetails) {
        return <p>Loading...</p>;
    }
    return (
        <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">User Details</h1>
            <div className="p-4 border border-gray-300 rounded-lg text-center">
                <p className="font-bold">
                    {userDetails.lastName} {userDetails.firstName}
                </p>
                <p>Livres loués par l'utilisateur :</p>
                <ul>
                </ul>
            </div>
        </div>
    );
};

export default UserDetailsPage;
