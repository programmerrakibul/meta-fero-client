import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Swal from "sweetalert2";

const AppliedRiders = () => {
  const secureAxios = useSecureAxios();

  const {
    data: riders = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const { data } = await secureAxios.get("/riders");

      return data?.riders;
    },
  });

  if (isPending) {
    return <p>Loading..</p>;
  }

  const handleRequestedRider = async (rider, status) => {
    const { _id, rider_email } = rider;
    try {
      const { data } = await secureAxios.patch(`/riders/${_id}`, {
        status,
        rider_email,
      });

      if (data.modifiedCount) {
        refetch();

        Swal.fire({
          icon: "success",
          title: `Rider has been ${status}`,
          timer: 2000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                      {rider.status === "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              handleRequestedRider(rider, "approved")
                            }
                            className="btn btn-sm btn-primary text-neutral"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleRequestedRider(rider, "rejected")
                            }
                            className="btn btn-sm btn-warning text-neutral ml-1.5"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <button className="btn btn-sm btn-error text-neutral ml-1.5">
                          Delete
                        </button>
                      )}
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
