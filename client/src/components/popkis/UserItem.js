import React, { useContext } from "react";
import UserContext from "../../context/user/userContext";
import ReminderModal from "./ReminderModal";

const UserItem = ({ user }) => {
  const userContext = useContext(UserContext);

  const { setUser } = userContext;

  const reminded = user;

  return (
    <div>
      <button onClick={() => setUser(reminded)}>{user.name}</button>
    </div>
  );
};

export default UserItem;
