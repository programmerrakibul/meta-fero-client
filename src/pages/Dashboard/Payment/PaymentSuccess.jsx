import { useSearchParams } from "react-router";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const secureAxios = useSecureAxios();

  useEffect(() => {
    (async () => {
      if (session_id) {
        try {
          const { data } = await secureAxios.put(
            `/parcel-checkout/status/${session_id}`
          );

          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [secureAxios, session_id]);

  return (
    <>
      <title>Payment Successful</title>

      <div>Payment completed Successfully</div>
    </>
  );
};

export default PaymentSuccess;
