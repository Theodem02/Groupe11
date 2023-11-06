import { UserId } from 'library-api/src/entities';

export type PlainUserModel = {
    id: UserId;
    firstName: string;
    lastName: string;
    bookId: string;
};

export type UserModel = {
    id: UserId;
    firstName: string;
    lastName: string;
    bookId: string;
};