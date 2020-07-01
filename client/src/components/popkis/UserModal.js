import React from "react";
import Users from "./Users";

const UserModal = (props) => (
  <>
    <div className='bg-light container' />
    <div className='card' style={{ width: "400px", height: "100%" }}>
      <div className=''>
        <div className=''>
          <div className=''>
            <button onClick={props.toggleModal}>X</button>
            <Users {...props} />
          </div>
        </div>
      </div>
    </div>
  </>
);
export default UserModal;
