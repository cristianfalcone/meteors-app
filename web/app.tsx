import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Meteors from "./meteors/page";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Meteors />
    </QueryClientProvider>
  );
}
