import React, { useContext } from "react";
import LeadContext from "../../context/lead/leadContext";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import UserContext from "../../context/user/userContext";

const StatusBox = ({ prospect }) => {
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
  const {
    _id,
    status,
    closerId,
    creditScore,
    quote,
    gross,
    initial,
    total,
  } = prospect;

  console.log(closerId);

  return (
    <div>
      <div>
        <p>Lead Claimed By: asdasd </p>
        <p>Lead Status: {status} </p>
      </div>
      <div className='card leadStatus grid-3'>
        <div>
          <h3>Resolution Status</h3>
          <div className='grid-2'>
            <div>
              <h5>Resolution Completed</h5>
              <ul>
                <li>
                  {" "}
                  <label htmlFor='filedFederal'>Filed Federal </label>
                  <input name='filedFederal' type='checkbox' />
                </li>
                <li>
                  <label htmlFor='filedState'>Filed State </label>
                  <input name='filedState' type='checkbox' />
                </li>
                <li>
                  {" "}
                  <label htmlFor='cnc'>Currently Non Collectible</label>
                  <input name='cnc' type='checkbox' />
                </li>
                <li>
                  <label htmlFor='ddia'>
                    Streamline / DDIA / State payment
                  </label>
                  <input name='ddia' type='checkbox' />
                </li>
                <li>
                  {" "}
                  <label htmlFor='oic'>Offer In Compromise</label>
                  <input name='oic' type='checkbox' />
                </li>
                <li>
                  <label htmlFor='filedFederal'>Corporate / Annuity</label>
                  <input name='corp' type='checkbox' />
                </li>
              </ul>
            </div>
            <div>
              <h5>Resolution Needed</h5>
              <ul>
                <li>
                  {" "}
                  <label htmlFor='filedFederal'>Filed Federal </label>
                  <input name='filedFederal' type='checkbox' />
                </li>
                <li>
                  <label htmlFor='filedState'>Filed State </label>
                  <input name='filedState' type='checkbox' />
                </li>
                <li>
                  {" "}
                  <label htmlFor='cnc'>Currently Non Collectible</label>
                  <input name='cnc' type='checkbox' />
                </li>
                <li>
                  <label htmlFor='ddia'>
                    Streamline / DDIA / State payment
                  </label>
                  <input name='ddia' type='checkbox' />
                </li>
                <li>
                  {" "}
                  <label htmlFor='oic'>Offer In Compromise</label>
                  <input name='oic' type='checkbox' />
                </li>
                <li>
                  <label htmlFor='filedFederal'>Corporate / Annuity</label>
                  <input name='corp' type='checkbox' />
                </li>
              </ul>
            </div>
          </div>
          <div className='grid-2'>
            <div>
              <button
                className='btn-light btn-block btn m-1 all-center'
                style={{ width: "200px" }}>
                Update Resolution
              </button>

              <button
                className='btn-dark btn-block btn m-1 all-center'
                style={{ width: "200px" }}
                onClick={() => updateLead(leadFields, _id)}>
                Enrich Lead
              </button>
            </div>
            <div>
              <button
                className='btn-dark btn-block btn m-1 all-center'
                style={{ width: "200px" }}
                onClick={() => updateLead(leadFields, _id)}>
                Save Lead
              </button>

              <button
                className='btn-dark btn-block btn m-1 all-center'
                style={{ width: "200px" }}
                onClick={() => updateLead(leadFields, _id)}>
                Claim Lead
              </button>
            </div>
          </div>
        </div>
        <div style={{ width: "250px" }}>
          <h3>Billing Status</h3>
          <select name='status' id='status'>
            <option value='prospect'>Prospect</option>
            <option value='client'>Client</option>
            <option value='upsellable'>Upsellable</option>
            <option value='highdollar'>Highdollar</option>
            <option value='noupsell'>No Upsell</option>
          </select>
          <label htmlFor='quote'>Quoted Fee</label>
          <input type='text' value={quote} name='quote' />
          <label htmlFor='quote'>Gross Fees</label>
          <input type='text' value={gross} name='gross' />
          <label htmlFor='quote'>Initial Payment</label>
          <input type='text' value={initial} name='initial' />
          <label htmlFor='quote'>Quoted Fee</label>
          <input type='text' value={total} name='total' />
        </div>
        <div className='card bg-light'>
          <h5>Assigned to The Client</h5>
          <ul>
            <li className='m-1'>Originator : Steve Dingles</li>
            <li className='m-1'>Loan Processor : Steve Dingles</li>
            <li className='m-1'>433-A Processor : Steve Dingles</li>
            <li className='m-1'>Upsell : Steve Dingles</li>
            <li className='m-1'>Primary Case Worker : Steve Dingles</li>
            <li className='m-1'>Secondary Case Worker : Steve Dingles</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatusBox;
