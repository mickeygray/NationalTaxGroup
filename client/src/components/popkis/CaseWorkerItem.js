import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import EmailContext from "../../context/email/emailContext";
import AuthContext from "../../context/auth/authContext";
import EmailModal from "./EmailModal";

const CaseWorkerItem = ({ caseWorker }) => {
  const userContext = useContext(UserContext);
  const leadContext = useContext(LeadContext);
  const emailContext = useContext(EmailContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const { emailUser } = emailContext;
  const { prospect, deleteWorker } = leadContext;

  const { caseWorkers } = prospect;
  const {
    originator,
    loanProcessors,
    documentProcessors,
    upsells,
    primaryReso,
    secondaryReso,
  } = caseWorkers;

  console.log(user);
  const { name } = caseWorker;

  const [emailModal, setEmailModal] = useState(false);
  const toggleEmailModal = useCallback(() => {
    setEmailModal((prevState) => !prevState);
  }, []);
  return (
    <Fragment>
      {emailModal ? (
        <EmailModal
          toggleEmailModal={toggleEmailModal}
          caseWorker={caseWorker}
          prospect={prospect}
          user={user}
        />
      ) : (
        <div
          className='btn btn-dark btn-sm'
          style={{
            backgroundColor: "black",
            marginLeft: "5px",
            width: "150px",
            height: "35px",
          }}>
          <button
            className='bg-dark'
            style={{
              overflow: "hidden",
            }}
            onClick={() => setEmailModal(true)}>
            {" "}
            {name}
          </button>
          <button
            style={{
              float: "right",
            }}
            onClick={() => deleteWorker(caseWorker, prospect)}>
            {" "}
            X
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default CaseWorkerItem;
