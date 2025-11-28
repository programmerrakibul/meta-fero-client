import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";

const AppliedRiders = () => {
  const secureAxios = useSecureAxios();

  const { data: riders = [], isPending } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const { data } = await secureAxios.get("/riders");

      return data?.riders;
    },
  });

  if (isPending) {
    return <p>Loading..</p>;
  }

  console.log(riders);

  return (
    <>
      <title>Applied Riders - MetaFero</title>

      <section>
        <div>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Rider Name</th>
                  <th>Rider Email</th>
                  <th>Rider Age</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {riders.map((rider, i) => (
                  <tr key={rider._id}>
                    <td>{i + 1}</td>
                    <td>{rider.rider_name}</td>
                    <td>{rider.rider_email}</td>
                    <td>{rider.rider_age}</td>
                    <td className="capitalize">{rider.status}</td>
                    <td>
                      <button className="btn btn-sm btn-primary text-neutral">
                        Approve
                      </button>

                      <button className="btn btn-sm btn-warning text-neutral ml-1.5">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default AppliedRiders;
