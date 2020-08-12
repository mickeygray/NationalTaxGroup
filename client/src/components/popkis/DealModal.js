import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  Fragment,
} from "react";
import UserContext from "../../context/user/userContext";
import AuthContext from "../../context/auth/authContext";
import LeadContext from "../../context/lead/leadContext";
import UserModal from "./UserModal";
import { v4 as uuidv4 } from "uuid";
import { DateRangePicker, Calendar } from "react-date-range";
import PaymentMethods from "./PaymentMethods";
import PaymentScheduleModal from "./PaymentScheduleModal";
import PaymentModal from "./PaymentModal";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

const DealModal = (props) => {
  const authContext = useContext(AuthContext);
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);

  const { user } = authContext;

  const { prospect, putPaymentMethod, putPaymentSchedule } = leadContext;

  useEffect(() => {
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
      totalBalance: 0,
      availableBalance: 0,
    });

    setScheduleItem({
      initialPaymentMethod: "",
      initialPaymentAmount: 0,
      initialPaymentDate: null,
      secondPaymentMethod: "",
      secondPaymentAmount: 0,
      secondPaymentDate: null,
    });
    setIteration({
      installments: "",
      interval: "",
      installmentAmount: "",
    });
  }, []);

  const [scheduleItem, setScheduleItem] = useState({
    initialPaymentMethod: "",
    initialPaymentAmount: 0,
    initialPaymentDate: null,
    secondPaymentMethod: "",
    secondPaymentAmount: 0,
    secondPaymentDate: null,
  });

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
    totalBalance: 0,
    availableBalance: 0,
  });

  const [validate, setValidate] = useState(false);
  const {
    accBank,
    accType,
    accRouting,
    accNo,
    cardNumber,
    cvc,
    totalBalance,
    availableBalance,
    expiryDate,
    name,
  } = state;
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

  const clearAll = () => {
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
      totalBalance: 0,
      availableBalance: 0,
    });
  };
  const onClick = (e) => {
    putPaymentMethod(state, prospect);
    clearAll();
  };

  const onClick2 = (e) => {
    putPaymentSchedule(iteration, scheduleItem, prospect);
    clearAll();
  };

  const [iteration, setIteration] = useState({
    installments: "",
    interval: "",
    installmentAmount: "",
  });
  const [type, setType] = useState("");
  const onChange = (e) => {
    setScheduleItem({ ...scheduleItem, [e.target.name]: e.target.value });
    setIteration({ ...iteration, [e.target.name]: e.target.value });
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onChange2 = (e) => {
    setType(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const {
    initialPaymentAmount,
    initialPaymentDate,
    initialPaymentMethod,
    secondPaymentAmount,
    secondPaymentDate,
    secondPaymentMethod,
    thirdPaymentDate,
  } = scheduleItem;
  const { installments, interval, installmentAmount } = iteration;
  console.log(scheduleItem);

  const [paymentScheduleState, setPaymentScheduleState] = useState(false);
  const togglePaymentScheduleState = useCallback(() => {
    setPaymentScheduleState((prevState) => !prevState);
  }, []);

  const [paymentModal, setPaymentModal] = useState(false);
  const togglePaymentModal = useCallback(() => {
    setPaymentModal((prevState) => !prevState);
  }, []);

  const handleSelect1 = (date) => {
    setScheduleItem({
      initialPaymentMethod: initialPaymentMethod,
      initialPaymentAmount: initialPaymentAmount,
      initialPaymentDate: date,
      secondPaymentMethod: secondPaymentMethod,
      secondPaymentAmount: secondPaymentAmount,
      secondPaymentDate: secondPaymentDate,
    });
  };

  const handleSelect2 = (date) => {
    setScheduleItem({
      initialPaymentMethod: initialPaymentMethod,
      initialPaymentAmount: initialPaymentAmount,
      initialPaymentDate: initialPaymentDate,
      secondPaymentMethod: secondPaymentMethod,
      secondPaymentAmount: secondPaymentAmount,
      secondPaymentDate: date,
    });
  };

  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();
  return (
    <div className='card grid-deal'>
      <div>
        <button onClick={props.toggleDealModal}>X</button>
        <h3> Create New Payment Method</h3>

        <label htmlFor='quote'>Name Payment Method</label>
        <input type='text' value={name} name='name' onChange={onChange} />
        <select name='type' id='type' value={type} onChange={onChange2}>
          <option></option>
          <option
            value='creditcard'
            checked={type === "creditcard"}
            onChange={onChange2}>
            Credit / Debit
          </option>
          <option
            onChange={onChange2}
            value='account'
            checked={type === "account"}>
            Checking / Savings
          </option>
        </select>

        {type === "creditcard" ? (
          <Fragment>
            <div className='bg-light card'>
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
            </div>
          </Fragment>
        ) : (
          ""
        )}

        {type === "account" ? (
          <Fragment>
            <div className='bg-light card'>
              <label htmlFor='quote'>Bank Name</label>
              <input
                type='text'
                value={accBank}
                name='accBank'
                onChange={onChange}
              />
              <label htmlFor='quote'>Account Type</label>
              <input
                type='text'
                value={accType}
                name='accType'
                onChange={onChange}
              />
              <label htmlFor='quote'>Account Number</label>
              <input
                type='text'
                value={accNo}
                name='accNo'
                onChange={onChange}
              />
              <label htmlFor='quote'>Account Routing</label>
              <input
                type='text'
                value={accRouting}
                name='accRouting'
                onChange={onChange}
              />
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

              <button onClick={onClick}>Update Account</button>
            </div>
          </Fragment>
        ) : (
          ""
        )}
      </div>
      <div>
        {paymentScheduleState ? (
          <PaymentScheduleModal
            togglePaymentScheduleState={togglePaymentScheduleState}
            prospect={prospect}
          />
        ) : (
          <div>
            <h3> Set Payment Schedule</h3>
            Schedule
            <div className='grid-2'>
              <div>
                <label htmlFor='quote'>Initial Payment Date</label>
                <Calendar
                  name='initialPaymentDate'
                  date={initialPaymentDate}
                  value={initialPaymentDate}
                  onChange={handleSelect1}
                />
                <br />
                <label htmlFor='quote'>Initial Payment Amount</label>
                <input
                  onChange={onChange}
                  type='text'
                  value={initialPaymentAmount}
                  name='initialPaymentAmount'
                />
                <label htmlFor='quote'>Payment Method Name</label>
                <input
                  onChange={onChange}
                  type='text'
                  value={initialPaymentMethod}
                  name='initialPaymentMethod'
                />
                <label htmlFor='quote'>Installments</label>
                <input
                  onChange={onChange}
                  type='text'
                  value={installments}
                  name='installments'
                />

                <button
                  className='btn btn-block btn-success'
                  onClick={() => setPaymentScheduleState(true)}>
                  View Payment Schedule
                </button>
              </div>
              <div>
                <label htmlFor='quote'>Second Payment Date</label>
                <Calendar
                  name='secondPaymentDate'
                  date={secondPaymentDate}
                  value={secondPaymentDate}
                  onChange={handleSelect2}
                />
                <br />
                <label htmlFor='quote'>Second Payment Amount</label>
                <input
                  onChange={onChange}
                  type='text'
                  value={secondPaymentAmount}
                  name='secondPaymentAmount'
                />
                <label htmlFor='quote'>Payment Method Name</label>
                <input
                  onChange={onChange}
                  type='text'
                  value={secondPaymentMethod}
                  name='secondPaymentMethod'
                />
                <label htmlFor='quote'>Installment Amount</label>
                <input
                  onChange={onChange}
                  type='text'
                  value={installmentAmount}
                  name='installmentAmount'
                />
                <button className='btn btn-block btn-danger' onClick={onClick2}>
                  Set Payment Schedule
                </button>{" "}
              </div>
            </div>
            <div>
              <select
                name='interval'
                id='interval'
                value={interval}
                onChange={onChange}>
                <option>Select A payment Interval</option>
                <option
                  value='single'
                  checked={interval === "single"}
                  onChange={onChange}>
                  One Time
                </option>
                <option
                  value='weekly'
                  checked={interval === "weekly"}
                  onChange={onChange}>
                  Weekly
                </option>
                <option
                  onChange={onChange}
                  value='biweekly'
                  checked={interval === "biweekly"}>
                  Bi-Weekly
                </option>
                <option
                  onChange={onChange}
                  value='monthly'
                  checked={interval === "monthly"}>
                  Monthly
                </option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div>
        <h3>Payment Methods </h3>
        {paymentModal ? (
          <PaymentModal
            togglePaymentModal={togglePaymentModal}
            prospect={prospect}
            user={user}
          />
        ) : (
          <PaymentMethods
            prospect={prospect}
            togglePaymentModal={togglePaymentModal}
          />
        )}
      </div>
    </div>
  );
};

export default DealModal;
