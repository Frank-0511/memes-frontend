"use client";

import { FC, useEffect } from "react";

import { LoginForm } from "../LoginForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Login: FC = () => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "loading")
    return (
      <div className="w-full flex flex-col items-center">
        <p className="text-3xl font-semibold">Loading...</p>
      </div>
    );
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-semibold">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
