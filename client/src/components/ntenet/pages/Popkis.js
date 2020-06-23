import React, { useEffect, useContext } from "react";
import LeadCalls from "../calls/LeadCalls";
import Notes from "../popkis/Notes";
import NotePad from "../popkis/NotePad";
import StatusBox from "../popkis/StatusBox";
import PopkisForm from "../popkis/PopkisForm";

import leadContext from "../../../context/lead/leadContext";

const Popkis = ({ match }) => {
  const { getProspect, prospect } = useContext(leadContext);

  useEffect(() => {
    getProspect(match.params.id);
  }, []);

  console.log(prospect);

  return (
    <div>
      <h1 className='text-danger'>Popkis!</h1>
      <StatusBox prospect={prospect} />
      <div className='grid-6'>
        <div className='sidebar'>
          <LeadCalls prospect={prospect} />
        </div>
        <div className='container'>
          <PopkisForm prospect={prospect} />
        </div>
        <div className='sidebar' style={{ width: "30rem" }}>
          <div className='card'>
            <Notes prospect={prospect} />
            <hr />
            <NotePad prospect={prospect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popkis;
