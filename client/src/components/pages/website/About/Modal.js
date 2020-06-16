import React from "react";
import BlogContent from "./BlogContent";

const Modal = (props) => (
  <>
    <div className='bg-light container' />
    <div className='card' style={{ width: "400px", height: "100%" }}>
      <div className=''>
        <div className=''>
          <div className=''>
            <button onClick={props.toggleVisibility}>X</button>
            <BlogContent {...props} />
          </div>
        </div>
      </div>
    </div>
  </>
);
export default Modal;
