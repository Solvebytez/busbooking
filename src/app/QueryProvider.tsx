"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Create a client
const queryClient = new QueryClient();

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [client] = useState(queryClient);
  return (
    <QueryClientProvider client={client}>
      {children} <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
