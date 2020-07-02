import React, { useContext, useState, useEffect, useCallback } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";

const CaseWorkerItem = ({ user }) => {
  const userContext = useContext(UserContext);
  const leadContext = useContext(LeadContext);

  const { emailUser, getUser } = userContext;
  const { prospect } = leadContext;

  const { caseWorkers } = prospect;
  const {
    originator,
    loanProcessors,
    documentProcessors,
    upsells,
    primaryReso,
    secondaryReso,
  } = caseWorkers;

  const { name, roll } = user;

  return (
    <div>
      {name},{roll},
    </div>
  );
};

export default CaseWorkerItem;
