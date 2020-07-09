import React, { useContext, useEffect } from "react";
import PaymentProcessingSearch from "./PaymentProcessingSearch";
import PaymentProcessingItem from "./PaymentProcessingItem";
import StatContext from "../../context/stat/statContext";

const PaymentProcessing = () => {
  const statContext = useContext(StatContext);
  const { payments, today, getTodaysPayments, filtered } = statContext;

  const { todaysLeads } = today;

  useEffect(() => {
    getTodaysLeads();
  }, []);

  console.log(today);

  return (
    <div style={leadStyle}>
      {todaysLeads.length > 0
        ? todaysLeads.map((lead) => (
            <TodaysLeadItem key={lead._id} lead={lead} />
          ))
        : ""}
    </div>
  );
};
const leadStyle = {
  display: "grid",
  gridTemplateRows: "repeat(10, 1fr)",
  gridGap: ".5rem",
};

export default TodaysLeads;
