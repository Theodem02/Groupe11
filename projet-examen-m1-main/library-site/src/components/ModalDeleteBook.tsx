import React, { useState } from 'react';
import { PlainBookModel } from '../models/book.model';

interface ModalDeleteBookProps{
     onClose: () => void;
   /*  onDelete: ()=>void;*/

}

  // supprimer :

  const handleDelete = () => {

    console.log("noice");
 }


const ModalDeleteBook: React.FC<ModalDeleteBookProps> = ({ onClose,/* onDelete*/ }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal fixed inset-0 bg-gray-800 bg-opacity-70">
          <div className="modal-container w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg p-4">
            <h1 className="text-2xl font-semibold mb-4">Supprimer un livre</h1>
            <p className="text-gray-600 mb-4">Êtes-vous sûr de vouloir supprimer ce livre ?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
               /*  onClick={onDelete}*/
              >
                Supprimer
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white ml-2 rounded hover:bg-gray-500"
                onClick={onClose} >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default ModalDeleteBook