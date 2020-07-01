import React, { useContext } from "react";
import UserContext from "../../context/user/userContext";

const UserItem = ({ user }) => {
  const userContext = useContext(UserContext);

  const { setUser } = userContext;

  const { name } = user;

  return (
    <div>
      <button onClick={() => setUser(user)}>{name}</button>
    </div>
  );
};

export default UserItem;
