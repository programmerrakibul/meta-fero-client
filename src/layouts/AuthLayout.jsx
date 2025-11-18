import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <>
      <nav className="fixed w-full top-0 left-0 backdrop-blur-xs z-50">
        <Logo />
      </nav>

      <section className="my-16">
        <div className="flex items-stretch justify-between ">
          <div className="flex-1 bg-white grid place-items-center min-h-dvh">
            <Outlet />
          </div>

          <div className="flex-1 bg-[#FAFDF0] grid place-items-center min-h-dvh">
            <img src={authImg} alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthLayout;
