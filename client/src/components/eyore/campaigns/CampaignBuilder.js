import React, {
  useState,
  useContext,
  useEffect,
  Fragment,
  useCallback,
} from "react";
import LeadContext from "../../../context/lead/leadContext";
import EmailContext from "../../../context/email/emailContext";
import CampaignModal from "../emails/CampaignModal";

const CampaignBuilder = () => {
  const leadContext = useContext(LeadContext);

  const emailContext = useContext(EmailContext);

  const { sendEmail, email } = emailContext;

  const { mailList } = leadContext;

  useEffect(() => {
    if (mailList != null) {
      setList(mailList);
    }
  }, [mailList]);

  const [letter, setLetter] = useState({
    title: "",
    html: "",
    text: "",
    subject: "",
    from: "",
    trackingNumber: "",
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
  const campaign = { letter, list };

  const clearAll = () => {
    setList([]);
    setLetter({
      title: "",
      html: "",
      text: "",
      subject: "",
      from: "",
      trackingNumber: "",
    });
  };
  console.log(campaign);

  return (
    <Fragment>
      {showModal && (
        <CampaignModal {...campaign} toggleVisibility={toggleVisibility} />
      )}
      <div className='card'>
        <h3>Send an Email</h3>
        <div className=' grid-3'>
          <button
            className='btn btn-block btn-secondary'
            onClick={() => clearAll()}>
            Clear Email
          </button>
          <button
            className='btn btn-block btn-danger'
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
