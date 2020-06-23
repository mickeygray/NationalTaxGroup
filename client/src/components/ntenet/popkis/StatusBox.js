import React, { useContext } from "react";
import LeadContext from "../../../context/lead/leadContext";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
import UserContext from "../../../context/user/userContext";

const StatusBox = ({ prospect }) => {
  const leadContext = useContext(LeadContext);
  const { user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const { updateUser } = useContext(UserContext);
  const {
    setClaim,
    setApproved,
    setUnclaim,
    updateLead,
    leadFields,
  } = leadContext;
  const {
    _id,
    isClaimed,
    isApproved,
    isPaid,
    isClosed,
    claimedBy,
    creditScore,
  } = prospect;

  return (
    <div>
      <div className='card leadStatus '>
        <p>Lead Claimed By: {claimedBy} </p>
        <p>Lead Status: {isClosed ? "Client" : "Lead"} </p>
        <p>Payment Status: {isPaid ? "current" : "needs collection"}</p>
        <p>Loan Status: {isApproved ? "Approved For Loan" : "Unapproved"}</p>
        <ul className='leadul'>
          <li>
            {" "}
            {isClaimed && user.name === claimedBy ? (
              <button
                className='btn-danger btn-sm btn'
                onClick={() => setUnclaim(user, prospect)}>
                Unclaim
              </button>
            ) : (
              <button
                className='btn-success btn-sm btn'
                onClick={
                  !isClaimed === true
                    ? () => setClaim(user, prospect)
                    : () => setAlert("Oh Hell Nah", 404)
                }>
                Claim
              </button>
            )}{" "}
          </li>
          <li>
            <button
              className='btn-light btn-sm btn'
              onClick={() => updateLead(leadFields, _id)}>
              Save
            </button>
          </li>
          {creditScore > 600 ? (
            <li>
              <button
                className='btn-success btn-sm btn'
                onClick={() => setApproved(prospect)}>
                Loan?
              </button>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};

export default StatusBox;
