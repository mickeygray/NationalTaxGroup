import React, { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import LeadContext from "../../context/lead/leadContext";
import CaseWorkerItem from "./CaseWorkerItem";

const Notes = ({ prospect }) => {
  const leadContext = useContext(LeadContext);

  const { getNotes, getProspect, setNotes, notes } = leadContext;

  useEffect(() => {
    getNotes(prospect);
  }, []);

  const onClick = (e) => {
    getProspect(prospect._id);
  };

  return (
    <>
      <h3>Notes And Reminders</h3>
      <div style={noteStyle}>
        {prospect.caseworkers
          ? prospect.caseworkers.map((user) => (
              <CaseWorkerItem key={user._id} user={user} />
            ))
          : ""}
      </div>
      <div>
        <button onClick={onClick}>Refresh Notes</button>
      </div>
    </>
  );
};
const noteStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: ".2rem",
};

export default Notes;
