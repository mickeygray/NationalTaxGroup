import React, { useContext, useState, useCallback, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";
import EditPaymentScheduleModal from "./EditPaymentScheduleModal";

const PaymentScheduleItem = ({ payment }) => {
  const leadContext = useContext(LeadContext);

  const { deletePaymentScheduleItem, prospect } = leadContext;
  const [paymentItemState, setPaymentItemState] = useState(false);

  const { paymentDate, paymentMethod, paymentAmount } = payment;

  let dateDisplay1 = new Date(paymentDate);
  let formattedPostedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(dateDisplay1);
  const toggleEditState = useCallback(() => {
    setPaymentItemState((prevState) => !prevState);
  }, []);
  return (
    <div className='card bg-light'>
      {paymentItemState ? (
        <EditPaymentScheduleModal
          toggleEditState={toggleEditState}
          payment={payment}
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

      {paymentItemState ? (
        ""
      ) : (
        <div>
          <button
            className='btn btn-dark btn-sm my-1'
            onClick={() => setPaymentItemState((prevState) => !prevState)}>
            Update Payment
          </button>
          <button
            className='btn btn-dark btn-sm my-1'
            onClick={() => deletePaymentScheduleItem(payment, prospect)}>
            Delete Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentScheduleItem;
