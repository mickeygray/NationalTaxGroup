import React, { useContext } from "react";
import LeadContext from "../../context/lead/leadContext";

const LeadItem = ({ lead }) => {
  const leadContext = useContext(LeadContext);
  const {
    _id,
    fullName,
    deliveryAddress,
    city,
    state,
    zip4,
    pinCode,
    emailAddress,
    plaintiff,
    amount,
  } = lead;
  const lienid = _id.toString();

  const current = {
    lienid,
    fullName,
    deliveryAddress,
    city,
    state,
    zip4,
    emailAddress,
    pinCode,
    plaintiff,
    amount,
  };

  const { setCurrent, makeDNC } = leadContext;

  return (
    <div className='card bg-light'>
      <h5 className='text-danger text-left'>{fullName}</h5>{" "}
      <ul className='list grid-4' style={{ fontSize: ".8rem" }}>
        <li>
          Address:
          <br />
          {deliveryAddress}
        </li>
        <li>
          Lien Amount:
          <br /> {amount}
        </li>
        <li>
          Plaintiff:
          <br /> {plaintiff}
        </li>
        <li>
          Pin Code:
          <br /> {pinCode}
        </li>
      </ul>
      <button
        className='btn btn-dark btn-sm my-1'
        onClick={() => setCurrent(current)}>
        Set Lead
      </button>
      <button className='btn btn-danger btn-sm' onClick={() => makeDNC(lead)}>
        Do Not Contact
      </button>
    </div>
  );
};

export default LeadItem;
