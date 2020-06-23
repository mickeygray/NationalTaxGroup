import React, { useContext } from "react";
import LeadContext from "../../../context/lead/leadContext";

const LienItem = ({ lead }) => {
  const leadContext = useContext(LeadContext);
  const {
    _id,
    fullName,
    deliveryAddress,
    city,
    st,
    zip4,
    pinCode,
    email,
    plaintiff,
    taxAmount,
  } = lead;
  const lienid = _id.toString();

  const current = {
    lienid,
    fullName,
    deliveryAddress,
    city,
    st,
    zip4,
    pinCode,
    email,
    plaintiff,
    taxAmount,
  };

  const { setCurrent, makeDNC } = leadContext;

  return (
    <div className='card bg-light'>
      <h5 className='text-danger text-left'>{fullName}</h5>
      <ul className='list'>
        <li>
          Address:
          <br />
          {deliveryAddress}
        </li>
        <li>
          Lien Amount:
          <br /> {taxAmount}
        </li>
        <li>
          Plaintiff:
          <br /> {plaintiff}
        </li>
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm my-1'
          onClick={() => setCurrent(current)}>
          Set Lead
        </button>
        <button className='btn btn-danger btn-sm' onClick={() => makeDNC(lead)}>
          Do Not Contact
        </button>
      </p>
    </div>
  );
};

export default LienItem;
