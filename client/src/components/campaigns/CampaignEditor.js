import React, { useContext } from "react";
import EmailContext from "../../context/email/emailContext";
import LeadContext from "../../context/lead/leadContext";

const CampaignEditor = () => {
  const emailContext = useContext(EmailContext);
  const leadContext = useContext(LeadContext);
  const { putEmail, putList, email, campaign, deleteCampaign } = emailContext;
  const { dncArray } = leadContext;
  const { _id } = campaign;
  return (
    <div className='card'>
      <button
        className='btn btn-block btn-danger'
        onClick={() => putEmail(email, campaign)}>
        Update Campaign Email
      </button>
      <button
        className='btn btn-block btn-success'
        onClick={() => putList(dncArray, campaign)}>
        Remove DNCS From Campaign
      </button>
      <button
        className='btn btn-block btn-black'
        onClick={() => deleteCampaign(_id)}>
        Delete Campaign
      </button>
    </div>
  );
};

export default CampaignEditor;
