export interface Meme {
  id: number;
  name: string;
  description: string;
  url: string;
  numberOfLikes: number;
  numberOfComments: number;
}

export interface ApiResponseGetMemes {
  data: Meme[];
  meta: {
    page: number;
    pageSize: number;
    count: number;
    totalPage: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface ApiParamsGetMemes {
  page: number;
  pageSize: number;
  token: string;
}

export type MemesContextType = {
  memes: Meme[];
  setMemes: (memes: Meme[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  totalPage: number;
  totalMemes: number;
  fetchMemes: () => void;
};
