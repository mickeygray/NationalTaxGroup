import React, { useContext, useEffect } from "react";
import MyLeadItem from "./MyLeadItem";
import UserContext from "../../context/user/userContext";
import AuthContext from "../../context/auth/authContext";

const MyLeads = (props) => {
  const userContext = useContext(UserContext);

  const authContext = useContext(AuthContext);

  const { getUser, getMyProspects, myProspects } = userContext;
  const { user } = authContext;

  useEffect(() => {
    if (user != null && myProspects === null) {
      getMyProspects(user);
    }
  }, [user, authContext, myProspects, userContext]);

  console.log(myProspects);
  return (
    <div style={leadStyle}>
      {myProspects
        ? myProspects.map((prospect) => (
            <MyLeadItem key={prospect._id} prospect={prospect} />
          ))
        : ""}
    </div>
  );
};
const leadStyle = {
  display: "grid",
  gridTemplateRows: "repeat(10, 1fr)",
  gridGap: ".1rem",
};

export default MyLeads;
