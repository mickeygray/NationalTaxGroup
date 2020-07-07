import React, { useContext, useState, useCallback, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import StatContext from "../../context/stat/statContext";
import PaymentConfirmationModal from "./PaymentConfirmationModal";
const PaymentProcessingItem = ({ payment }) => {
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);
  const statContext = useContext(StatContext);
  const { updatePayment } = statContext;
  const { getPaymentMethod, prospect } = leadContext;
  const { user } = statContext;

  const [paymentItemState, setPaymentItemState] = useState(false);

  const { paymentDate, paymentMethod, paymentAmount } = payment;

  console.log(payment);

  let dateDisplay1 = new Date(paymentDate);
  let formattedPostedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(dateDisplay1);

  const [paymentConfirmationState, setPaymentConfirmationState] = useState(
    false
  );
  const togglePaymentConfirmationState = useCallback(() => {
    setPaymentConfirmationState((prevState) => !prevState);
  }, []);
  return (
    <div className='card bg-light'>
      {paymentConfirmationState ? (
        <PaymentConfirmationModal
          togglePaymentConfirmationState={togglePaymentConfirmationState}
        />
      ) : (
        <Fragment>
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
        </Fragment>
      )}

      <div className='grid-3'>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setPaymentConfirmationState(true)}>
          Confirm Payment Made
        </button>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => updatePayment(payment, user, prospect)}>
          Mark Payment Delinquent
        </button>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => updatePayment(payment, user, prospect)}>
          Refund Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentProcessingItem;
