import React from "react";
import EmailTemplate from "./EmailTemplate";

const EmailPreview = (props) => (
  <>
    <div className='card container'>
      <EmailTemplate {...props} />
    </div>
  </>
);

export default EmailPreview;
