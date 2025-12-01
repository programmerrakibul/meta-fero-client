import useRole from "../../../hooks/useRole";
import AdminOverview from "./AdminOverview";
import RiderOverview from "./RiderOverview";
import UserOverview from "./UserOverview";

const Overview = () => {
  const { role, isPending } = useRole();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (role === "admin") {
    return <AdminOverview />;
  } else if (role === "rider") {
    return <RiderOverview />;
  } else {
    return <UserOverview />;
  }
};

export default Overview;
