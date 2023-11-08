import React, { useState } from 'react';
import { PlainBookModel } from '../models/book.model';
import { PlainAuthorModel } from '../models/author.model';

interface ModalAddBookProps{
   onClose : () => void ;
   onCreateBookToAuthor : ()=> void ;
   // pour recup la liste des livres 
   books : PlainBookModel[] ;
   
}

const ModalAddBookToAuthor: React.FC<ModalAddBookProps> = ({onClose,onCreateBookToAuthor , books }) =>{
    
    // prendre en compte les changements 
    const[bookData , setBookData] = useState({
    name: "",
    writtenOn: "",
    })

    const handleAddBook = ()=>{
         
       onClose();
    };


    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <form className="bg-white w-1/3 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Sélectionner un livre</h2>
      
          <div className="mb-4">
            <label htmlFor="book" className="block text-sm font-medium text-gray-700">
              Livre
            </label>
            <select
              id="book"
              name="book"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
            <option value="-1"> selectionner un book</option>
              
              {books.map((books)=>(
                  <option key={books.name} value={books.name} >
                    {books.name}
                  </option>

              ) )}
            </select>
          </div>
      
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
            
            >
              Sélectionner
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