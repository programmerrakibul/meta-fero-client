import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";

const AdminOverview = () => {
  const secureAxios = useSecureAxios();

  const { data: stats = [], isPending } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const { data } = await secureAxios.get("/parcels/delivery-status-stats");

      return data?.stats;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  console.log(stats);

  return (
    <>
      <title>Admin | Overview</title>

      <section className="text-center">
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          {stats.map((stat) => (
            <div
              key={stat.status}
              className="stat place-items-center bg-primary/5"
            >
              <div className="stat-title text-neutral text-xl font-semibold">
                Delivery Stats
              </div>
              <div className="stat-value">{stat.count}</div>
              <div className="stat-desc capitalize text-base">
                {stat.status.replaceAll("_", " ")}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AdminOverview;
