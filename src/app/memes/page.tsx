"use client";

import ModalCreate from "./components/ModalCreate";
import TableMemes from "./components/TableMemes";
import { useEffect } from "react";
import { useMemesContext } from "@/context/MemeContext";
import { useSession } from "next-auth/react";

const MemesPage = () => {
  const { fetchMemes } = useMemesContext();
  const { status } = useSession();
  useEffect(() => {
    if (status !== "authenticated") return;
    fetchMemes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return (
    <div className="px-4 pb-8">
      <div className="flex items-center justify-between px-4 py-6">
        <h1 className="text-3xl font-bold">Memes</h1>
        <ModalCreate />
      </div>
      <TableMemes />
    </div>
  );
};

export default MemesPage;
