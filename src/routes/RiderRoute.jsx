import { Outlet } from "react-router";
import Forbidden from "../components/Forbidden/Forbidden";
import useRole from "../hooks/useRole";

const RiderRoute = () => {
  const { role, isPending } = useRole();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (role !== "rider") {
    return <Forbidden />;
  }

  return <Outlet />;
};

export default RiderRoute;
