"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

interface Props {
  children: ReactNode;
}

const TanstackProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 100 * 60 *60, // 24 hours,
        refetchOnWindowFocus:false,
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
