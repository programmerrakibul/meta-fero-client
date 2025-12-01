import useAuthInfo from "../../../hooks/useAuthInfo";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { MdPayment } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";

const MyParcel = () => {
  const { currentUser } = useAuthInfo();
  const secureAxios = useSecureAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["my-parcels", currentUser.uid],
    queryFn: async () => {
      const res = await secureAxios.get(`/parcels`, {
        params: {
          uid: currentUser.uid,
        },
      });

      return res.data;
    },
  });

  const handlePayment = async (parcel) => {
    const {
      _id,
      tracking_id,
      parcel_name,
      sender_email,
      sender_name,
      deliveryCharge,
    } = parcel;

    const paymentInfo = {
      parcel_id: _id,
      tracking_id,
      parcel_name,
      sender_email,
      sender_name,
      deliveryCharge,
    };

    try {
      const { data } = await secureAxios.post("/parcel-checkout", paymentInfo);

      window.location.assign(data.url);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <title>My Parcels | MetaFero</title>

      <section>
        <div>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Parcel Name</th>
                  <th>Delivery Status</th>
                  <th>Tracking ID</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data?.parcels.map((parcel, index) => (
                  <tr key={parcel._id}>
                    <th>{index + 1}</th>
                    <td>{parcel.parcel_name}</td>
                    <td className="capitalize">
                      {parcel.delivery_status.replace("_", " ")}
                    </td>
                    <td className="capitalize">
                      <Link
                        to={`/tracking/${parcel.tracking_id}/logs`}
                        className="link link-hover"
                      >
                        {parcel.tracking_id}
                      </Link>
                    </td>
                    <td className="capitalize">${parcel.deliveryCharge}</td>
                    <td className="capitalize">{parcel.payment_status}</td>
                    <td className="flex items-center gap-1.5">
                      <button
                        disabled={parcel.payment_status === "paid"}
                        onClick={() => handlePayment(parcel)}
                        className="btn btn-sm btn-square tooltip tooltip-left text-base"
                        data-tip={
                          parcel.payment_status === "paid"
                            ? "Already Paid"
                            : "Pay"
                        }
                      >
                        <MdPayment />
                      </button>

                      <button
                        className="btn btn-sm btn-square tooltip tooltip-left text-base"
                        data-tip="Edit"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn btn-sm btn-square btn-error btn-outline hover:text-white tooltip tooltip-left text-base"
                        data-tip="Delete"
                      >
                        <FaRegTrashCan />
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

export default MyParcel;
