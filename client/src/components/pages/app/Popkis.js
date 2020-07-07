import React, { useEffect, useContext, Fragment } from "react";
import LeadCalls from "../../calls/LeadCalls";
import Notes from "../../popkis/Notes";
import NotePad from "../../popkis/NotePad";
import StatusBox from "../../popkis/StatusBox";
import Navbar from "../../layout/Navbar";
import PopkisForm from "../../popkis/PopkisForm";

import leadContext from "../../../context/lead/leadContext";

const Popkis = ({ match }) => {
  const { setProspect, getProspect, prospect, notes, setNotes } = useContext(
    leadContext
  );

  useEffect(() => {
    getProspect(match.params.id);
  }, []);

  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>

      <div>
        <StatusBox prospect={prospect} />

        <div className='grid-6'>
          <div className='grid-popkis'>
            <div>
              <Notes prospect={prospect} />
              <hr />
              <NotePad prospect={prospect} />
            </div>
            <div>
              <PopkisForm prospect={prospect} />
            </div>
            <div>
              <LeadCalls prospect={prospect} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Popkis;
