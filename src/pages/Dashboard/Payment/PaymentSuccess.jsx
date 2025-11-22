import { useNavigate, useSearchParams } from "react-router";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const secureAxios = useSecureAxios();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (session_id) {
        setLoading(true);

        try {
          const { data } = await secureAxios.put(
            `/parcel-checkout/status/${session_id}`
          );

          if (data.transaction_id && data.tracking_id) {
            setPaymentInfo({
              transaction_id: data.transaction_id,
              tracking_id: data.tracking_id,
            });
          } else {
            navigate("../my-parcels", { replace: true });
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [secureAxios, session_id, navigate, paymentInfo]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <title>Payment Successful</title>

      <div>
        <p>{paymentInfo.transaction_id}</p>
        <p>{paymentInfo.tracking_id}</p>
      </div>
    </>
  );
};

export default PaymentSuccess;
