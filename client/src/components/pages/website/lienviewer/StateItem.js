import React from "react";

const StateItem = ({ state: { state, agency, phone, website, flag } }) => {
  return (
    <div className='card btext-center'>
      <img src={flag} alt='' className='round-img' style={{ width: "60px" }} />

      <h3>{state}</h3>
      <p>{phone}</p>

      <div>
        <a href={website} className='btn btn-dark btn-sm my-1'>
          {agency}
        </a>
      </div>
    </div>
  );
};

export default StateItem;
