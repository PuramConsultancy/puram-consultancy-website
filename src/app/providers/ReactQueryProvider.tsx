"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import queryClient from "@/app/api-client/QueryClient"; // ← import the singleton

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
