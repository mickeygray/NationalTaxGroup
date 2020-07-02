import React from "react";
import CampaignCalls from "../../calls/CampaignCalls";

const CampaignCallModal = (props) => (
  <>
    <div className='card container'>
      <button onClick={props.toggleVisibility}>X</button>
      <CampaignCalls {...props} />
    </div>
  </>
);

export default CampaignCallModal;
