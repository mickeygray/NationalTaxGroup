import React from "react";
import UserItem from "./UserItem";

const Users = ({ users }) => {
  console.log(users);
  return (
    <div>
      {users
        ? users.map((user) => <UserItem key={user._id} user={user} />)
        : ""}
    </div>
  );
};

export default Users;
