import React, {
  useContext,
  useEffect,
  useState,
  Fragment,
  useCallback,
} from "react";
import EmailContext from "../../context/email/emailContext";
import Modal from "../emails/Modal";

const CampaignItem = ({ campaign }) => {
  const emailContext = useContext(EmailContext);

  const [showEmail, setEmailState] = useState(false);

  const toggleVisibility = useCallback(() => {
    setEmailState((prevState) => !prevState);
  }, []);

  const { setCampaign } = emailContext;

  const { title, html } = campaign;

  const onClick = (e) => {
    setCampaign(campaign);
  };

  return (
    <Fragment>
      <div className='card grid-2'>
        <div>
          <button onClick={onClick}>{title}</button>
        </div>
        <div>
          <button onClick={toggleVisibility}> show email</button>

          {showEmail && (
            <Modal {...campaign} toggleVisibility={toggleVisibility} />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CampaignItem;
