import React from "react";
import WorkerItem from "./WorkerItem";

const Workers = (props) => {
  const { users } = props;
  console.log(props);
  return (
    <div>
      <ul>
        {users
          ? users
              .filter((user) => user.role === props.role)
              .map((filtered) => (
                <li>
                  <WorkerItem key={filtered._id} filtered={filtered} />
                </li>
              ))
          : ""}
      </ul>
    </div>
  );
};

export default Workers;
