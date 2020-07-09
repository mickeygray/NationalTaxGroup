import React, { useState, useContext, useEffect } from "react";
import StatContext from "../../context/stat/statContext";
const BillingStatus = ({ prospect }) => {
  const statContext = useContext(StatContext);

  const { getPayments, putPaymentStatus } = statContext;

  useEffect(() => {
    getPayments(prospect);
  }, []);

  const [stats, setStats] = useState({
    status: "",
    quote: 0,
    gross: 0,
    initial: 0,
    total: 0,
    loans: "",
    initalPaymentDate: "",
    lastPaymentDate: "",
  });

  const onChange = (e) => {
    setStats({ ...stats, [e.target.name]: e.target.value });
  };

  const {
    status,
    quote,
    gross,
    initial,
    total,
    loans,
    initalPaymentDate,
    lastPaymentDate,
  } = stats;

  return (
    <div>
      <div style={{ width: "250px" }}>
        <h3>Billing Status</h3>
        <select name='status' id='status' value={status} onChange={onChange}>
          <option value='prospect'>Prospect</option>
          <option value='refund'>Refund</option>
          <option value='redline'>Redline</option>
          <option value='client'>Client</option>
          <option value='upsellable'>Upsellable</option>
          <option value='highdollar'>Highdollar</option>
          <option value='noupsell'>No Upsell</option>
        </select>
        <label htmlFor='quote'>Quoted Fee</label>
        <input type='text' value={quote} name='quote' />
        <label htmlFor='quote'>Gross Fees</label>
        <input type='text' value={gross} name='gross' />
        <label htmlFor='quote'>Initial Payment</label>
        <input type='text' value={initial} name='initial' />
        <label htmlFor='quote'>Total Payment</label>
        <input type='text' value={total} name='total' />
        <label htmlFor='quote'>Loan Information</label>
        <input type='text' value={loans} name='loans' />
        <label htmlFor='quote'>Initial Payment Date</label>
        <input
          type='date'
          value={initalPaymentDate}
          name='initialPaymentDate'
        />
        <label htmlFor='quote'>Last Payment Date</label>
        <input type='date' value={lastPaymentDate} name='lastPaymentDate' />
        <button onClick={() => putPaymentStatus(stats)}></button>
      </div>
    </div>
  );
};

export default BillingStatus;
