import { Outlet } from "react-router";
import Forbidden from "../components/Forbidden/Forbidden";
import useRole from "../hooks/useRole";

const AdminRoute = () => {
  const { role, isPending } = useRole();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (role !== "admin") {
    return <Forbidden />;
  }

  return <Outlet />;
};

export default AdminRoute;
