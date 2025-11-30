import { useQuery } from "@tanstack/react-query";
import useAuthInfo from "../../../hooks/useAuthInfo";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Swal from "sweetalert2";

const AssignDeliveries = () => {
  const { currentUser } = useAuthInfo();
  const secureAxios = useSecureAxios();

  const {
    data: parcels = [],
    isPending,
    refetch,
  } = useQuery({
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

  const handleDeliveryStatus = async (
    parcel_id,
    delivery_status,
    work_status
  ) => {
    const deliveryInfo = {
      rider_email: currentUser.email,
      delivery_status,
      work_status,
    };

    let message;

    if (delivery_status === "rider_arriving") {
      message = "Parcel accepted";
    }

    if (delivery_status === "pending_pickup") {
      message = "Parcel rejected";
    }

    if (delivery_status === "parcel_picked_up") {
      message = "Parcel picked up";
    }

    if (delivery_status === "parcel_delivered") {
      message = "Parcel successfully delivered";
    }

    try {
      const { data } = await secureAxios.patch(
        `/parcels/${parcel_id}/rider`,
        deliveryInfo
      );

      if (data.modifiedCount) {
        refetch();

        Swal.fire({
          icon: "success",
          title: message,
          timer: 2000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <title>Assign Deliveries</title>

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
                    <td className="capitalize">
                      {parcel.delivery_status.replaceAll("_", " ")}
                    </td>
                    <td className="capitalize">${parcel.deliveryCharge}</td>
                    <td className="flex items-center gap-1.5">
                      {parcel.delivery_status === "rider_assigned" ? (
                        <>
                          <button
                            onClick={() =>
                              handleDeliveryStatus(parcel._id, "rider_arriving")
                            }
                            className="btn btn-sm btn-primary text-neutral"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              handleDeliveryStatus(
                                parcel._id,
                                "pending_pickup",
                                "available"
                              )
                            }
                            className="btn btn-sm btn-warning text-neutral"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            disabled={
                              parcel.delivery_status === "parcel_picked_up"
                            }
                            onClick={() =>
                              handleDeliveryStatus(
                                parcel._id,
                                "parcel_picked_up"
                              )
                            }
                            className="btn btn-sm btn-primary text-neutral"
                          >
                            Mark As Picked
                          </button>

                          <button
                            disabled={
                              parcel.delivery_status !== "parcel_picked_up"
                            }
                            onClick={() =>
                              handleDeliveryStatus(
                                parcel._id,
                                "parcel_delivered",
                                "available"
                              )
                            }
                            className="btn btn-sm btn-primary text-neutral"
                          >
                            Mark As Delivered
                          </button>
                        </>
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

export default AssignDeliveries;
