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

const DealModal = (props) => {
  const authContext = useContext(AuthContext);
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);

  const { user } = authContext;

  const { prospect, putPaymentMethod, putPaymentSchedule } = leadContext;

  useEffect(() => {
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
      ccContact: "",
      accContact: "",
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

  const [method, setMethod] = useState({
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
    ccContact: "",
    accContact: "",
  });

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
      ccContact: "",
      accContact: "",
    });
  };
  const onClick = (e) => {
    putPaymentMethod(method, prospect);
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

  const onChange = (e) => {
    setScheduleItem({ ...scheduleItem, [e.target.name]: e.target.value });
    setMethod({ ...method, [e.target.name]: e.target.value });
    setIteration({ ...iteration, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
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
    ccPin,
    ccSec,
    accBank,
    accType,
    accRouting,
    accNo,
    contact,
  } = method;

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
  return (
    <>
      <div className='card grid-deal'>
        <div>
          <button onClick={props.toggleDealModal}>X</button>
          <h3> Create New Payment Method</h3>

          <label htmlFor='quote'>Name Payment Method</label>
          <input type='text' value={name} name='name' onChange={onChange} />
          <select name='type' id='type' value={type} onChange={onChange}>
            <option></option>
            <option
              value='creditcard'
              checked={type === "creditcard"}
              onChange={onChange}>
              Credit Card
            </option>
            <option
              onChange={onChange}
              value='debitcard'
              checked={type === "debitcard"}>
              Debit Card
            </option>
            <option
              onChange={onChange}
              value='savingsaccount'
              checked={type === "savingsaccount"}>
              Savings Account
            </option>
            <option
              onChange={onChange}
              value='checkingaccount'
              checked={type === "checkingaccount"}>
              Checking Account
            </option>
          </select>
          {type != "" ? (
            <div className='bg-light card'>
              {type === "creditcard" ? (
                <Fragment>
                  <label htmlFor='quote'>Card Type</label>
                  <input
                    type='text'
                    onChange={onChange}
                    value={ccType}
                    name='ccType'
                  />
                  <label htmlFor='quote'>Name on Card</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={ccName}
                    name='ccName'
                  />
                  <label htmlFor='quote'>Credit Card Number</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={ccNo}
                    name='ccNo'
                  />
                  <label htmlFor='quote'>Credit Card Expiry</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={ccExp}
                    name='ccExp'
                  />
                  <label htmlFor='quote'>Credit Card Security Code</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={ccSec}
                    name='ccSec'
                  />
                  <label htmlFor='quote'>Credit Card Zip</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={ccZip}
                    name='ccZip'
                  />

                  <button onClick={onClick}>Add Credit Card</button>
                </Fragment>
              ) : (
                ""
              )}
              {type === "debitcard" ? (
                <Fragment>
                  <label htmlFor='quote'>Card Type</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={ccType}
                    name='ccType'
                  />
                  <label htmlFor='quote'>Name on Card</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={ccName}
                    name='ccName'
                  />
                  <label htmlFor='quote'>Debit Card Number</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={ccNo}
                    name='ccNo'
                  />
                  <label htmlFor='quote'>Debit Card Security Code</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={ccSec}
                    name='ccSec'
                  />
                  <label htmlFor='quote'>Debit Card Expiry</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={ccExp}
                    name='ccExp'
                  />
                  <label htmlFor='quote'>Debit Card Pin</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={ccPin}
                    name='ccPin'
                  />

                  <button onClick={onClick}>Add Debit Card</button>
                </Fragment>
              ) : (
                ""
              )}
              {type === "checkingaccount" ? (
                <Fragment>
                  <label htmlFor='quote'>Bank Name</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={accBank}
                    name='accBank'
                  />
                  <label htmlFor='quote'>Checking Account Type</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={accType}
                    name='accType'
                  />
                  <label htmlFor='quote'>Checking Account Number</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={accNo}
                    name='accNo'
                  />
                  <label htmlFor='quote'>Checking Account Routing</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={accRouting}
                    name='accRouting'
                  />

                  <button onClick={onClick}>Add Checking Account</button>
                </Fragment>
              ) : (
                ""
              )}
              {type === "savingsaccount" ? (
                <Fragment>
                  <label htmlFor='quote'>Bank Name</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={accBank}
                    name='accBank'
                  />
                  <label htmlFor='quote'>Savings Account Type</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={accType}
                    name='accType'
                  />
                  <label htmlFor='quote'>Savings Account Number</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={accNo}
                    name='accNo'
                  />
                  <label htmlFor='quote'>Savings Account Routing</label>
                  <input
                    onChange={onChange}
                    type='text'
                    value={accRouting}
                    name='accRouting'
                  />

                  <button onClick={onClick}>Add Savings Account</button>
                </Fragment>
              ) : (
                ""
              )}
            </div>
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
                  <button
                    className='btn btn-block btn-danger'
                    onClick={onClick2}>
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
    </>
  );
};

export default DealModal;
