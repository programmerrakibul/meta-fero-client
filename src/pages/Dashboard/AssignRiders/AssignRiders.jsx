import { useQuery, useQueryClient } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const secureAxios = useSecureAxios();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const ridersModalRef = useRef(null);
  const queryCLient = useQueryClient();

  const { data: riders = [] } = useQuery({
    queryKey: ["riders", "available", selectedParcel?.sender_district],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const { data } = await secureAxios(
        `/riders?work_status=available&status=approved&rider_district=${selectedParcel?.sender_district}`
      );

      return data?.riders;
    },
  });

  const {
    data: parcels = [],
    isPending: parcelLoading,
    refetch: parcelRefetch,
  } = useQuery({
    queryKey: ["parcels", "pending_pickup"],
    queryFn: async () => {
      const { data } = await secureAxios(
        "/parcels?delivery_status=pending_pickup"
      );

      return data?.parcels;
    },
  });

  if (parcelLoading) {
    return <p>Loading...</p>;
  }

  const showRiders = (parcel) => {
    ridersModalRef.current.showModal();
    setSelectedParcel(parcel);
  };

  const handleAssignRider = async (rider) => {
    const riderInfo = {
      rider_id: rider._id,
      rider_name: rider.rider_name,
      rider_email: rider.rider_email,
      tracking_id: selectedParcel.tracking_id
    };

    try {
      const { data } = await secureAxios.patch(
        `/parcels/${selectedParcel._id}`,
        riderInfo
      );

      if (data.modifiedCount) {
        ridersModalRef.current.close();
        parcelRefetch();
        queryCLient.invalidateQueries({
          queryKey: ["riders", "available", selectedParcel?.sender_district],
        });

        Swal.fire({
          icon: "success",
          title: "Rider successfully assigned",
          timer: 2000,
        });
      }

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <title>Assign Riders | MetaFero</title>

      <section>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Parcel Name</th>
                <th>Pickup District</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.parcel_name}</td>
                  <td className="capitalize">{parcel.sender_district}</td>
                  <td className="capitalize">${parcel.deliveryCharge}</td>
                  <td className="flex items-center gap-1.5">
                    <button
                      onClick={() => showRiders(parcel)}
                      className="btn btn-primary btn-sm text-black"
                    >
                      Show Riders
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dialog
          ref={ridersModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Rider Name</th>
                    <th>Email</th>
                    <th>District</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {riders.map((rider, index) => (
                    <tr key={rider._id}>
                      <td>{index + 1}</td>
                      <td>{rider.rider_name}</td>
                      <td className="capitalize">{rider.rider_email}</td>
                      <td className="capitalize">{rider.rider_district}</td>
                      <td className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="btn btn-primary btn-sm text-black"
                        >
                          Assign Rider
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default AssignRiders;
