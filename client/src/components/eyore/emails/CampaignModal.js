import React, { useContext, useState } from "react";
import EmailContext from "../../../context/email/emailContext";
import LeadContext from "../../../context/lead/leadContext";

const CampaignModal = (props) => {
  const emailContext = useContext(EmailContext);
  const leadContext = useContext(LeadContext);
  const { saveCampaign, email } = emailContext;
  const { mailList } = leadContext;

  const onClick = (e) => {
    saveCampaign(campaign);
  };

  const [campaign, setCampaign] = useState({
    title: email.title,
    campaignName: "",
    html: email.html,
    list: mailList,
    subject: email.subject,
    text: email.text,
    from: email.from,
    startDate: Date.now(),
  });

  const { campaignName } = campaign;
  console.log(campaign);

  const onChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='card container'>
        <button onClick={props.toggleVisibility}>X</button>

        <h3>Set this as a new campaign?</h3>
        <form action=''>
          <input
            type='text'
            name='campaignName'
            placeholder='Campaign Name'
            value={campaignName}
            onChange={onChange}
          />
          <button className='btn btn-block btn-primary' onClick={onClick}>
            Save Campaign
          </button>
        </form>
      </div>
    </>
  );
};

export default CampaignModal;
