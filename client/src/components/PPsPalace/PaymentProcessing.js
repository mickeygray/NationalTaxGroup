import React, { useContext, useEffect } from "react";
import PaymentProcessingSearch from "./PaymentProcessingSearch";
import PaymentProcessingItem from "./PaymentProcessingItem";
import StatContext from "../../context/stat/statContext";

const PaymentProcessing = () => {
  const statContext = useContext(StatContext);
  const { payments, today, getTodaysPayments, filtered } = statContext;

  const { todaysPayments } = today;

  useEffect(() => {
    getTodaysPayments();
  }, []);

  console.log(today);

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
        {todaysPayments
          ? todaysPayments
              .filter((payment) => payment.paymentId === "")
              .map((payment) => (
                <PaymentProcessingItem key={payment._id} payment={payment} />
              ))
          : ""}
      </div>
    </div>
  );
};

export default PaymentProcessing;
