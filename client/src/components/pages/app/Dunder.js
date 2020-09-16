import React, {
  useContext,
  useEffect,
  Fragment,
  useCallback,
  useState,
} from "react";
import DirectMailLibrary from "../../dunder/DirectMailLibrary";
import DirectMailSchedule from "../../dunder/DirectMailSchedule";
import MailContext from "../../../context/mail/mailContext";
import Navbar from "../../layout/Navbar";
const Dunder = () => {
  const mailContext = useContext(MailContext);

  const {
    getDirectMailLibrary,
    getDirectMailSchedule,
    mailLibrary,
    mailSchedule,
    sendMail,
  } = mailContext;
  useEffect(() => {
    getDirectMailLibrary();
    getDirectMailSchedule();
  }, []);

  // <DirectMailSchedule mailSchedule={mailSchedule} />
  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>

      <div className='grid-2'>
        <div>
          <DirectMailLibrary mailLibrary={mailLibrary} />
        </div>

        <div>
          <button onClick={() => sendMail()}>SKEEWEEES</button>
          <DirectMailSchedule mailSchedule={mailSchedule} />
        </div>
      </div>
    </Fragment>
  );
};

export default Dunder;
