import React, { useState, useContext, useEffect, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import StatContext from "../../context/stat/statContext";
import EmailContext from "../../context/email/emailContext";
import { v4 as uuidv4 } from "uuid";
const PaymentModal = (props) => {
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);
  const statContext = useContext(StatContext);
  const emailContext = useContext(EmailContext);
  const {
    currentMethod,
    currentClient,
    clearCurrentClient,
    clearCurrentMethod,
  } = leadContext;
  const { user, getUserEmail } = userContext;

  const { notifyCloser } = emailContext;

  const { updatePayment } = statContext;
  console.log(props);

  const { payment, togglePaymentConfirmationState } = props;

  const { paymentDate } = payment;

  let dateDisplay1 = new Date(paymentDate);
  let formattedPayDate = Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(dateDisplay1);

  useEffect(() => {
    if (currentMethod != null) {
      setMethod(currentMethod);
      setError(null);
      setId("");
    } else {
      setError("No payment found");
      setMethod({
        name: "",
        type: "",
        ccName: "",
        ccType: "",
        ccNo: "",
        ccExp: "",
        ccZip: "",
        ccSec: "",
        ccPin: "",
        accBank: "",
        accType: "",
        accRouting: "",
        accNo: "",
        contact: "",
      });
    }
  }, [currentMethod, leadContext]);

  const [error, setError] = useState("");
  const [method, setMethod] = useState({
    name: "",
    type: "",
    ccName: "",
    ccType: "",
    ccNo: "",
    ccExp: "",
    ccZip: "",
    ccSec: "",
    ccPin: "",
    accBank: "",
    accType: "",
    accRouting: "",
    accNo: "",
    contact: "",
  });

  const onChange = (e) => {
    setMethod({ ...method, [e.target.name]: e.target.value });
  };

  const {
    name,
    id,
    type,
    ccName,
    ccType,
    ccNo,
    ccExp,
    ccZip,
    ccSec,
    ccPin,
    accBank,
    accType,
    accRouting,
    accNo,
    contact,
  } = method;

  const clearAll = () => {
    setMethod({
      name: "",
      id: "",
      type: "",
      ccType: "",
      ccNo: "",
      ccExp: "",
      ccZip: "",
      ccSec: "",
      accBank: "",
      accType: "",
      accRouting: "",
      accNo: "",
      contact: "",
    });
    setId("");
    clearCurrentClient();
    clearCurrentMethod();
  };

  const [payid, setId] = useState("");

  const onClick = (e) => {
    setId(uuidv4());
  };

  const onClick2 = (e) => {
    setId("redline:" + formattedPayDate);
  };

  const onClick3 = (e) => {
    setId("refunded:" + formattedPayDate);
  };

  const onClick4 = (e) => {
    notifyCloser();
  };

  const onClick5 = (e) => {
    updatePayment(payment, currentClient, payid);
    clearAll();
  };

  const onClick6 = (e) => {
    togglePaymentConfirmationState();
    clearAll();
  };

  console.log(payid);
  return (
    <Fragment>
      <div>
        <button onClick={onClick6}>X</button>
        <h3> {name} </h3>
        <label htmlFor='quote'>Name</label>
        <input type='text' value={name} name='name' onChange={onChange} />
        <label htmlFor='quote'>Contact</label>
        <input type='text' value={contact} name='contact' onChange={onChange} />
      </div>

      <div className='grid-2'>
        <div className='card'>
          <h3>Set Payment Status</h3>

          <ul>
            <li>
              {" "}
              <button className='btn btn-dark btn-sm' onClick={onClick}>
                Confirm Successful Payment
              </button>
            </li>

            <br />

            <li>
              {" "}
              <button className='btn btn-dark btn-sm' onClick={onClick2}>
                Mark Payment Delinquent
              </button>
            </li>

            <br />

            <li>
              {" "}
              <button className='btn btn-dark btn-sm' onClick={onClick3}>
                Refund Payment
              </button>
            </li>

            <br />
            <li>
              {" "}
              <button onClick={onClick5}>Update Payment</button>
            </li>

            <br />

            <li>
              {" "}
              <button className='btn btn-dark btn-sm' onClick={onClick4}>
                Notify Closer of Invalid Payment
              </button>
            </li>
          </ul>
        </div>

        <div>
          {type === "creditcard" ? (
            <Fragment>
              <label htmlFor='quote'>Card Type</label>
              <input
                type='text'
                value={ccType}
                name='ccType'
                onChange={onChange}
              />
              <label htmlFor='quote'>Name on Card</label>
              <input
                type='text'
                value={ccName}
                name='ccName'
                onChange={onChange}
              />
              <label htmlFor='quote'>Credit Card Number</label>
              <input type='text' value={ccNo} name='ccNo' onChange={onChange} />
              <label htmlFor='quote'>Credit Card Expiry</label>
              <input
                type='text'
                value={ccExp}
                name='ccExp'
                onChange={onChange}
              />
              <label htmlFor='quote'>Credit Card Security Code</label>
              <input
                type='text'
                value={ccSec}
                name='ccExp'
                onChange={onChange}
              />
              <label htmlFor='quote'>Credit Card Zip</label>
              <input
                type='text'
                value={ccZip}
                name='ccZip'
                onChange={onChange}
              />

              <button onClick={onClick5}>Update Payment</button>
            </Fragment>
          ) : (
            ""
          )}
          {type === "debitcard" ? (
            <Fragment>
              <label htmlFor='quote'>Card Type</label>
              <input
                type='text'
                value={ccType}
                name='ccType'
                onChange={onChange}
              />
              <label htmlFor='quote'>Name on Card</label>
              <input
                type='text'
                value={ccName}
                name='ccName'
                onChange={onChange}
              />
              <label htmlFor='quote'>Debit Card Number</label>
              <input type='text' value={ccNo} name='ccNo' onChange={onChange} />
              <label htmlFor='quote'>Debit Card Security Code</label>
              <input
                type='text'
                value={ccSec}
                name='ccExp'
                onChange={onChange}
              />
              <label htmlFor='quote'>Debit Card Expiry</label>
              <input
                type='text'
                value={ccExp}
                name='ccExp'
                onChange={onChange}
              />
              <label htmlFor='quote'>Debit Card Pin</label>
              <input
                type='text'
                value={ccPin}
                name='ccPin'
                onChange={onChange}
              />

              <button onClick={onClick5}>Update Payment</button>
            </Fragment>
          ) : (
            ""
          )}
          {type === "checkingaccount" ? (
            <Fragment>
              {error ? error : ""}
              <label htmlFor='quote'>Bank Name</label>
              <input
                type='text'
                value={accBank}
                name='accBank'
                onChange={onChange}
              />
              <label htmlFor='quote'>Checking Account Type</label>
              <input
                type='text'
                value={accType}
                name='accType'
                onChange={onChange}
              />
              <label htmlFor='quote'>Checking Account Number</label>
              <input
                type='text'
                value={accNo}
                name='accNo'
                onChange={onChange}
              />
              <label htmlFor='quote'>Checking Account Routing</label>
              <input
                type='text'
                value={accRouting}
                name='accRouting'
                onChange={onChange}
              />

              <button onClick={onClick5}>Update Payment</button>
            </Fragment>
          ) : (
            ""
          )}
          {type === "savingsaccount" ? (
            <Fragment>
              <label htmlFor='quote'>Bank Name</label>
              <input
                type='text'
                value={accBank}
                name='accBank'
                onChange={onChange}
              />
              <label htmlFor='quote'>Savings Account Type</label>
              <input
                type='text'
                value={accType}
                name='accType'
                onChange={onChange}
              />
              <label htmlFor='quote'>Savings Account Number</label>
              <input
                type='text'
                value={accNo}
                name='accNo'
                onChange={onChange}
              />
              <label htmlFor='quote'>Savings Account Routing</label>
              <input
                type='text'
                value={accRouting}
                name='accRouting'
                onChange={onChange}
              />
            </Fragment>
          ) : (
            ""
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentModal;
