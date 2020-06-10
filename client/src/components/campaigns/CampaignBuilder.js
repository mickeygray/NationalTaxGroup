import React, { useState, useContext, useEffect, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";
import EmailContext from "../../context/email/emailContext";
import Campaigns from "./Campaigns";

const CampaignBuilder = () => {
  const leadContext = useContext(LeadContext);

  const emailContext = useContext(EmailContext);

  const { sendEmail, email, saveCampaign } = emailContext;

  const { splitLead, mailObject, mailList, addContacted } = leadContext;

  console.log(mailList);

  useEffect(() => {
    if (mailObject != null) {
      setList(mailObject);
    }
  });

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
    bcc: [],
    vars: [],
  });

  const onClick = (e) => {
    addContacted(mailList);
    saveCampaign(campaign);
    sendEmail(campaign);
  };

  const { title, html, text, subject, from, campaignName } = letter;

  const { bcc, vars } = list;

  const campaign = {
    title,
    html,
    text,
    subject,
    from,
    campaignName,
    bcc,
    vars,
  };

  return (
    <Fragment>
      <div className='grid-2'>
        <div className='card grid-3'>
          <button
            className='btn btn-block btn-danger'
            onClick={() => splitLead(mailList)}>
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
