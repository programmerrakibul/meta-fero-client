import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useAuthInfo from "../../../hooks/useAuthInfo";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";

const PaymentHistory = () => {
  const { currentUser } = useAuthInfo();
  const secureAxios = useSecureAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["payment-history", currentUser.email],
    queryFn: async () => {
      const res = await secureAxios.get("/payment-history", {
        params: {
          email: currentUser.email,
        },
      });

      return res.data;
    },
  });

  const paymentHistory = data?.payments || [];

  return (
    <>
      <title>Payment History</title>

      <div>
        <DataTable
          loading={isLoading}
          showGridlines
          stripedRows
          size="small"
          value={paymentHistory}
          tableStyle={{ minWidth: "50rem" }}
          emptyMessage='No History'
          className="text-nowrap"
        >
          <Column field="parcel_name" header="Parcel Name"></Column>
          <Column field="customer_email" header="Customer Email"></Column>
          <Column field="transaction_id" header="Transaction ID"></Column>
          <Column field="tracking_id" header="Tracking ID"></Column>
          <Column field="amount_total" header="Amount"></Column>
        </DataTable>
      </div>
    </>
  );
};

export default PaymentHistory;
