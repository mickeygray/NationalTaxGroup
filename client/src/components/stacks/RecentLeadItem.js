import React, { useContext } from "react";
import LeadContext from "../../context/lead/leadContext";
import { Link } from "react-router-dom";
import UserContext from "../../context/user/userContext";
import AuthContext from "../../context/auth/authContext";

const RecentLeadItem = ({
  recentLead: {
    fullName,
    deliveryAddress,
    city,
    st,
    zip4,
    plaintiff,
    taxAmount,
    email,
    phone,
    cpa,
    filingStatus,
    compliant,
    ssn,
    note,
    closerid,
    _id,
  },
}) => {
  const { user } = useContext(AuthContext);
  const match = {
    fullName,
    deliveryAddress,
    city,
    st,
    zip4,
    plaintiff,
    taxAmount,
    email,
    phone,
    cpa,
    filingStatus,
    compliant,
    ssn,
    note,
    closerid,
    _id,
  };
  const { setRecentLead, getProspect } = useContext(LeadContext);
  const { deleteRecentLead, recentLead } = useContext(UserContext);

  const onClick = (e) => {
    getProspect(_id);
    setRecentLead(match);
  };

  return (
    <div
      className='btn btn-light btn-sm'
      style={{
        backgroundColor: "black",
        marginLeft: "5px",
        width: "150px",
        height: "35px",
      }}>
      <Link
        style={{
          overflow: "hidden",
        }}
        to={{ pathname: `/prospects/${_id}`, state: { match: true } }}
        onClick={onClick}>
        {" "}
        {fullName}
      </Link>
      <button
        style={{
          float: "right",
        }}
        onClick={() => deleteRecentLead(match._id)}>
        {" "}
        X
      </button>
    </div>
  );
};

export default RecentLeadItem;
