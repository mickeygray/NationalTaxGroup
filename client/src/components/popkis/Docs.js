import React, { useContext, useEffect, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";
import DocItem from "./DocItem";

const Docs = (props) => {
  const { prospect, resoStatus } = props;
  const leadContext = useContext(LeadContext);

  const { docs } = leadContext;

  console.log(docs);

  return (
    <div>
      <Fragment>
        <h3>Docs</h3>
        <div style={noteStyle}>
          {docs
            ? docs.map((doc) => (
                <DocItem
                  prospect={prospect}
                  resoStatus={resoStatus}
                  key={doc.id}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
    </div>
  );
};
const noteStyle = {
  display: "grid",
  gridTemplateRows: "repeat(5, 1fr)",
  gridGap: ".1rem",
};

export default Docs;
