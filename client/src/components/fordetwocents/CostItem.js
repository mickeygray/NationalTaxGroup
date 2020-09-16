import React, { useContext, useState, useEffect } from "react";
import MailContext from "../../context/mail/mailContext";

const CostItem = (props) => {
  console.log(props);

  const mailContext = useContext(MailContext);

  const { submitCosts } = mailContext;
  const displayRange = [];
  props.mailCost.dateRange.forEach((date) => {
    const display = Intl.DateTimeFormat(
      "en-US",
      {
        timeZone: "America/Los_Angeles",
      },
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }
    ).format(new Date(date));

    displayRange.push(display);
  });

  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [invoiceState, setInvoiceState] = useState(false);
  const [total, setTotal] = useState(0);

  const onClick = (e) => {
    setInvoiceState((prevState) => !prevState);
    submitCosts(total, props.mailCost.mailer);
  };

  useEffect(() => {
    if (invoiceState === true) {
      setTotal(invoiceTotal);
    } else {
      setTotal(props.mailCost.totalCost);
    }
  }, [invoiceState, invoiceTotal, total]);

  return (
    <div className='card bg=dark'>
      <ul>
        <li>Mailer Name : {props.mailCost.mailer}</li>

        {invoiceState ? (
          <li>
            <input
              type='text'
              placeholder='Invoice Total...'
              name='invoiceTotal'
            />
          </li>
        ) : (
          <li>Our Estimated Cost : {props.mailCost.totalCost}</li>
        )}

        <li>Date Range : {displayRange}</li>
      </ul>

      {invoiceState ? (
        ""
      ) : (
        <button onClick={() => submitCosts(total, props.mailCost.mailer)}>
          Invoice Matches Estimate
        </button>
      )}

      {invoiceState ? (
        <button onClick={onClick}>Submit Updated Estimate</button>
      ) : (
        <button onClick={() => setInvoiceState((prevState) => !prevState)}>
          Update Estimate
        </button>
      )}
    </div>
  );
};

export default CostItem;
