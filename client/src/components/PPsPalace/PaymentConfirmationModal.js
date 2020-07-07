import React, { useState, useContext, useEffect, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
const PaymentModal = (props) => {
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);

  const { putPaymentMethod, currentMethod, prospect } = leadContext;
  const { user } = userContext;

  console.log(props);

  const { paymentMethods } = prospect;

  console.log(user);
  useEffect(() => {
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
  }, []);

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
  };

  const onClick = (e) => {
    putPaymentMethod(method, prospect);
    clearAll();
  };
  return (
    <div>
      <button onClick={props.togglePaymentConfirmationState}>X</button>
      <h3> {name} </h3>
      <label htmlFor='quote'>Name</label>
      <input type='text' value={name} name='name' onChange={onChange} />
      <label htmlFor='quote'>Contact</label>
      <input type='text' value={contact} name='contact' onChange={onChange} />

      {type === "creditcard" ? (
        <Fragment>
          <label htmlFor='quote'>Card Type</label>
          <input type='text' value={ccType} name='ccType' onChange={onChange} />
          <label htmlFor='quote'>Name on Card</label>
          <input type='text' value={ccName} name='ccName' onChange={onChange} />
          <label htmlFor='quote'>Credit Card Number</label>
          <input type='text' value={ccNo} name='ccNo' onChange={onChange} />
          <label htmlFor='quote'>Credit Card Expiry</label>
          <input type='text' value={ccExp} name='ccExp' onChange={onChange} />
          <label htmlFor='quote'>Credit Card Security Code</label>
          <input type='text' value={ccSec} name='ccExp' onChange={onChange} />
          <label htmlFor='quote'>Credit Card Zip</label>
          <input type='text' value={ccZip} name='ccZip' onChange={onChange} />

          <button onClick={onClick}>Update Credit Card</button>
        </Fragment>
      ) : (
        ""
      )}
      {type === "debitcard" ? (
        <Fragment>
          <label htmlFor='quote'>Card Type</label>
          <input type='text' value={ccType} name='ccType' onChange={onChange} />
          <label htmlFor='quote'>Name on Card</label>
          <input type='text' value={ccName} name='ccName' onChange={onChange} />
          <label htmlFor='quote'>Debit Card Number</label>
          <input type='text' value={ccNo} name='ccNo' onChange={onChange} />
          <label htmlFor='quote'>Debit Card Security Code</label>
          <input type='text' value={ccSec} name='ccExp' onChange={onChange} />
          <label htmlFor='quote'>Debit Card Expiry</label>
          <input type='text' value={ccExp} name='ccExp' onChange={onChange} />
          <label htmlFor='quote'>Debit Card Pin</label>
          <input type='text' value={ccPin} name='ccPin' onChange={onChange} />

          <button onClick={onClick}>Update Debit Card</button>
        </Fragment>
      ) : (
        ""
      )}
      {type === "checkingaccount" ? (
        <Fragment>
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
          <input type='text' value={accNo} name='accNo' onChange={onChange} />
          <label htmlFor='quote'>Checking Account Routing</label>
          <input
            type='text'
            value={accRouting}
            name='accRouting'
            onChange={onChange}
          />

          <button onClick={onClick}>Update Checking Account</button>
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
          <input type='text' value={accNo} name='accNo' onChange={onChange} />
          <label htmlFor='quote'>Savings Account Routing</label>
          <input
            type='text'
            value={accRouting}
            name='accRouting'
            onChange={onChange}
          />

          <button onClick={onClick}>Update Savings Account</button>
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default PaymentModal;
