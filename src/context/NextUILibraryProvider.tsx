"use client";

import { NextUIProvider } from "@nextui-org/react";

export function NextUILibraryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
