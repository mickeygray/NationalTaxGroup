import React, { useContext, useEffect } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import { Link } from "react-router-dom";

const TodaysProspectItem = ({ prospect }) => {
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
      style={{ backgroundColor: "yellow" }}>
      View Lead
      <nav className='navbar'>
        <ul>
          <li>
            {" "}
            <strong>Full Name </strong> <br /> {fullName}
          </li>
          <li>
            {" "}
            <strong>Phone </strong> <br /> {phone}
          </li>
          <li>
            {" "}
            <strong>Email </strong> <br /> {email}
          </li>
          <li>
            {" "}
            <strong>Amount </strong> <br /> {amount}
          </li>
          <li>
            {" "}
            <strong>Quote </strong> <br /> {quote}
          </li>
          <li>
            <strong>Pin Code </strong> <br /> {pinCode}
          </li>
        </ul>
      </nav>
    </Link>
  );
};

export default TodaysProspectItem;
