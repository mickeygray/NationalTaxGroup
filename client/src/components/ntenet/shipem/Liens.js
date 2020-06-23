import React, { useContext, useEffect } from "react";
import LienItem from "./LienItem";
import LeadContext from "../../../context/lead/leadContext";

const Liens = () => {
  const leadContext = useContext(LeadContext);

  const { liens, searchLiens } = leadContext;

  useEffect(() => {}, [leadContext, searchLiens]);

  return (
    <div className='sidebar'>
      {liens.map((lien) => (
        <LienItem key={lien._id} lien={lien} />
      ))}
    </div>
  );
};

export default Liens;
