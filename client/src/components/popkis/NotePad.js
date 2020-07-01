import React, { useContext, useEffect, useState, useCallback } from "react";
import LeadContext from "../../context/lead/leadContext";
import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/user/userContext";
import { v4 as uuidv4 } from "uuid";
import ReminderModal from "./ReminderModal";
const NotePad = ({ prospect }) => {
  const leadContext = useContext(LeadContext);
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const { putNote, postNote, currentNote, setCurrentNote, notes } = leadContext;

  useEffect(() => {
    if (currentNote != null) {
      setNote(currentNote);
    } else
      setNote({
        text: "",
        postedBy: user.name,
        postedDate: Date.now(),
        updatedBy: user.name,
        updatedDate: Date.now(),
        id: uuidv4(),
      });
  }, [currentNote, leadContext]);
  const { user } = authContext;
  const { updateUser } = userContext;

  const [note, setNote] = useState({
    text: "",
    postedBy: user.name,
    postedDate: Date.now(),
    updatedBy: Date.now(),
    updatedDate: user.name,
    id: uuidv4(),
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onClear = (e) => {
    setNote({
      text: "",
      postedBy: user.name,
      postedDate: Date.now(),
      updatedBy: Date.now(),
      updatedDate: user.name,
      id: uuidv4(),
    });
    setCurrentNote(null);
  };

  const { text } = note;

  const toggleVisibility = useCallback(() => {
    setModalState((prevState) => !prevState);
  }, []);

  const [showModal, setModalState] = useState(false);

  const sendReminder = () => {
    updateUser(note, prospect, user);
    setModalState(false);
  };
  return (
    <div>
      {showModal && (
        <ReminderModal
          text={text}
          {...prospect}
          toggleVisibility={toggleVisibility}
        />
      )}
      <form className='center' onSubmit={onSubmit}>
        <textarea
          className='center'
          style={{ width: "18rem", height: "30rem" }}
          name='text'
          value={text}
          placeholder='Notes and Reminders'
          onChange={onChange}
        />
        <div className='grid-3'>
          {currentNote != null ? (
            <button
              className='btn-danger btn-sm btn'
              onClick={() => putNote(note, user, prospect)}>
              Update Note
            </button>
          ) : (
            <button
              className='btn-danger btn-sm btn'
              onClick={() => postNote(note, prospect)}>
              Post Note
            </button>
          )}
          <button className='btn-light btn-sm btn' onClick={onClear}>
            Clear
          </button>

          <button
            className='btn-danger btn-sm btn'
            onClick={() => setModalState(true)}>
            Send Reminder
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotePad;
