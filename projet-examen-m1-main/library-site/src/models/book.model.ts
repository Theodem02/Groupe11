export type PlainBookModel = {
  id: string;
  name: string;
  writtenOn: string;
  authorId: string;
  bookGenres: string[];
  author:{
    id: string;
    firstName: string;
    lastName: string;
  };
};
