import React, { useContext, useEffect } from "react";
import LeadContext from "../../../context/lead/leadContext";
import UserContext from "../../../context/user/userContext";
import { Link } from "react-router-dom";

const TodaysLeadItem = ({ prospect }) => {
  const {
    fullName,
    plaintiff,
    deliveryAddress,
    city,
    st,
    zip4,
    taxAmount,
    phone,
    email,
    _id,
    compliant,
    filingStatus,
    cpa,
    notes,
    tasks,
    closerid,
    lexId,
    ssn,
    isClaimed,
    isClosed,
    isPaid,
  } = prospect;

  const match = prospect;
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);

  const { getProspect } = leadContext;
  const { setRecent } = userContext;

  const onClick = (e) => {
    getProspect(_id);
    setRecent(match);
  };

  return (
    <div className='card bg-white'>
      <h5>
        {" "}
        <span>{fullName}</span>{" "}
        <span style={{ float: "right" }}>
          {" "}
          <Link
            to={`/prospects/${_id}`}
            onClick={onClick}
            className='btn btn-dark btn-sm my-1'>
            View Lead
          </Link>
        </span>{" "}
      </h5>

      <div className='leadul'>
        <p className='leaditem'>
          <strong>Phone </strong> <br /> {phone}
        </p>
        <p></p>
        <p className='leaditem'>
          <strong>Email </strong> <br /> {email}
        </p>
      </div>

      <br />

      <div className='grid-2'>
        <p className='leaditem'>
          <strong>Plaintiff</strong> <br />
          {plaintiff}
        </p>
        <p className='leaditem'>
          <strong>Amount Owed</strong> <br />
          {taxAmount}
        </p>
        <p className='leaditem'>
          <strong>Filing Status</strong> <br />
          {compliant}
        </p>
        <p className='leaditem'>
          <strong>Marital Status</strong> <br />
          {filingStatus}
        </p>
        <p className='leaditem'>
          <strong>CPA</strong> <br />
          {cpa}
        </p>
      </div>
    </div>
  );
};

export default TodaysLeadItem;
