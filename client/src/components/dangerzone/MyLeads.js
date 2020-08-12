import React, { useContext, useEffect, useState } from "react";
import MyLeadItem from "./MyLeadItem";
import UserContext from "../../context/user/userContext";
import AuthContext from "../../context/auth/authContext";
import Pagination from "../stacks/Pagination";
const MyLeads = () => {
  const userContext = useContext(UserContext);

  const authContext = useContext(AuthContext);

  const { getUser, getMyProspects, myProspects } = userContext;
  const { user } = authContext;

  useEffect(() => {
    if (user != null && myProspects === null) {
      getMyProspects(user);
    }
  }, [user, authContext, myProspects, userContext]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  let currentPosts;
  if (myProspects != null) {
    currentPosts = myProspects.slice(indexOfFirstPost, indexOfLastPost);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onChange = (e) => {
    setPostsPerPage(e.target.value);
  };
  return (
    <div>
      {myProspects ? (
        <div>
          <div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={myProspects.length}
              paginate={paginate}
            />
          </div>
          <div style={leadStyle}>
            {currentPosts.map((prospect) => (
              <MyLeadItem key={prospect._id} prospect={prospect} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
const leadStyle = {
  display: "grid",
  gridTemplateRows: "repeat(5, 1fr)",
  gridGap: ".1rem",
};

export default MyLeads;
