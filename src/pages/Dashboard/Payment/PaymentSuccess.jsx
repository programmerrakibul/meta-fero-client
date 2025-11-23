import { useSearchParams } from "react-router";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const secureAxios = useSecureAxios();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let isMounted = true;

      if (session_id && isMounted) {
        setLoading(true);

        try {
          const { data } = await secureAxios.patch(
            `/parcel-checkout/status/${session_id}`
          );

          console.log(data);

          setPaymentInfo({
            transaction_id: data.transaction_id,
            tracking_id: data.tracking_id,
          });
        } catch (err) {
          console.log(err);
        } finally {
          isMounted = false;
          setLoading(false);
        }
      }
    })();
  }, [secureAxios, session_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <title>Payment Successful</title>

      <div>
        <p>{paymentInfo?.transaction_id}</p>
        <p>{paymentInfo?.tracking_id}</p>
      </div>
    </>
  );
};

export default PaymentSuccess;
