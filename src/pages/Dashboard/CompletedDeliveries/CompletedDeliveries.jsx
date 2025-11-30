import { useQuery } from "@tanstack/react-query";
import useAuthInfo from "../../../hooks/useAuthInfo";
import useSecureAxios from "../../../hooks/useSecureAxios";

const CompletedDeliveries = () => {
  const { currentUser } = useAuthInfo();
  const secureAxios = useSecureAxios();

  const { data: parcels = [], isPending } = useQuery({
    queryKey: ["parcels", "rider_assigned", currentUser.email],
    queryFn: async () => {
      const { data } = await secureAxios.get(
        `/parcels?delivery_status=parcel_delivered&rider_email=${currentUser.email}`
      );

      return data?.parcels;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  const calculateProfit = (parcel) => {
    let profit = 0;
    if (parcel.sender_district === parcel.receiver_district) {
      profit = parcel.deliveryCharge * 0.8;
    } else {
      profit = parcel.deliveryCharge * 0.6;
    }

    return profit;
  };

  return (
    <>
      <title>Completed Deliveries</title>

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
                  <th>Delivery Status</th>
                  <th>Your Profit</th>
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
                    <td className="capitalize">
                      {parcel.delivery_status.replaceAll("_", " ")}
                    </td>
                    <td className="capitalize">${calculateProfit(parcel)}</td>
                    <td className="flex items-center gap-1.5">
                      <button className="btn btn-sm btn-primary text-neutral">
                        CashOut
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

export default CompletedDeliveries;
