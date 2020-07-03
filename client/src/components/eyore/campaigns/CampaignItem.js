import React, {
  useContext,
  useEffect,
  useState,
  Fragment,
  useCallback,
} from "react";
import EmailContext from "../../../context/email/emailContext";
import StatContext from "../../../context/stat/statContext";
import Modal from "../emails/Modal";

const CampaignItem = ({ campaign }) => {
  const emailContext = useContext(EmailContext);
  const statContext = useContext(StatContext);
  const [showEmail, setEmailState] = useState(false);

  const toggleVisibility = useCallback(() => {
    setEmailState((prevState) => !prevState);
  }, []);

  const { getCurrentCampaign } = statContext;
  const { setCampaign, deleteCampaign } = emailContext;

  const { campaignName, _id } = campaign;

  useEffect(() => {
    if (showEmail === true) {
      setModalStyle({
        width: "600px",
        height: "800px",
      });
    } else if (showEmail === false) {
      setModalStyle({
        width: "30px",
        height: "10px",
      });
    }
  }, [showEmail]);

  const onClick = (e) => {
    setCampaign(campaign);
    getCurrentCampaign(campaign);
  };

  const [modalStyle, setModalStyle] = useState({
    width: "30px",
    height: "10px",
  });

  return (
    <Fragment>
      <div className='card grid-3'>
        <div>
          <button className='btn btn-sm btn-primary' onClick={onClick}>
            {campaignName}
          </button>
        </div>
        <div style={modalStyle}>
          <button
            className='btn btn-sm btn-secondary'
            onClick={toggleVisibility}>
            {" "}
            Show email
          </button>

          {showEmail && (
            <Modal {...campaign} toggleVisibility={toggleVisibility} />
          )}
        </div>
        <span style={{ float: "right" }}>
          {" "}
          <button onClick={() => deleteCampaign(_id)}>X</button>
        </span>
      </div>
    </Fragment>
  );
};

export default CampaignItem;
