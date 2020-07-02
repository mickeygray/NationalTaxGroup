import React from "react";
import CampaignCallModal from "./CampaignCallModal";
import LeadContext from "../../../context/lead/leadContext";
import CallContext from "../../../context/call/callContext";
import EmailContext from "../../../context/email/emailContext";
//import StatContext from '../../../context/stat/statContext'

const CampaignPreviewer = () => {
  const leadContext = useContext(LeadContext);
  const callContext = useContext(CallContext);
  const emailContext = useContext(EmailContext);
  // const statContext = useContext(StatContext)

  const { listLength, filterSelected } = leadContext;
  const { getCampaignCalls } = callContext;
  const { currentCampaign, currentEmail } = emailContext;
  // const { campaignStats } = statContext

  return (
    <div>
      campaignName ? Current List Length : 100000 // Filter Selected : Federal
      Prospect || Campaign Start Date: 7/5/2020 // Last Filter Date: 7/6/2020
      Email : Covid - 19 Tax Relief Phone Numer Assigned{" "}
      <button> 800-000-0000</button> Opens Generated Clicks Generated : 15 DNCs
      Generated : 20 Total Payments: 0 dollars
      <CampaignCallModal />
    </div>
  );
};

export default CampaignPreviewer;
