import React, { useContext, Fragment } from "react";
import EmailContext from "../../context/email/emailContext";
import LeadContext from "../../context/lead/leadContext";

const CampaignEditor = () => {
  const emailContext = useContext(EmailContext);
  const leadContext = useContext(LeadContext);
  const { putEmail, putList, email, campaign, deleteCampaign } = emailContext;
  const { dncArray } = leadContext;
  const { _id } = campaign;
  return (
    <Fragment>
      <div className='card'>
        <h3>Edit Existing Campaign</h3>
        <div className='grid-3'>
          <button
            className='btn btn-block btn-danger'
            onClick={() => putEmail(email, campaign)}>
            Update Email
          </button>
          <button
            className='btn btn-block btn-success'
            onClick={() => putList(dncArray, campaign)}>
            Remove DNCS
          </button>
          <button
            className='btn btn-block btn-black'
            onClick={() => deleteCampaign(_id)}>
            Delete Campaign
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CampaignEditor;
