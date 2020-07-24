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
import BillingStatus from "./BillingStatus";
import StatusBar from "./StatusBar";

import ResoModal from "./ResoModal";
import { v4 as uuidv4 } from "uuid";

const StatusBox = (props) => {
  const leadContext = useContext(LeadContext);
  const { user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const { notifyUser, getUserNames } = useContext(UserContext);
  const {
    putResoStatus,

    addLexisProspect,
    updateProspect,
    getResoStatus,
    updateProspectStatus,
    claimProspect,
  } = leadContext;

  const { prospect, togglePdfState } = props;

  const { _id, status, caseWorkers, paymentStatus, originator } = prospect;

  const [reso, setReso] = useState({
    representation1: false,
    federalFile1: false,
    stateFile1: false,
    hardship1: false,
    paymentPlan1: false,
    offer1: false,
    corp1: false,
    annuity1: false,
  });

  const {
    representation1,
    federalFile1,
    stateFile1,
    hardship1,
    paymentPlan1,
    offer1,
    corp1,
    annuity1,
  } = reso;

  const onChange = (e) => {
    setReso({
      representation1,
      [e.target.name]: e.target.checked,
      federalFile1,
      [e.target.name]: e.target.checked,
      stateFile1,
      [e.target.name]: e.target.checked,
      hardship1,
      [e.target.name]: e.target.checked,
      paymentPlan1,
      [e.target.name]: e.target.checked,
      offer1,
      [e.target.name]: e.target.checked,
      corp1,
      [e.target.name]: e.target.checked,
      annuity1,
      [e.target.name]: e.target.checked,
    });
  };

  const [resoState, setResoState] = useState(false);

  const toggleResoModal = useCallback(() => {
    setResoState((prevState) => !prevState);
  });
  const [claimModal, setClaimModal] = useState(false);
  const toggleClaimModal = useCallback(() => {
    setClaimModal((prevState) => !prevState);
  }, []);

  const toggleVisibility = useCallback(() => {
    setModalState((prevState) => !prevState);
  }, []);

  const [showModal, setModalState] = useState(false);

  const [file, setFile] = useState("");

  const [dealModal, setDealModal] = useState(false);
  const toggleDealModal = useCallback(() => {
    setDealModal((prevState) => !prevState);
  }, []);

  const onUpload = (e) => {
    setFile(e.target.files[0]);
  };

  console.log(reso);

  return (
    <Fragment>
      {resoState ? (
        <ResoModal
          toggleResoModal={toggleResoModal}
          prospect={prospect}
          reso={reso}
        />
      ) : (
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
              <StatusBar
                paymentStatus={paymentStatus}
                resoStatus={prospect.resoStatus}
              />
              <div className='card leadStatus grid-3'>
                <div>
                  <div>
                    <ul>
                      <li>
                        {" "}
                        <label htmlFor='filedFederal'>Representation</label>
                        <input
                          name='representation1'
                          type='checkbox'
                          onChange={onChange}
                          checked={reso.representation1}
                          value={representation1}
                        />
                      </li>

                      <li>
                        {" "}
                        <label htmlFor='filedFederal'>
                          Federal Tax Returns
                        </label>
                        <input
                          name='federalFile1'
                          type='checkbox'
                          onChange={onChange}
                          checked={reso.federalFile1}
                          value={federalFile1}
                        />
                      </li>
                      <li>
                        <label htmlFor='filedState'>State Tax Returns</label>
                        <input
                          name='stateFile1'
                          type='checkbox'
                          onChange={onChange}
                          checked={reso.stateFile1}
                          value={stateFile1}
                        />
                      </li>
                      <li>
                        {" "}
                        <label htmlFor='cnc'>Currently Non Collectible</label>
                        <input
                          name='hardship1'
                          type='checkbox'
                          onChange={onChange}
                          checked={reso.hardship1}
                          value={hardship1}
                        />
                      </li>
                      <li>
                        <label htmlFor='ddia'>Streamline / DDIA / State</label>
                        <input
                          name='paymentPlan1'
                          type='checkbox'
                          onChange={onChange}
                          checked={reso.paymentPlan1}
                          value={paymentPlan1}
                        />
                      </li>
                      <li>
                        {" "}
                        <label htmlFor='oic'>Offer In Compromise</label>
                        <input
                          name='offer1'
                          type='checkbox'
                          onChange={onChange}
                          checked={reso.offer1}
                          value={offer1}
                        />
                      </li>
                      <li>
                        <label htmlFor='filedFederal'>Corporate</label>
                        <input
                          name='corp1'
                          type='checkbox'
                          onChange={onChange}
                          checked={reso.corp1}
                          value={corp1}
                        />
                      </li>

                      <li>
                        <label htmlFor='filedFederal'>Annuity</label>
                        <input
                          name='annuity1'
                          type='checkbox'
                          onChange={onChange}
                          checked={reso.annuity1}
                          value={annuity1}
                        />
                      </li>
                    </ul>
                  </div>

                  <div className='grid-2'>
                    {showModal && (
                      <LexisModal toggleVisibility={toggleVisibility} />
                    )}
                    <div className=''>
                      <input
                        type='file'
                        onChange={onUpload}
                        style={{ width: "200px" }}
                      />
                      <button
                        className='btn-dark btn-block btn m-1 all-center'
                        style={{ width: "200px" }}
                        onClick={() => addLexisProspect(file, prospect)}>
                        Enrich Prospect
                      </button>

                      <button
                        className='btn-dark btn-block btn m-1 all-center'
                        style={{ width: "200px" }}
                        onClick={() => setModalState(true)}>
                        Open Lexis
                      </button>
                    </div>
                    <div className=''>
                      <button
                        className='btn-dark btn-block btn m-1 all-center'
                        style={{ width: "200px" }}
                        onClick={() => setResoState(true)}>
                        View Resolution
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
                  <BillingStatus paymentStatus={paymentStatus} />
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
      )}
    </Fragment>
  );
};

export default StatusBox;
