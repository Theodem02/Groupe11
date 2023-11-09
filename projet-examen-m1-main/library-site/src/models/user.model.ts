export type PlainUserBooksModel = {
    id: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
    };
    book: {
        id: string;
        name: string;
        authorId: string;
        writtenOn: Date;
        author: {
            id: string;
            firstName: string;
            lastName: string;
        };
        genres: string[];
    };
};

export type PlainUserModel = {
    id: string;
    firstName: string;
    lastName: string;
};