import { MemesProvider } from "@/context/MemeContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MemesProvider>{children}</MemesProvider>;
}
