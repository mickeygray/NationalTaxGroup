import React from "react";
import Workers from "./Workers";

const UserModal = (props) => (
  <>
    <div className='bg-light container' />
    <div className='card' style={{ width: "400px", height: "100%" }}>
      <div className=''>
        <div className=''>
          <div className=''>
            <Workers {...props} />
          </div>
        </div>
      </div>
    </div>
  </>
);
export default UserModal;
