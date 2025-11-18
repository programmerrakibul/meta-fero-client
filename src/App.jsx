import { RouterProvider } from "react-router";
import Router from "./routes/Router";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-center" richColors closeButton />
        <RouterProvider router={Router} />
      </AuthProvider>
    </>
  );
}

export default App;
