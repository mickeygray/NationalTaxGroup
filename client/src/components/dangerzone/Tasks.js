import React, { useContext, useEffect } from "react";
import TaskItem from "./TaskItem";
import UserContext from "../../context/user/userContext";
import LeadContext from "../../context/lead/leadContext";
import AuthContext from "../../context/auth/authContext";

const Tasks = () => {
  const userContext = useContext(UserContext);
  const leadContext = useContext(LeadContext);
  const authContext = useContext(AuthContext);
  const { lead, getLeadName } = leadContext;
  const { getUser, getUserName } = userContext;
  const { user } = authContext;

  useEffect(() => {
    if (user != null) {
      getUser(user._id);
    }
  }, []);

  return (
    <>
      <div style={leadStyle}>
        <div
          className='bg-white'
          style={{ overflowY: "scroll", height: "100vh" }}>
          <h2 className='text-danger all-center'> My Tasks</h2>

          {user
            ? user.tasks.map((task) => <TaskItem key={task.id} task={task} />)
            : ""}
        </div>
      </div>
    </>
  );
};
const leadStyle = {
  display: "grid",
  gridTemplateRows: "repeat(10, 1fr)",
};

export default Tasks;
