import React, { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import LeadContext from "../../context/lead/leadContext";
import PaymentScheduleItem from "./PaymentScheduleItem";

const PaymentMethods = (props) => {
  const { prospect } = props;

  const { paymentSchedule } = prospect;
  console.log(props);
  return (
    <div style={noteStyle}>
      {paymentSchedule
        ? paymentSchedule.map((payment) => (
            <PaymentScheduleItem key={payment._id} payment={payment} />
          ))
        : ""}
    </div>
  );
};
const noteStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridGap: ".3rem",
};

export default PaymentMethods;
