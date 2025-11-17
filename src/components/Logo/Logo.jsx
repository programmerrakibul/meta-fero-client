import { Link } from "react-router";
import logo from "../../assets/logo_black.png";

const Logo = () => {
  return (
    <Link to="/" className="grid place-items-center w-32">
      <img src={logo} alt="" />
    </Link>
  );
};

export default Logo;
