import React, {
  useState,
  useContext,
  useEffect,
  Fragment,
  useCallback,
} from "react";
import LeadContext from "../../context/lead/leadContext";
import EmailContext from "../../context/email/emailContext";
import CampaignModal from "../emails/CampaignModal";

const CampaignBuilder = () => {
  const leadContext = useContext(LeadContext);

  const emailContext = useContext(EmailContext);

  const { sendEmail, email, saveCampaign } = emailContext;

  const { mailList } = leadContext;

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

  const toggleVisibility = useCallback(() => {
    setModalState((prevState) => !prevState);
  }, []);

  const [showModal, setModalState] = useState(false);

  const onClick = (e) => {
    sendEmail(campaign);
    setModalState(true);
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

  return (
    <Fragment>
      {showModal && (
        <CampaignModal {...campaign} toggleVisibility={toggleVisibility} />
      )}
      <div className='card'>
        <h3>Send an Email</h3>
        <div className=' grid-3'>
          <button
            className='btn btn-block btn-danger'
            onClick={() => setList(mailList)}>
            Prepare List
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
