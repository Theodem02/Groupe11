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
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose} />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Créer un auteur</p>
                    <button className="delete" aria-label="close" onClick={onClose} />
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label">ID</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="id"
                                value={authorData.id}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Prénom</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="firstName"
                                value={authorData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Nom</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="lastName"
                                value={authorData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Photo</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="photoUrl"
                                value={authorData.photoUrl}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={handleCreateAuthor}>
                        Créer
                    </button>
                    <button className="button" onClick={onClose}>
                        Annuler
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default ModalCreateAuthor;
