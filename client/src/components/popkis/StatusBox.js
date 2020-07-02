import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import LeadContext from "../../context/lead/leadContext";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import UserContext from "../../context/user/userContext";
import ClaimModal from "./ClaimModal";
import CaseWorkers from "./CaseWorkers";

const StatusBox = ({ prospect }) => {
  const leadContext = useContext(LeadContext);
  const { user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const { notifyUser, getUserNames } = useContext(UserContext);
  const {
    getResoStatus,
    putResoStatus,
    getPaymentStatus,
    putPaymentStatus,
    addLexis,
    updateProspect,
    updateProspectStatus,
    claimProspect,
  } = leadContext;
  const {
    _id,
    status,
    createdBy,
    caseworkers,
    resoStatus,
    paymentStatus,
  } = prospect;
  /*
  useEffect(() => {
    getResoStatus(), getPaymentStatus(), getUserNames();
  }, []);

  */
  const [reso, setReso] = useState({
    federalFile: "",
    stateFile: "",
    hardship: "",
    payment: "",
    offer: "",
    corp: "",
  });

  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => {
    setModal((prevState) => !prevState);
  }, []);

  const onChange = (e) => {};

  const { federalFile, stateFile, hardship, payment, offer, corp } = resoStatus;

  const { gross, initial, total, quote, loans } = paymentStatus;
  return (
    <div>
      <div>
        <p>Claimed By: {createdBy} </p>
        <p>Status: {status} </p>
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
                  <input
                    name='federalFile'
                    type='checkbox'
                    checked={federalFile === "filed"}
                    value={federalFile}
                    onChange={onChange}
                  />
                </li>
                <li>
                  <label htmlFor='filedState'>Filed State </label>
                  <input
                    name='stateFile'
                    type='checkbox'
                    checked={stateFile === "filed"}
                    value={stateFile}
                    onChange={onChange}
                  />
                </li>
                <li>
                  {" "}
                  <label htmlFor='cnc'>Currently Non Collectible</label>
                  <input
                    name='hardship'
                    type='checkbox'
                    checked={hardship === "hardship"}
                    value={hardship}
                    onChange={onChange}
                  />
                </li>
                <li>
                  <label htmlFor='ddia'>
                    Streamline / DDIA / State payment
                  </label>
                  <input
                    name='payment'
                    type='checkbox'
                    checked={payment === "paymentplan"}
                    value={payment}
                    onChange={onChange}
                  />
                </li>
                <li>
                  {" "}
                  <label htmlFor='oic'>Offer In Compromise</label>
                  <input
                    name='offer'
                    type='checkbox'
                    checked={offer === "oic"}
                    value={offer}
                    onChange={onChange}
                  />
                </li>
                <li>
                  <label htmlFor='filedFederal'>Corporate / Annuity</label>
                  <input
                    name='corp'
                    type='checkbox'
                    checked={corp === "corp"}
                    value={corp}
                    onChange={onChange}
                  />
                </li>
              </ul>
            </div>
            <div>
              <h5>Resolution Needed</h5>
              <ul>
                <li>
                  {" "}
                  <label htmlFor='filedFederal'>Filed Federal </label>
                  <input
                    name='federalFile'
                    type='checkbox'
                    checked={federalFile === "unfiled"}
                    value={federalFile}
                    onChange={onChange}
                  />
                </li>
                <li>
                  <label htmlFor='filedState'>Filed State </label>
                  <input
                    name='stateFile'
                    type='checkbox'
                    checked={stateFile === "unfiled"}
                    value={stateFile}
                    onChange={onChange}
                  />
                </li>
                <li>
                  {" "}
                  <label htmlFor='cnc'>Currently Non Collectible</label>
                  <input
                    name='hardship'
                    type='checkbox'
                    checked={hardship === "nohardship"}
                    value={hardship}
                    onChange={onChange}
                  />
                </li>
                <li>
                  <label htmlFor='ddia'>Streamline / DDIA / State</label>
                  <input
                    name='payment'
                    type='checkbox'
                    checked={payment === "nopaymentplan"}
                    value={payment}
                    onChange={onChange}
                  />
                </li>
                <li>
                  {" "}
                  <label htmlFor='oic'>Offer In Compromise</label>
                  <input
                    name='offer'
                    type='checkbox'
                    checked={offer === "noic"}
                    value={offer}
                    onChange={onChange}
                  />
                </li>
                <li>
                  <label htmlFor='filedFederal'>Corporate / Annuity</label>
                  <input
                    name='corp'
                    type='checkbox'
                    checked={corp === "filed"}
                    value={corp}
                    onChange={onChange}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className='grid-2'>
            <div>
              <button
                className='btn-light btn-block btn m-1 all-center'
                style={{ width: "200px" }}
                onClick={() => putResoStatus(resoStatus)}>
                Update Resolution
              </button>

              <button
                className='btn-dark btn-block btn m-1 all-center'
                style={{ width: "200px" }}
                onClick={() => addLexis(prospect)}>
                Enrich Lead
              </button>
            </div>
            <div>
              <button
                className='btn-dark btn-block btn m-1 all-center'
                style={{ width: "200px" }}
                onClick={() => updateProspect()}>
                Save Lead
              </button>

              <button
                className='btn-dark btn-block btn m-1 all-center'
                style={{ width: "200px" }}
                onClick={() => claimProspect()}>
                Claim Lead
              </button>
            </div>
          </div>
        </div>

        <div style={{ width: "250px" }}>
          {modal ? (
            <ClaimModal {...caseworkers} toggleModal={toggleModal} />
          ) : (
            <Fragment>
              <h3>Billing Status</h3>
              <select
                name='status'
                id='status'
                onChange={() => updateProspectStatus()}>
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
              <label htmlFor='quote'>Total Payment</label>
              <input type='text' value={total} name='total' />
              <label htmlFor='quote'>Loan Information</label>
              <input type='text' value={loans} name='total' />
              <button onClick={() => putPaymentStatus()}></button>
            </Fragment>
          )}
        </div>
        <div className='card bg-light'>
          <h5>Assigned to The Client</h5>

          <CaseWorkers />
        </div>
      </div>
    </div>
  );
};

export default StatusBox;
