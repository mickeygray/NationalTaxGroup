import React, { useState, useContext, useEffect, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";
import EmailContext from "../../context/email/emailContext";

const CampaignBuilder = () => {
  const leadContext = useContext(LeadContext);

  const emailContext = useContext(EmailContext);

  const { sendEmail, email, saveCampaign } = emailContext;

  const { setMailList, mailList, addContacted } = leadContext;

  console.log(mailList);
  const [letter, setLetter] = useState({
    title: "",
    html: "",
    text: "",
    subject: "",
    from: "",
    campaignName: "",
    clicks: 0,
    unsubscribes: 0,
    key: "",
    reactstring: "",
  });

  const [list, setList] = useState({
    list: [],
  });
  const onClick = (e) => {
    addContacted(mailList);
    saveCampaign(campaign);
    sendEmail(campaign);
  };

  const { title, html, text, subject, from, campaignName } = letter;

  const campaign = {
    title,
    html,
    text,
    subject,
    from,
    campaignName,
    list,
  };

  console.log(campaign);
  return (
    <Fragment>
      <div className='card'>
        <h3>Send an Email</h3>
        <div className=' grid-3'>
          <button
            className='btn btn-block btn-danger'
            onClick={() => setList(mailList)}>
            Prepare Mail List
          </button>
          <button
            className='btn btn-block btn-secondary'
            onClick={() => setLetter(email)}>
            Prepare Email
          </button>
          <button className='btn btn-block btn-success' onClick={onClick}>
            Send Email
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CampaignBuilder;
