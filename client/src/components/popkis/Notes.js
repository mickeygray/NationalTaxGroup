import React, { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import LeadContext from "../../context/lead/leadContext";

const Notes = ({ prospect }) => {
  const leadContext = useContext(LeadContext);

  console.log(prospect);
  return (
    <>
      {prospect.notes ? (
        <div style={noteStyle}>
          {prospect.notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
const noteStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: ".5rem",
};

export default Notes;
