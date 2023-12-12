"use client";

import { Meme, MemesContextType } from "@/models/meme";
import React, { createContext, useContext, useState } from "react";

import { getMemesApi } from "@/services/memes";
import { useSession } from "next-auth/react";

const MemesContext = createContext<MemesContextType>({} as MemesContextType);

const MemesProvider = ({ children }: { children: React.ReactNode }) => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [totalMemes, setTotalMemes] = useState(0);
  const { data: session, status } = useSession();

  const fetchMemes = async () => {
    if (status !== "authenticated") return;
    try {
      setLoading(true);
      const response = await getMemesApi({
        page,
        pageSize,
        token: session.user.token,
      });
      setMemes(response.data);
      setTotalPage(response.meta.totalPage);
      setTotalMemes(response.meta.count);
    } catch (error) {
      console.error("Error fetching memes:", error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    memes,
    setMemes,
    loading,
    setLoading,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPage,
    totalMemes,
    fetchMemes,
  };

  return (
    <MemesContext.Provider value={contextValue}>
      {children}
    </MemesContext.Provider>
  );
};

const useMemesContext = () => {
  return useContext(MemesContext);
};

export { MemesProvider, useMemesContext };
