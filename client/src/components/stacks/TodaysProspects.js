import React, { useContext, useEffect } from "react";
import TodaysProspectItem from "./TodaysProspectItem";
import StatContext from "../../context/stat/statContext";

const TodaysProspects = () => {
  const statContext = useContext(StatContext);
  const { today, getTodaysProspects } = statContext;

  const { todaysProspects } = today;

  useEffect(() => {
    getTodaysProspects();
  }, []);

  console.log(today);

  return (
    <div style={leadStyle}>
      {todaysProspects
        ? todaysProspects.map((prospect) => (
            <TodaysProspectItem key={prospect._id} propsect={prospect} />
          ))
        : ""}
    </div>
  );
};
const leadStyle = {
  height: "75px",
  display: "grid",
  gridTemplateRows: "repeat(10, 1fr)",
  gridGap: ".1rem",
};

export default TodaysProspects;
