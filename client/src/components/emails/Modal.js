import React from "react";

import EmailTemplate from "./EmailTemplate";

const Modal = (props) => (
  <>
    <div className='card container'>
      <button onClick={props.toggleVisibility}>X</button>
      <EmailTemplate {...props} />
    </div>
  </>
);

export default Modal;
