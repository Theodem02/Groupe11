import React, {useState} from "react";
import { PlainAuthorModel } from "../models/author.model";

interface ModalCreateAuthorProps {
    onClose: () => void;
    onCreateAuthor: (newAuthor: PlainAuthorModel) => void;
}

const ModalCreateAuthor: React.FC<ModalCreateAuthorProps> = ({ onClose, onCreateAuthor }) => {
    const [authorData, setAuthorData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        photoUrl: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuthorData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateAuthor = () => {
        const { firstName, lastName } = authorData;
        if (firstName && lastName) {
            onCreateAuthor(authorData);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
  <div className="modal is-active w-1/3">
    <div className=" bg-white  bg-opacity-100 p-4 rounded-lg ">
      <header className=" text-black text-2xl font-bold mb-4 ">
        <p className="modal-card-title">Créer un auteur</p>
      </header>
      <section className="modal-card-body p-6">
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">
            ID de l'auteur
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={authorData.id}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Nom de l'auteur
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={authorData.lastName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Prénom de l'auteur
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={authorData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">
            URL de la photo
          </label>
          <input
            type="text"
            id="photoUrl"
            name="photoUrl"
            value={authorData.photoUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </section>
      <footer className=" flex justify-end">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2" onClick={handleCreateAuthor}>
          Créer
        </button>
        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md" onClick={onClose}>
          Annuler
        </button>
      </footer>
    </div>
  </div>
</div>

    );
       
}

export default ModalCreateAuthor;
