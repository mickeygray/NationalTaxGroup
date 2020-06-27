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
  const { deleteRecentLead, recentLeads } = useContext(UserContext);

  const onClick = (e) => {
    getProspect(_id);
    setRecentLead(match);
  };

  return (
    <div
      className='grid-2'
      style={{
        marginLeft: "5px",
        width: "133px",
        height: "25px",
        overflow: "hidden",
      }}>
      <button>
        style={{ fontSize: ".7rem" }}
        onClick={() => deleteRecentLead(recentLeads, match)}> X
      </button>

      <Link
        to={{ pathname: `/prospects/${_id}`, state: { match: true } }}
        onClick={onClick}
        className='btn btn-dark btn-sm'>
        {" "}
        {fullName}
      </Link>
    </div>
  );
};

export default RecentLeadItem;
