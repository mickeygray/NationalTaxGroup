import React, { useContext, useEffect } from "react";
import ProspectItem from "./ProspectItem";
import LeadContext from "../../../context/lead/leadContext";

const Prospects = () => {
  const leadContext = useContext(LeadContext);

  const { getLeads, prospects } = leadContext;

  return (
    <div style={leadStyle}>
      {prospects !== []
        ? prospects.map((prospect) => (
            <ProspectItem key={prospect._id} prospect={prospect} />
          ))
        : ""}
    </div>
  );
};
const leadStyle = {
  display: "grid",
  gridTemplateRows: "repeat(10, 1fr)",
  gridGap: ".5rem",
};

export default Prospects;
