import React, { useState, useEffect, useContext } from "react";
import LeadContext from "../../context/lead/leadContext";

const PaymentScheduleModal = (props) => {
  const leadContext = useContext(LeadContext);

  const { putPaymentScheduleItem, prospect } = leadContext;

  console.log(props);
  useEffect(() => {
    setNewPayment(props.payment);
  }, []);

  const [newPayment, setNewPayment] = useState({
    paymentDate: Date.now(),
    paymentMethod: "",
    paymentAmount: "",
  });

  const { paymentAmount, paymentDate, paymentMethod } = newPayment;
  let dateDisplay1 = new Date(paymentDate);
  let formattedEditDate = Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(dateDisplay1);

  const onChange = (e) => {
    setNewPayment({ ...newPayment, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='card container'>
        <button onClick={props.toggleEditState}>X</button>
        <div>
          <label htmlFor='quote'>Payment Date</label>
          <input
            type='date'
            name='paymentDate'
            value={formattedEditDate}
            onChange={onChange}
          />{" "}
          <label htmlFor='quote'>Second Payment Amount</label>
          <input
            onChange={onChange}
            type='text'
            value={paymentAmount}
            name='paymentAmount'
          />
          <label htmlFor='quote'>Payment Method Name</label>
          <input
            onChange={onChange}
            type='text'
            value={paymentMethod}
            name='paymentMethod'
          />
        </div>
        <button
          className='btn btn-dark btn-sm my-1'
          onClick={() => putPaymentScheduleItem(newPayment, prospect)}>
          Submit Update
        </button>
      </div>
    </>
  );
};
export default PaymentScheduleModal;
