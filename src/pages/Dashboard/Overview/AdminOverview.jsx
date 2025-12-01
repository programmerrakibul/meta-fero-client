import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { Legend, Pie, PieChart, Tooltip } from "recharts";

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

  return (
    <>
      <title>Admin | Overview</title>

      <section className="text-center space-y-7">
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

        <div className="w-full h-[300px] text-center">
          <PieChart
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: 2,
            }}
            responsive
          >
            <Pie
              dataKey="count"
              startAngle={180}
              endAngle={0}
              data={stats}
              cx="50%"
              cy="100%"
              outerRadius="120%"
              fill="#8884d8"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </section>
    </>
  );
};

export default AdminOverview;
