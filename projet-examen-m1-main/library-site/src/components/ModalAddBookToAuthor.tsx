import React, { useState } from 'react';
import { PlainBookModel } from '../models/book.model';
import { PlainAuthorModel } from '../models/author.model';

interface ModalAddBookProps{
   onClose : () => void ;
   onCreateBookToAuthor : ()=> void ;
   // pour recup la liste des livres 
   //books : PlainBookModel[] ;
   
}

const ModalAddBookToAuthor: React.FC<ModalAddBookProps> = ({onClose,onCreateBookToAuthor}) =>{
    
    // prendre en compte les 
    const[bookData , setBookData] = useState({
    name: "",
    writtenOn: "",
    })

    const handleInputChange =(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{

     
    }

    const handleCreateBook = ()=>{
         
       onClose();
    };


    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <form className="bg-white w-1/3 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Créer un nouveau livre</h2>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Titre du livre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="writtenOn" className="block text-sm font-medium text-gray-700">
              Année de publication
            </label>
            <input
              type="text"
              id="writtenOn"
              name="writtenOn"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
      
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
              onClick={handleCreateBook}
            >
              Créer
            </button>
            <button
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
              onClick={onClose}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    )




}

export default ModalAddBookToAuthor