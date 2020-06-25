import React, { useContext } from "react";
import LeadContext from "../../context/lead/leadContext";
import AuthContext from "../../context/auth/authContext";

const NoteItem = ({ note: { noteText, id, notePostedBy, noteDate } }) => {
  const note = { noteText, id, notePostedBy, noteDate };
  const { setNote, deleteNote, prospect } = useContext(LeadContext);
  const { loginRefresh, token, myToken } = useContext(AuthContext);

  let dateDisplay = new Date(noteDate);
  let formattedNoteDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(dateDisplay);
  const refreshPage = () => {
    window.location.reload(false);
  };

  const onClick = (e) => {
    deleteNote(note, prospect);
    refreshPage(false);
    loginRefresh(localStorage, token);
  };

  return (
    <div className='card bg-white'>
      <span style={{ float: "left", height: ".8rem", fontSize: ".4rem" }}>
        <button onClick={onClick}>X</button>
      </span>
      <button
        className='btn btn-white btn-block'
        style={{ height: "6rem", fontSize: ".7rem" }}
        onClick={() => setNote(noteText, notePostedBy)}>
        <strong>
          {notePostedBy ? notePostedBy : ""}
          <br />
          {formattedNoteDate}
        </strong>
      </button>
    </div>
  );
};

export default NoteItem;
