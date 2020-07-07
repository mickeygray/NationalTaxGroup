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
import LexisModal from "../shipem/LexisModal";
import DealModal from "./DealModal";
import { v4 as uuidv4 } from "uuid";

const StatusBox = (props) => {
  const leadContext = useContext(LeadContext);
  const { user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const { notifyUser, getUserNames } = useContext(UserContext);
  const {
    putResoStatus,
    getPaymentStatus,
    putPaymentStatus,
    addLexis,
    updateProspect,
    updateProspectStatus,
    claimProspect,
  } = leadContext;

  const { prospect } = props;

  const {
    _id,
    status,
    caseWorkers,
    resoStatus,
    paymentStatus,
    originator,
  } = prospect;
  useEffect(() => {
    if (resoStatus) {
      setReso(resoStatus);
    }
  }, [resoStatus]);

  console.log(prospect);

  const [money, setMoney] = useState({
    initial: 0,
    total: 0,
    gross: 0,
    loan: 0,
    lastPayment: 0,
    lastPaymentDate: Date.now(),
    initialPaymentDate: Date.now(),
    dealId: uuidv4(),
    upsellId: uuidv4(),
  });

  const [reso, setReso] = useState({
    federalFile: "",
    stateFile: "",
    hardship: "",
    paymentPlan: "",
    offer: "",
    corp: "",
  });

  const [claimModal, setClaimModal] = useState(false);
  const toggleClaimModal = useCallback(() => {
    setClaimModal((prevState) => !prevState);
  }, []);

  const toggleVisibility = useCallback(() => {
    setModalState((prevState) => !prevState);
  }, []);

  const [showModal, setModalState] = useState(false);

  const [dealModal, setDealModal] = useState(false);
  const toggleDealModal = useCallback(() => {
    setDealModal((prevState) => !prevState);
  }, []);
  const onChange = (e) => {
    setReso({ ...reso, [e.target.name]: e.target.value });
  };
  const { federalFile, stateFile, hardship, paymentPlan, offer, corp } = reso;

  console.log(reso);
  const { gross, initial, total, quote, loans } = money;
  return (
    <Fragment>
      {dealModal ? (
        <div>
          <DealModal
            paymentStatus={paymentStatus}
            toggleDealModal={toggleDealModal}
          />
        </div>
      ) : (
        <Fragment>
          <h3>Name : {prospect.fullName}</h3>

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
                        value='filed'
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <label htmlFor='filedState'>Filed State </label>
                      <input
                        name='stateFile'
                        type='checkbox'
                        checked={stateFile === "filed"}
                        value='filed'
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
                        value='hardship'
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <label htmlFor='ddia'>Streamline / DDIA / State</label>
                      <input
                        name='paymentPlan'
                        type='checkbox'
                        checked={paymentPlan === "paymentplan"}
                        value='paymentplan'
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
                        value='oic'
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <label htmlFor='filedFederal'>Corporate / Annuity</label>
                      <input
                        name='corp'
                        type='checkbox'
                        checked={corp === "corp"}
                        value='corp'
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
                        value='unfiled'
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <label htmlFor='filedState'>Filed State </label>
                      <input
                        name='stateFile'
                        type='checkbox'
                        checked={stateFile === "unfiled"}
                        value='unfiled'
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
                        value='nohardship'
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <label htmlFor='ddia'>Streamline / DDIA / State</label>
                      <input
                        name='paymentPlan'
                        type='checkbox'
                        checked={paymentPlan === "nopaymentplan"}
                        value='nopaymentplan'
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
                        value='noic'
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <label htmlFor='filedFederal'>Corporate / Annuity</label>
                      <input
                        name='corp'
                        type='checkbox'
                        checked={corp === "nocorp"}
                        value='nocorp'
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
                    onClick={() => putResoStatus(reso, prospect)}>
                    Update Resolution
                  </button>
                  {showModal && (
                    <LexisModal toggleVisibility={toggleVisibility} />
                  )}
                  <button
                    className='btn-dark btn-block btn m-1 all-center'
                    style={{ width: "200px" }}
                    onClick={() => setModalState(true)}>
                    Open Lexis
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
                    onClick={() => setClaimModal(true)}>
                    Claim Lead
                  </button>

                  <button
                    className='btn-dark btn-block btn m-1 all-center'
                    style={{ width: "200px" }}
                    onClick={() => setDealModal(true)}>
                    Open Deal Panel
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div style={{ width: "250px" }}>
                <h3>Billing Status</h3>
                <select
                  name='status'
                  id='status'
                  value={status}
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
              </div>
            </div>
            <div className='card bg-light'>
              {claimModal ? (
                <ClaimModal
                  prospect={prospect}
                  caseWorkers={caseWorkers}
                  toggleClaimModal={toggleClaimModal}
                />
              ) : (
                ""
              )}
              <CaseWorkers {...caseWorkers} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default StatusBox;
