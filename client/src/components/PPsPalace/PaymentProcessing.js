import React, { useContext, useEffect } from "react";
import PaymentProcessingSearch from "./PaymentProcessingSearch";
import PaymentProcessingItem from "./PaymentProcessingItem";
import StatContext from "../../context/stat/statContext";

const PaymentProcessing = () => {
  const statContext = useContext(StatContext);
  const { payments, todaysPayments, getTodaysPayments, filtered } = statContext;

  useEffect(() => {
    getTodaysPayments();
  }, []);
  let dateDisplay1 = new Date(Date.now());
  let today = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(dateDisplay1);
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
          ? todaysPayments.map((payment) => (
              <PaymentProcessingItem key={payment._id} payment={payment} />
            ))
          : ""}
      </div>
    </div>
  );
};

export default PaymentProcessing;
