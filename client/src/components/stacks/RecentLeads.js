import React, { useContext, useEffect, useCallback } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import RecentLeadItem from "./RecentLeadItem";

const RecentLeads = () => {
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);

  const { setRecent, recentLeads, deleteRecentLead, recentLead } = userContext;

  useEffect(() => {}, [setRecent, recentLeads, userContext]);

  const deleteLead = useCallback(() => {
    deleteRecentLead(recentLeads, recentLead);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {recentLeads === []
        ? "Recent Leads"
        : recentLeads.map((recentLead) => (
            <RecentLeadItem
              key={recentLead._id}
              recentLead={recentLead}
              deleteLead={deleteLead}
            />
          ))}
    </div>
  );
};

export default RecentLeads;
