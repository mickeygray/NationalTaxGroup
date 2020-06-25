import React from "react";

import parse from "html-react-parser";

const EmailTemplate = ({ html }) => {
  return <div>{parse(html)}</div>;
};

export default EmailTemplate;
