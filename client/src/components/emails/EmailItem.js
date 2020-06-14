import React, {
  useContext,
  useEffect,
  useState,
  Fragment,
  useCallback,
} from "react";
import EmailContext from "../../context/email/emailContext";
import Modal from "./Modal";

const EmailItem = ({ email }) => {
  const emailContext = useContext(EmailContext);
  const [showEmail, setEmailState] = useState(false);

  const toggleVisibility = useCallback(() => {
    setEmailState((prevState) => !prevState);
  }, []);

  const { setTemplate, deleteTemplate, editTemplate } = emailContext;

  const { title, subject, html, _id } = email;

  const onClick = (e) => {
    setTemplate(email);
  };

  return (
    <Fragment>
      <div className='card grid-2'>
        <div>
          <button onClick={onClick}>
            {title} : {subject}
          </button>
        </div>
        <div>
          <button onClick={toggleVisibility}> show email</button>

          {showEmail && (
            <Modal {...email} toggleVisibility={toggleVisibility} />
          )}
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
