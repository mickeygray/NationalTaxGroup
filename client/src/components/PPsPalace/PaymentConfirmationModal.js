import React, { useState, useContext, useEffect, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import StatContext from "../../context/stat/statContext";
import EmailContext from "../../context/email/emailContext";
import { v4 as uuidv4 } from "uuid";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
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
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();
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
      setState(currentMethod);
      setError(null);
      setId("");
    } else {
      setError("No payment found");
      setState({
        id: "",
        cvc: "",
        expiryDate: "",
        name: "",
        cardNumber: "",
        accBank: "",
        accType: "",
        accRouting: "",
        accNo: "",
      });
    }
  }, [currentMethod, leadContext]);

  const [error, setError] = useState("");
  const [state, setState] = useState({
    name: "",
    id: "",
    cvc: "",
    expiryDate: "",
    name: "",
    cardNumber: "",
    accBank: "",
    accType: "",
    accRouting: "",
    accNo: "",
  });
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const {
    cvc,
    expiryDate,
    name,
    accBank,
    accRouting,
    accNo,
    accType,
    cardNumber,
  } = state;

  const clearAll = () => {
    setState({
      name: "",
      id: "",
      cvc: "",
      expiryDate: "",
      name: "",
      cardNumber: "",
      accBank: "",
      accType: "",
      accRouting: "",
      accNo: "",
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
          {currentMethod && currentMethod.cvc ? (
            <Fragment>
              <PaymentInputsWrapper {...wrapperProps}>
                <svg {...getCardImageProps({ images })} />

                <input
                  {...getCardNumberProps({ onChange: onChange })}
                  value={cardNumber}
                />
                <input
                  {...getExpiryDateProps({ onChange: onChange })}
                  value={expiryDate}
                />
                <input {...getCVCProps({ onChange: onChange })} value={cvc} />
              </PaymentInputsWrapper>
            </Fragment>
          ) : (
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

              <button>Update Checking Account</button>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentModal;
