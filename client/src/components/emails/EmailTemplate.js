import React from "react";

import parse from "html-react-parser";
import EmailContext from "../../context/email/emailContext";
const EmailTemplate = ({ html }) => {
  return <div>{parse(html)}</div>;
};

export default EmailTemplate;
