import React, { Fragment, useContext } from "react";
import DirectMailCreator from "./DirectMailCreator";
import DirectMailItem from "./DirectMailItem";
import DMViewer from "./DMViewer";
import MailContext from "../../context/mail/mailContext";

const DirectMailLibrary = (props) => {
  console.log(props);

  const mailContext = useContext(MailContext);

  const { letter } = mailContext;
  const { mailLibrary } = props;
  return (
    <Fragment>
      <div className='grid-2c'>
        <div>{letter === null ? <DirectMailCreator /> : <DMViewer />}</div>
        <div className='sidebar'>
          {mailLibrary &&
            mailLibrary.map((mailItem) => (
              <DirectMailItem key={mailItem._id} mailItem={mailItem} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default DirectMailLibrary;
