"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { AcmeLogo } from "../assets/icons/AcmeLogo";
import Link from "next/link";
import { UserAuth } from "./UserAuth";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link color="foreground" href="/" aria-current="page">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/memes"}>
          <Link color="foreground" href="/memes" aria-current="page">
            Memes
          </Link>
        </NavbarItem>
      </NavbarContent>
      <UserAuth />
    </Navbar>
  );
};
