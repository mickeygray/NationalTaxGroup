import React, { useContext, useEffect } from "react";
import LeadContext from "../../../context/lead/leadContext";
import UserContext from "../../../context/user/userContext";
import RecentLeadItem from "./RecentLeadItem";

const RecentLeads = () => {
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);

  const { setRecent, recentLeads } = userContext;

  useEffect(() => {}, [setRecent, recentLeads, userContext]);

  return (
    <div>
      {recentLeads !== []
        ? recentLeads.map((recentLead) => (
            <RecentLeadItem key={recentLead._id} recentLead={recentLead} />
          ))
        : "Recent Leads"}
    </div>
  );
};

export default RecentLeads;
