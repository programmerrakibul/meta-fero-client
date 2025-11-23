import { RouterProvider } from "react-router";
import Router from "./routes/Router";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <PrimeReactProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={Router} />
            <Toaster position="top-center" richColors closeButton />
          </AuthProvider>
        </QueryClientProvider>
      </PrimeReactProvider>
    </>
  );
}

export default App;
