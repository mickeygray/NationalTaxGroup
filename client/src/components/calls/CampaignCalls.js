import React from "react";
import CampaignCallItem from "./CampaignCallItem";
const CampaignCalls = (props) => {
  console.log(props);
  return (
    <div>
      <h3>Campaign Calls</h3>
      {props.campaignCallState.map((call) => (
        <CampaignCallItem key={call.id} call={call} />
      ))}
    </div>
  );
};

export default CampaignCalls;
