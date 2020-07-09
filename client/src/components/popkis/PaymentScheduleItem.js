import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  Fragment,
} from "react";
import LeadContext from "../../context/lead/leadContext";
import EditPaymentScheduleModal from "./EditPaymentScheduleModal";
import refund from "../../images/refund.png";

const PaymentScheduleItem = ({ payment }) => {
  const leadContext = useContext(LeadContext);

  const { deletePaymentScheduleItem, prospect } = leadContext;
  const [paymentItemState, setPaymentItemState] = useState(false);

  const { paymentDate, paymentMethod, paymentAmount, paymentId } = payment;

  console.log(paymentId);

  let dateDisplay1 = new Date(paymentDate);
  let formattedPostedDate = Intl.DateTimeFormat(
    "en-US",
    { timeZone: "America/Los_Angeles" },
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  ).format(dateDisplay1);
  const toggleEditState = useCallback(() => {
    setPaymentItemState((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (paymentId.length > 30) {
      setColorStyle({
        backgroundColor: "green",
        color: "white",
      });
    } else if (paymentId.slice(0, 3) === "red") {
      setColorStyle({
        backgroundColor: "red",
        color: "yellow",
      });
    } else if (paymentId.slice(0, 3) === "ref") {
      setColorStyle({
        backgroundImage: `url(${refund})`,
        backgroundRepeat: "norepeat",
        backgroundSize: "cover",
      });
    }
  }, [paymentId]);

  const [colorStyle, setColorStyle] = useState({
    backgroundColor: "#f4f4f4",
    color: "black",
  });

  return (
    <div className='card bg-light' style={colorStyle}>
      {paymentItemState ? (
        <EditPaymentScheduleModal
          toggleEditState={toggleEditState}
          payment={payment}
        />
      ) : (
        <Fragment>
          <h5 className='text-danger text-left'>{formattedPostedDate}</h5>
          <ul className='list' style={{ fontSize: ".8rem" }}>
            <li>
              Amount:
              <br />
              {paymentAmount}
            </li>
            <li>
              Payment used:
              <br /> {paymentMethod}
            </li>
            <li></li>
            <li></li>
          </ul>
        </Fragment>
      )}

      {paymentItemState ? (
        ""
      ) : (
        <div>
          <button
            className='btn btn-dark btn-sm my-1'
            onClick={() => setPaymentItemState((prevState) => !prevState)}>
            Update Payment
          </button>
          <button
            className='btn btn-dark btn-sm my-1'
            onClick={() => deletePaymentScheduleItem(payment, prospect)}>
            Delete Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentScheduleItem;
