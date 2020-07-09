import React, { useContext, useState, useCallback, useEffect } from "react";
import LeadContext from "../../context/lead/leadContext";
import AuthContext from "../../context/auth/authContext";
import StatContext from "../../context/stat/statContext";
import PaymentConfirmationModal from "./PaymentConfirmationModal";
import refund from "../../images/refund.png";
const PaymentProcessingItem = ({ payment }) => {
  const leadContext = useContext(LeadContext);
  const authContext = useContext(AuthContext);
  const statContext = useContext(StatContext);
  const { updatePayment } = statContext;
  const { getPaymentMethod, prospect } = leadContext;
  const { user } = authContext;

  const { paymentDate, paymentMethod, paymentAmount, paymentId } = payment;

  console.log(payment);

  let dateDisplay1 = new Date(paymentDate);
  let formattedPostedDate = Intl.DateTimeFormat(
    "fr-CA",
    { timeZone: "America/Los_Angeles" },
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  ).format(dateDisplay1);

  const [paymentConfirmationState, setPaymentConfirmationState] = useState(
    false
  );
  const togglePaymentConfirmationState = useCallback(() => {
    setPaymentConfirmationState((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (paymentId.length > 30) {
      setColorStyle({
        backgroundColor: "green",
        color: "white",
      });
    } else if (paymentId.slice(0, 3) === "red") {
      setColorStyle({
        backgroundColor: "red",
        color: "yellow",
      });
    } else if (paymentId.slice(0, 3) === "ref") {
      setColorStyle({
        backgroundImage: `url(${refund})`,
        backgroundRepeat: "norepeat",
        backgroundSize: "cover",
      });
    }
  }, [paymentId]);

  const [colorStyle, setColorStyle] = useState({
    backgroundColor: "#f4f4f4",
    color: "black",
  });

  const onClick = (e) => {
    setPaymentConfirmationState(true);
    getPaymentMethod(payment);
  };
  return (
    <div className='card bg-light'>
      {paymentConfirmationState ? (
        <PaymentConfirmationModal
          togglePaymentConfirmationState={togglePaymentConfirmationState}
          payment={payment}
        />
      ) : (
        <div style={colorStyle}>
          <h5 className='text-danger text-left'>{formattedPostedDate}</h5>
          <ul className='list' style={{ fontSize: ".8rem" }}>
            <li>
              Amount:
              <br />
              {paymentAmount}
            </li>
            <li>
              Payment used:
              <br /> {paymentMethod}
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>
      )}

      <div className='grid-3'>
        <button className='btn btn-dark btn-sm' onClick={onClick}>
          Open Payment Portal
        </button>
      </div>
    </div>
  );
};

export default PaymentProcessingItem;
