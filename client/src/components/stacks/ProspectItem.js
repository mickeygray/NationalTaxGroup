import React, { useContext, useEffect } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import { Link } from "react-router-dom";

const ProspectItem = ({ prospect }) => {
  const { fullName, amount, phone, email, _id, quote, pinCode } = prospect;

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
    <Link
      to={`/prospects/${_id}`}
      onClick={onClick}
      style={{ backgroundColor: "yellow", color: "black", height: "66px" }}>
      <nav className='navbar'>
        <ul>
          <li className='px-2'>
            {" "}
            <strong>Full Name </strong> <br /> {fullName}
          </li>
          <li className='px-2'>
            {" "}
            <strong>Phone </strong> <br /> {phone}
          </li>
          <li className='px-2'>
            {" "}
            <strong>Email </strong> <br /> {email}
          </li>
          <li className='px-2'>
            {" "}
            <strong>Amount </strong> <br /> {amount}
          </li>
          <li className='px-2'>
            {" "}
            <strong>Quote </strong> <br /> {quote}
          </li>
          <li className='px-2'>
            <strong>Pin Code </strong> <br /> {pinCode}
          </li>
        </ul>
      </nav>
    </Link>
  );
};

export default ProspectItem;
