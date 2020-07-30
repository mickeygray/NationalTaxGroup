import React, { useState, useContext, useEffect, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

const PaymentModal = (props) => {
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);

  const { putPaymentMethod, currentMethod } = leadContext;
  const { user } = userContext;

  console.log(props);

  const { prospect } = props;
  const { paymentMethods } = prospect;

  console.log(user);
  useEffect(() => {
    setState(currentMethod);
  }, []);

  console.log(currentMethod, "111111111111111111111111111111111111111111111");
  /*
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
*/
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
    totalBalance: 0,
    availableBalance: 0,
    accNo: "",
  });
  const onClick = (e) => {
    putPaymentMethod(state, prospect);
  };
  const handleInputFocus = (e) => {
    setState({ focus: e.target.name });
  };
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();
  /*
  const onClick = (e) => {
    putPaymentMethod(method, prospect);
    clearAll();
  };

  */
  const {
    cvc,
    expiryDate,
    name,
    accBank,
    accRouting,
    accNo,
    accType,
    cardNumber,
    totalBalance,
    availableBalance,
  } = state;

  const [validate, setValidate] = useState(false);

  if (validate === true) {
    const luhn_checksum = (code) => {
      var len = code.length;
      var parity = len % 2;
      var sum = 0;
      for (var i = len - 1; i >= 0; i--) {
        var d = parseInt(code.charAt(i));
        if (i % 2 == parity) {
          d *= 2;
        }
        if (d > 9) {
          d -= 9;
        }
        sum += d;
      }
      return sum % 10;
    };

    /* luhn_caclulate
     * Return a full code (including check digit), from the specified partial code (without check digit).
     */
    const luhn_caclulate = (partcode) => {
      var checksum = luhn_checksum(partcode + "0");
      return checksum == 0 ? 0 : 10 - checksum;
    };

    /* luhn_validate
     * Return true if specified code (with check digit) is valid.
     */
    const luhn_validate = (fullcode) => {
      return luhn_checksum(fullcode) == 0;
    };

    luhn_validate(parseInt(cardNumber));
  }

  return (
    <div id='PaymentForm'>
      <button onClick={props.togglePaymentModal}>X</button>

      <label htmlFor='quote'>Name on Payment Method</label>
      <input type='text' value={name} name='name' onChange={onChange} />

      {currentMethod.cvc ? (
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
          <label htmlFor='quote'>Total Balance</label>
          <input
            type='text'
            value={totalBalance}
            name='totalBalance'
            onChange={onChange}
          />
          <label htmlFor='quote'>Available Balance</label>
          <input
            type='text'
            value={availableBalance}
            name='availableBalance'
            onChange={onChange}
          />

          <button onClick={() => setValidate((prevState) => !prevState)}>
            Validate Credit Card
          </button>
          <button onClick={onClick}>Update Account</button>
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
          <input type='text' value={accNo} name='accNo' onChange={onChange} />
          <label htmlFor='quote'>Checking Account Routing</label>
          <input
            type='text'
            value={accRouting}
            name='accRouting'
            onChange={onChange}
          />
          <input
            type='text'
            value={totalBalance}
            name='totalBalance'
            onChange={onChange}
          />
          <input
            type='text'
            value={availableBalance}
            name='availableBalance'
            onChange={onChange}
          />
          <button onClick={onClick}>Update Account</button>
        </Fragment>
      )}
    </div>
  );
};

export default PaymentModal;
