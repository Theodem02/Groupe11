import { UserId } from '../entities';

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