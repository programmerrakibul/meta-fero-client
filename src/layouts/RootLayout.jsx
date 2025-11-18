import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="space-y-16 md:space-y-20">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default RootLayout;
