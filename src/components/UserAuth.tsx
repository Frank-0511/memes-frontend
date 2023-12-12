"use client";

import { Button, NavbarContent, NavbarItem } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

import Link from "next/link";

export const UserAuth = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <NavbarContent justify="end">
        <div className="flex justify-end items-center gap-x-4">
          <p className="text-md">Hola, {session.user.name}</p>
          <Button color="danger" size="sm" onClick={() => signOut()}>
            Cerrar sesión
          </Button>
        </div>
      </NavbarContent>
    );
  }

  return (
    <NavbarContent justify="end">
      <NavbarItem className="lg:flex">
        <Button as={Link} color="primary" href="/login" variant="light">
          Login
        </Button>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="#" variant="flat" isDisabled>
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};
