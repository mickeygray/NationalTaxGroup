import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import PaymentModal from "./PaymentModal";

const PaymentMethodItem = (props) => {
  const leadContext = useContext(LeadContext);
  const { deletePaymentMethod, prospect, setCurrentMethod } = leadContext;
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const { paymentMethod } = props;
  console.log(user);
  const { name } = paymentMethod;

  const onClick = (e) => {
    props.togglePaymentModal();
    setCurrentMethod(paymentMethod);
  };
  return (
    <Fragment>
      <div
        className='btn btn-dark btn-sm'
        style={{
          backgroundColor: "black",
          marginLeft: "5px",
          width: "150px",
          height: "35px",
        }}>
        <button
          className='bg-dark'
          style={{
            overflow: "hidden",
          }}
          onClick={onClick}>
          {" "}
          {name}
        </button>
        <button
          style={{
            float: "right",
          }}
          onClick={() => deletePaymentMethod(paymentMethod, prospect)}>
          {" "}
          X
        </button>
      </div>
    </Fragment>
  );
};

export default PaymentMethodItem;
