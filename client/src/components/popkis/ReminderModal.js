import React, { useContext, useState, useCallback, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import AuthContext from "../../context/auth/authContext";
import LeadContext from "../../context/lead/leadContext";
import UserModal from "./UserModal";
import { v4 as uuidv4 } from "uuid";

const ReminderModal = (props) => {
  const userContext = useContext(UserContext);
  const leadContext = useContext(LeadContext);
  const { user } = useContext(AuthContext);
  const {
    postReminder,
    getUserReminded,
    users,
    setUser,
    reminded,
  } = userContext;

  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);

  const { text } = props;

  const [reminder, setReminder] = useState({
    text: text,
    _id: user._id,
    userReminded: {},
    reminderDate: Date.now(),
    reminderDueDate: "",
    status: "",
    daysTilDue: 0,
    clientId: props._id,
  });
  useEffect(() => {
    if (reminded != null) {
      setReminder({
        text: text,
        _id: user._id,
        userReminded: reminded,
        reminderDate: Date.now(),
        reminderDueDate: "",
        status: "",
        daysTilDue: 0,
        clientId: props._id,
        id: uuidv4(),
      });
    } else {
      setReminder({
        text: text,
        _id: user._id,
        userReminded: {},
        reminderDate: Date.now(),
        reminderDueDate: "",
        status: "",
        daysTilDue: 0,
        clientId: props._id,
      });
    }
  }, [reminded, text, userContext]);

  const onChange = (e) => {
    setReminder({ ...reminder, [e.target.name]: e.target.value });
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const { userReminded, reminderDate, reminderDueDate, status } = reminder;

  const toggleModal = useCallback(() => {
    setModal((prevState) => !prevState);
  }, []);
  const onClick = (e) => {
    getUserReminded(query);
    setModal(true);
  };

  console.log(reminder);

  return (
    <>
      <div className='card container'>
        <button onClick={props.toggleVisibility}>X</button>

        <h3>Who would you like to Remind </h3>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='query'
            placeholder='Search For A User'
            onChange={onChange}
          />
          {modal ? <UserModal toggleModal={toggleModal} users={users} /> : ""}
          <button className='btn btn-block btn-primary' onClick={onClick}>
            Assign User
          </button>
          <h3>Set Due Date</h3>
          <input
            type='date'
            name='reminderDueDate'
            placeholder='Set a due date'
            value={reminderDueDate}
            onChange={onChange}
          />
          <h3>Set Reminder Status</h3>

          <select name='status' onChange={onChange}>
            <option selected={status === ""} value=''></option>
            <option selected={status === "docs"} value='docs'>
              Document Request
            </option>
            <option selected={status === "schedule"} value='schedule'>
              Schedule Meeting / Call
            </option>
            <option selected={status === "reso"} value='reso'>
              Complete Reso Docs
            </option>
            <option selected={status === "upsell"} value='upsell'>
              Review For Upsell
            </option>
            <option selected={status === "problem"} value='problem'>
              Notify Management of Problem
            </option>
          </select>

          <button
            className='btn btn-block btn-primary'
            onClick={() => postReminder(reminder)}>
            Send Reminder
          </button>
        </form>
      </div>
    </>
  );
};

export default ReminderModal;