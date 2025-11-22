import { RouterProvider } from "react-router";
import Router from "./routes/Router";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={Router} />
          <Toaster position="top-center" richColors closeButton />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
