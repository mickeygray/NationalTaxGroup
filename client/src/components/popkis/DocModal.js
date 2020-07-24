import React, { useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";
const DocModal = (props) => {
  const userContext = useContext(UserContext);
  const { getUserName, name } = userContext;

  const stingle = new Date(props.doc.postedDate);
  const format = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(stingle);
  console.log(props);
  useEffect(() => {
    getUserName(props.doc.assigned);
  }, []);
  return (
    <div className='card' style={{ width: "300px" }}>
      Currently Assigned: {name ? name.name : ""}
      <br />
      Posted Date: {format}
    </div>
  );
};

export default DocModal;
