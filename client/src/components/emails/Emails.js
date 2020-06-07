import React, { useState, useEffect, useContext } from "react";
import EmailLibrary from "./EmailLibrary";
import EmailCreator from "./EmailCreator";
import EmailContext from "../../context/email/emailContext";

const Emails = () => {
  const emailContext = useContext(EmailContext);

  return (
    <div className='grid-2'>
      <EmailCreator />
    </div>
  );
};

export default Emails;
