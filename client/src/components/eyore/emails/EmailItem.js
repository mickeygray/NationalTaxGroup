import React, {
  useContext,
  useEffect,
  useState,
  Fragment,
  useCallback,
} from "react";
import EmailContext from "../../../context/email/emailContext";
import Modal from "./Modal";

const EmailItem = ({ email }) => {
  const emailContext = useContext(EmailContext);
  const [showEmail, setEmailState] = useState(false);

  const toggleVisibility = useCallback(() => {
    setEmailState((prevState) => !prevState);
  }, []);

  const { setTemplate, deleteTemplate } = emailContext;

  const { title, subject, _id } = email;

  const onClick = (e) => {
    setTemplate(email);
  };

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

  const [modalStyle, setModalStyle] = useState({
    width: "30px",
    height: "10px",
  });

  return (
    <Fragment>
      <div className='card grid-2'>
        <div>
          <button onClick={onClick}>
            {title} : {subject}
          </button>
        </div>
        <div>
          <div style={modalStyle}>
            <button onClick={toggleVisibility}> show email</button>

            {showEmail && (
              <Modal {...email} toggleVisibility={toggleVisibility} />
            )}
          </div>
          <span style={{ float: "right" }}>
            {" "}
            <button onClick={() => deleteTemplate(_id)}>X</button>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default EmailItem;
