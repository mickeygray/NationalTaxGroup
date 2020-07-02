import React, { useContext, useState, useCallback, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import AuthContext from "../../context/auth/authContext";
import LeadContext from "../../context/lead/leadContext";
import UserModal from "./UserModal";
import { v4 as uuidv4 } from "uuid";

const ClaimModal = (props) => {
  const userContext = useContext(UserContext);
  const leadContext = useContext(LeadContext);

  const { user } = userContext;

  const { role } = user;

  const onChange = (e) => {};
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onClick = (e) => {};

  return (
    <>
      <div className='card container'>
        <form onSubmit={onSubmit}>
          <button onClick={props.toggleVisibility}>X</button>

          <h3>Select your Role </h3>
          <select name='role' onChange={onChange}>
            <option selected={role === ""} value=''></option>
            <option selected={role === "stateReso"} value='stateReso'>
              State Resolution
            </option>
            <option selected={role === "fedReso"} value='fedReso'>
              Federal Resolution
            </option>
            <option selected={role === "taxPrep"} value='taxPrep'>
              Tax Preparation
            </option>
            <option selected={role === "corp"} value='taxPrep'>
              Corp / Annuity
            </option>
            <option selected={role === "docProcess"} value='docProcess'>
              Document Processor
            </option>
            <option selected={role === "loanProcess"} value='loanProcess'>
              Loan Processor
            </option>
            <option selected={role === "originator"} value='originator'>
              Originator
            </option>
            <option selected={role === "upsell"} value='upsell'>
              Upsell Agent
            </option>
          </select>

          <button>Add Me To The Case</button>
        </form>
      </div>
    </>
  );
};

export default ClaimModal;
