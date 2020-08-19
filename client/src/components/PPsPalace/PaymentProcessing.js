import React, { useContext, useEffect } from "react";
import PaymentProcessingSearch from "./PaymentProcessingSearch";
import PaymentProcessingItem from "./PaymentProcessingItem";
import StatContext from "../../context/stat/statContext";

const PaymentProcessing = () => {
  const statContext = useContext(StatContext);
  const { payments, today, getTodaysPayments, filtered } = statContext;

  const { todayPayments } = today;

  useEffect(() => {
    getTodaysPayments();
  }, []);

  console.log(todayPayments);
  return (
    <div className='grid-2'>
      <div>
        <PaymentProcessingSearch />

        {filtered
          ? filtered.map((payment) => (
              <PaymentProcessingItem key={payment._id} payment={payment} />
            ))
          : ""}
      </div>
      <div>
        <h3>Process Today's Payments</h3>
        {todayPayments
          ? todayPayments
              .filter((payment) => payment.paymentId === "")

              .filter((payment) => payment.paymentMethod)
              .map((payment) => (
                <PaymentProcessingItem key={payment._id} payment={payment} />
              ))
          : ""}
      </div>
    </div>
  );
};

export default PaymentProcessing;
