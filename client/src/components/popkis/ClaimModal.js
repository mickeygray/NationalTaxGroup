import React, { useContext, useState, useCallback, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import AuthContext from "../../context/auth/authContext";
import LeadContext from "../../context/lead/leadContext";
import UserModal from "./UserModal";
import { v4 as uuidv4 } from "uuid";

const ClaimModal = (props) => {
  const authContext = useContext(AuthContext);
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);

  const { pushWorker } = leadContext;
  const { user } = authContext;

  const { prospect } = props;
  const { role } = user;

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onClick = (e) => {};
  console.log(user);

  console.log(props);

  const [group, setGroup] = useState("");

  const onChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  console.log(group);
  return (
    <>
      <div className='card container'>
        <form onSubmit={onSubmit}>
          <button onClick={props.toggleClaimModal}>X</button>

          <h3>Select your Role </h3>
          <select name='caseWorkers' onChange={onChange}>
            <option></option>
            <option selected={group === "originators"} value='originators'>
              Originator
            </option>
            <option selected={group === "upsells"} value='upsells'>
              Upsell Agent
            </option>
            <option
              selected={group === "documentProcessors"}
              value='documentProcessors'>
              Document Preparation
            </option>
            <option
              selected={group === "loanProcessors"}
              value='loanProcessors'>
              Loan Preparation
            </option>
            <option selected={group === "taxPreparers"} value='taxPreparers'>
              Tax Preparation
            </option>
            <option selected={group === "federalReso"} value='federalReso'>
              Federal Resolution
            </option>
            <option selected={group === "stateReso"} value='stateReso'>
              State Resolution
            </option>
          </select>

          <button onClick={() => pushWorker(user, prospect, group)}>
            Add Me To The Case
          </button>
        </form>
      </div>
    </>
  );
};

export default ClaimModal;
