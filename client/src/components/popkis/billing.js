import React, { useState, useContext, useEffect } from "react";
import StatContext from "../../context/stat/statContext";
import LeadContext from "../../context/lead/leadContext";

const BillingStatus = ({ paymentStatus }) => {
  const statContext = useContext(StatContext);
  const leadContext = useContext(LeadContext);
  const { prospect } = leadContext;
  const { getPaymentStatus, putPaymentStatus } = statContext;

  console.log(prospect);

  useEffect(() => {
    if (paymentStatus) {
      setStats(paymentStatus);
      setStatus("");
    } else {
      setStats({
        quote: 0,
        gross: 0,
        initial: 0,
        total: 0,
        loans: 0,
        percentPaid: 0,
        refunded: 0,
        redLine: 0,
        initialPaymentDate: "",
        lastPaymentDate: "",
        paymentsRemaining: 0,
        status: "",
      });
    }
  }, [paymentStatus]);

  console.log(paymentStatus);
  if (
    total > 0 &&
    redLine < 1 &&
    refunded < 1 &&
    total < 50000 &&
    percentPaid < 0.85
  ) {
    setStatus("client");
  } else if (
    total > 0 &&
    redLine < 1 &&
    refunded.length < 1 &&
    percentPaid > 0.85
  ) {
    setStatus("upsellable");
  } else if (total > 50000) {
    setStatus("highdollar");
  } else if (redLine > 1) {
    setStatus("redline");
  } else if (refunded > 1) {
    setStatus("refunded");
  } else if (total < 1) {
    setStatus("prospect");
  }
  const [status, setStatus] = useState("");
  const [stats, setStats] = useState({
    quote: 0,
    gross: 0,
    initial: 0,
    total: 0,
    loans: 0,
    percentPaid: 0,
    refunded: 0,
    redLine: 0,
    initialPaymentDate: "",
    lastPaymentDate: "",
    paymentsRemaining: 0,
    status: "",
  });

  const onChange = (e) => {
    setStats({
      ...stats,
      [e.target.name]: e.target.value,
    });
    setStatus({
      ...status,
      [e.target.name]: e.target.value,
    });
  };

  const {
    quote,
    gross,
    initial,
    total,
    loans,
    percentPaid,
    refunded,
    redLine,
    initialPaymentDate,
    lastPaymentDate,
    paymentsRemaining,
    balance,
  } = stats;

  letdateDisplay1 = newDate(initialPaymentDate);
  letformattedPostedDate = Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: "America/Los_Angeles",
    },
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  ).format(dateDisplay1);
  letdateDisplay2 = newDate(lastPaymentDate);
  letformattedPostedDate2 = Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: "America/Los_Angeles",
    },
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  ).format(dateDisplay2);

  return (
    <div>
      <div>
        <h3>BillingStatus</h3>
        <select name='status' id='status' value={status} onChange={onChange}>
          <option value='prospect'>Prospect</option>
          <option value='refunded'>Refund</option>
          <option value='redline'>Redline</option>
          <option value='client'>Client</option>
          <option value='upsellable'>Upsellable</option>
          <option value='highdollar'>Highdollar</option>
        </select>
        <div className='grid-2'>
          <div>
            {""}
            <label htmlFor='quote'>Quoted Fee</label>
            <input
              type='text'
              value={quote}
              name='quote'
              disabled
              onChange={onChange}
            />
            <label htmlFor='quote'>Gross Fees</label>
            <input
              type='text'
              value={gross}
              name='gross'
              disabled
              onChange={onChange}
            />
            <label htmlFor='quote'>Initial Payment</label>
            <input
              type='text'
              value={initial}
              name='initial'
              disabled
              onChange={onChange}
            />
            <label htmlFor='quote'>Total Payment</label>
            <input
              type='text'
              value={total}
              name='total'
              disabled
              onChange={onChange}
            />
            <label htmlFor='quote'>LatePayments</label>
            <input
              type='text'
              value={redLine}
              name='redLine'
              disabled
              onChange={onChange}
            />
            <label htmlFor='quote'>RefundedPayments</label>
            <input
              type='text'
              value={refunded}
              name='refunded'
              disabled
              onChange={onChange}
            />
          </div>
          <div>
            {""}
            <label htmlFor='quote'>PercentComplete{""}</label>
            <input
              type='text'
              value={percentPaid}
              name='percentComplete'
              disabled
              onChange={onChange}
            />
            <label htmlFor='quote'>PaymentsLeft{""}</label>
            <input
              type='text'
              value={paymentsRemaining}
              name='paymentsRemaining'
              disabled
              onChange={onChange}
            />
            <label htmlFor='quote'>LoanInformation</label>
            <input
              type='text'
              value={loans}
              name='loans'
              disabled
              onChange={onChange}
            />
            <label htmlFor='quote'>Initial Payment Date</label>
            <input
              type='text'
              value={formattedPostedDate}
              name='initialPaymentDate'
              onChange={onChange}
            />
            <label htmlFor='quote'>Last Payment Date</label>
            <input
              type='text'
              value={formattedPostedDate2}
              onChange={onChange}
              name='lastPaymentDate'
            />
            <label htmlFor='quote'>Balance</label>
            <input
              type='text'
              value={balance}
              onChange={onChange}
              name='balance'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingStatus;
