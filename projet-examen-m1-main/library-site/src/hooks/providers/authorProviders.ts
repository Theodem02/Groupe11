import axios from 'axios';
import { useState } from 'react';
import { PlainAuthorModel } from '@/models';

type UseListAuthorProvider = {
  authors: PlainAuthorModel[];
  load: () => void;
};

export const useListAuthors = (): UseListAuthorProvider => {
  const [authors, setAuthors] = useState<PlainAuthorModel[]>([]);

  const fetchAuthor = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors`)
      .then((data) => setAuthors(data.data))
      .catch((err) => console.error(err));
  };

  return { authors, load: fetchAuthor };
};

type AuthorProviders = {
  useListAuthors: () => UseListAuthorProvider;
};

export const useBooksProviders = (): AuthorProviders => ({
  useListAuthors,
});
