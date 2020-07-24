import React, { useState, useEffect, useCallback, useContext } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import AuthContext from "../../context/auth/authContext";
import ResoTasks from "./ResoTasks";
import UserModal from "./UserModal";

const ResoModal = (props) => {
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);
  const {
    putPaymentScheduleItem,
    prospect,
    getResoStatus,
    setDoc,
  } = leadContext;
  const { user } = useContext(AuthContext);
  const {
    getUserReminded,
    putResoStatus,
    assignUser,
    users,
    setUser,
    assigned,
  } = userContext;

  console.log(props);
  const { resoStatus, reso } = props;

  return (
    <>
      <div className='card container'>
        <button onClick={props.toggleResoModal}>X</button>

        <ResoTasks prospect={prospect} reso={reso} />
      </div>
    </>
  );
};
export default ResoModal;
