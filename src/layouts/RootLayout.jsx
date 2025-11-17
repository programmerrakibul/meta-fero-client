import { Outlet } from "react-router";
import Navbar from "../pages/components/Navbar/Navbar";
import Footer from "../pages/components/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>
      
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default RootLayout;
