import React, { useContext } from "react";
import LeadContext from "../../context/lead/leadContext";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import UserContext from "../../context/user/userContext";

const StatusBox = ({ prospect, client }) => {
  const leadContext = useContext(LeadContext);
  const { user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const { updateUser, getUserName } = useContext(UserContext);
  const {
    setClaim,
    setApproved,
    setUnclaim,
    updateLead,
    leadFields,
  } = leadContext;
  const { _id, status, closerId, creditScore, quote } = prospect;
  const { gross, initial, total } = client;

  const closer = getUserName(closerId).toString();

  const userName = getUserName(user);

  const onChange = (e) => {};
  return (
    <div>
      <div className='card leadStatus grid-2'>
        <div>
          <p>Lead Claimed By: {closer} </p>
          <p>Lead Status: {status} </p>
          <select name='status' id='status'>
            <option value=''>Prospect</option>
            <option value=''>Client</option>
            <option value=''>Upsellable</option>
            <option value=''>Highdollar</option>
            <option value=''>No Upsell</option>
          </select>
        </div>
        <div>
          <label htmlFor='quote'>Quoted Fee</label>
          <input type='text' value={quote} name='quote' onChange={onChange} />
          <label htmlFor='quote'>Gross Fees</label>
          <input type='text' value={gross} name='gross' onChange={onChange} />
          <label htmlFor='quote'>Initial Payment</label>
          <input
            type='text'
            value={initial}
            name='initial'
            onChange={onChange}
          />
          <label htmlFor='quote'>Quoted Fee</label>
          <input type='text' value={total} name='total' onChange={onChange} />
        </div>
        <ul className='grid-4'>
          <li>
            {" "}
            {userName === closer ? (
              <button
                className='btn-danger btn-sm btn'
                onClick={() => setUnclaim(user, prospect)}>
                Unclaim
              </button>
            ) : (
              <button
                className='btn-success btn-sm btn'
                onClick={
                  !closerId
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
