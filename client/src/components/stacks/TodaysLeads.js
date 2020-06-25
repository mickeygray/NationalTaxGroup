import React, { useContext, useEffect, useState } from "react";
import LeadContext from "../../../context/lead/leadContext";
import TodaysLeadItem from "../stacks/TodaysLeadItem";

const TodaysLeads = () => {
  const leadContext = useContext(LeadContext);
  const { addLead, prospect, todaysLeads, getLead } = leadContext;
  const { isClaimed } = prospect;

  useEffect(() => {
    if (!todaysLeads) {
      localStorage.setItem("todaysLeads", todaysLeads);
    } else if (todaysLeads.length > 2) {
      const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
      };
      todaysLeads.filter(distinct);
    }
  }, []);

  useEffect(() => {
    todaysLeads.push(prospect);
  }, [addLead, prospect]);

  console.log(todaysLeads);

  return (
    <div style={leadStyle}>
      {todaysLeads.length > 0
        ? todaysLeads.map(
            (prospect) =>
              prospect.isClaimed === false && (
                <TodaysLeadItem key={prospect._id} prospect={prospect} />
              )
          )
        : ""}
    </div>
  );
};
const leadStyle = {
  display: "grid",
  gridTemplateRows: "repeat(10, 1fr)",
  gridGap: ".5rem",
};

export default TodaysLeads;
