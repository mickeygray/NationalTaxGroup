import React, { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import LeadContext from "../../context/lead/leadContext";
import CaseWorkerItem from "./CaseWorkerItem";

const CaseWorkers = (props) => {
  const {
    documentProcessors,
    loanProcessors,
    stateReso,
    federalReso,
    upsells,
    originators,
    taxPreparers,
  } = props;

  return (
    <div>
      <h2>Currently Assigned</h2>

      <h3> Originators </h3>
      <div style={noteStyle}>
        {originators
          ? originators.map((caseWorker) => (
              <CaseWorkerItem key={caseWorker._id} caseWorker={caseWorker} />
            ))
          : ""}
      </div>
      <h3> Upsells </h3>
      <div style={noteStyle}>
        {upsells
          ? upsells.map((caseWorker) => (
              <CaseWorkerItem key={caseWorker._id} caseWorker={caseWorker} />
            ))
          : ""}
      </div>
      <h3> Document Processor </h3>
      <div style={noteStyle}>
        {documentProcessors
          ? documentProcessors.map((caseWorker) => (
              <CaseWorkerItem key={caseWorker._id} caseWorker={caseWorker} />
            ))
          : ""}
      </div>
      <h3> Loan Processor </h3>
      <div style={noteStyle}>
        {loanProcessors
          ? loanProcessors.map((caseWorker) => (
              <CaseWorkerItem key={caseWorker._id} caseWorker={caseWorker} />
            ))
          : ""}
      </div>
      <h3> Federal Resolution </h3>
      <div style={noteStyle}>
        {federalReso
          ? federalReso.map((caseWorker) => (
              <CaseWorkerItem key={caseWorker._id} caseWorker={caseWorker} />
            ))
          : ""}
      </div>
      <h3> State Resolution </h3>
      <div style={noteStyle}>
        {stateReso
          ? stateReso.map((caseWorker) => (
              <CaseWorkerItem key={caseWorker._id} caseWorker={caseWorker} />
            ))
          : ""}
      </div>
      <h3> Tax Preparation </h3>
      <div style={noteStyle}>
        {taxPreparers
          ? taxPreparers.map((caseWorker) => (
              <CaseWorkerItem key={caseWorker._id} caseWorker={caseWorker} />
            ))
          : ""}
      </div>
    </div>
  );
};
const noteStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: ".2rem",
};

export default CaseWorkers;
