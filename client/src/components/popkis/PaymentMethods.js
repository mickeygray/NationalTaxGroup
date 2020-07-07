import React, { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import LeadContext from "../../context/lead/leadContext";
import PaymentMethodItem from "./PaymentMethodItem";

const PaymentMethods = (props) => {
  const { prospect } = props;

  const { paymentMethods } = prospect;
  console.log(props);
  return (
    <div style={noteStyle}>
      {paymentMethods
        ? paymentMethods.map((paymentMethod) => (
            <PaymentMethodItem
              key={paymentMethod._id}
              paymentMethod={paymentMethod}
              togglePaymentModal={props.togglePaymentModal}
            />
          ))
        : ""}
    </div>
  );
};
const noteStyle = {
  display: "grid",
  gridTemplateRows: "repeat(5, 1fr)",
  gridGap: ".1rem",
};

export default PaymentMethods;
