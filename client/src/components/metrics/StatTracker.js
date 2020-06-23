import React, { useContext } from "react";
import EmailContext from "../../context/email/emailContext";
import CallContext from "../../context/call/callContext";
import LeadContext from "../../context/lead/leadContext";

const StatTracker = () => {
  const emailContext = useContext(EmailContext);
  const callContext = useContext(CallContext);
  const leadContext = useContext(LeadContext);

  const { campaign, campaigns } = emailContext;
  const { getCampaignCalls } = callContext;
  const { mailList } = leadContext;

  return <div></div>;
};

export default StatTracker;
