import { useQuery } from "@tanstack/react-query";
import useAuthInfo from "../../../hooks/useAuthInfo";
import useSecureAxios from "../../../hooks/useSecureAxios";

const AssignDeliveries = () => {
  const { currentUser } = useAuthInfo();
  const secureAxios = useSecureAxios();

  const { data: parcels = [], isPending } = useQuery({
    queryKey: ["parcels", "rider_assigned", currentUser.email],
    queryFn: async () => {
      const { data } = await secureAxios.get(
        `/parcels?delivery_status=rider_assigned&rider_email=${currentUser.email}`
      );

      return data?.parcels;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  console.log(parcels);

  return (
    <section>
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Parcel Name</th>
                <th>Pickup Address</th>
                <th>Delivery Address</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcel_name}</td>
                  <td className="capitalize">{parcel.sender_address}</td>
                  <td className="capitalize">{parcel.receiver_address}</td>
                  <td className="capitalize">${parcel.deliveryCharge}</td>
                  <td className="flex items-center gap-1.5">
                    <button className="btn btn-sm btn-primary text-neutral">
                      Accept
                    </button>

                    <button className="btn btn-sm btn-warning text-neutral">
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
  );
};

export default AssignDeliveries;
