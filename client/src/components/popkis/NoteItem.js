import React, { useContext } from "react";
import LeadContext from "../../context/lead/leadContext";

import { v4 as uuidv4 } from "uuid";
const NoteItem = ({
  note: { text, id, postedBy, postedDate, updatedDate, updatedBy },
}) => {
  const note = { text, id, postedBy, postedDate, updatedDate, updatedBy };
  const { setCurrentNote, deleteNote, prospect, setNotes } = useContext(
    LeadContext
  );

  const { notes } = prospect;

  let dateDisplay1 = new Date(postedDate);
  let formattedPostedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(dateDisplay1);

  let dateDisplay2 = new Date(postedDate);
  let formattedUpdatedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(dateDisplay2);

  const onClick = (e) => {
    e.preventDefault();
    deleteNote(note, prospect);
    setNotes([]);
    setCurrentNote({
      text: "",
      postedBy: "",
      postedDate: Date.now(),
      updatedBy: "",
      updatedDate: Date.now(),
      id: uuidv4(),
    });
  };

  const currentNote = note;

  return (
    <div className='card bg-white'>
      <span style={{ float: "left", height: ".8rem", fontSize: ".4rem" }}>
        <button onClick={onClick}>X</button>
      </span>
      <button
        className='btn btn-white btn-block'
        style={{ height: "6rem", fontSize: ".7rem" }}
        onClick={() => setCurrentNote(currentNote)}>
        <strong>
          {updatedBy === postedBy
            ? `Posted By : ${postedBy}`
            : `Updated By : ${updatedBy}`}
          <br />
          {updatedDate === postedDate
            ? `Posted On: ${formattedPostedDate}`
            : `Last Updated: ${formattedUpdatedDate}`}
        </strong>
      </button>
    </div>
  );
};

export default NoteItem;
