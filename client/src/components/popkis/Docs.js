import React, { useContext, useEffect, Fragment } from "react";
import NoteItem from "./NoteItem";
import LeadContext from "../../context/lead/leadContext";
import DocItem from "./DocItem";

const Docs = (props) => {
  const { prospect, resoStatus } = props;
  const leadContext = useContext(LeadContext);

  const { setDoc } = leadContext;
  const {
    representation,
    federalFile,
    stateFile,
    paymentPlan,
    appeal,
    annuity,
    corp,
    offer,
    hardship,
  } = resoStatus;
  return (
    <div>
      <Fragment>
        <h3>Docs</h3>
        <div style={noteStyle}>
          {representation
            ? representation.map((doc) => (
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
      <Fragment>
        <div style={noteStyle}>
          {federalFile
            ? federalFile.map((doc) => (
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
      <Fragment>
        <div style={noteStyle}>
          {stateFile.length > 0
            ? stateFile.map((doc) => (
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
      <Fragment>
        {hardship.length > 0 ? <h3> Currently Non Collectible </h3> : ""}
        <div style={noteStyle}>
          {hardship.length > 0
            ? hardship.map((doc) => (
                <DocItem
                  prospect={prospect}
                  key={doc.id}
                  resoStatus={resoStatus}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {offer.length > 0 ? <h3> Offer In Compromise </h3> : ""}
        <div style={noteStyle}>
          {offer.length > 0
            ? offer.map((doc) => (
                <DocItem
                  prospect={prospect}
                  key={doc.id}
                  resoStatus={resoStatus}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {paymentPlan.length > 0 ? <h3> Payment Plan </h3> : ""}
        <div style={noteStyle}>
          {paymentPlan.length > 0
            ? paymentPlan.map((doc) => (
                <DocItem
                  prospect={prospect}
                  key={doc.id}
                  resoStatus={resoStatus}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {appeal.length > 0 ? <h3> Appeal </h3> : ""}
        <div style={noteStyle}>
          {appeal.length > 0
            ? appeal.map((doc) => (
                <DocItem
                  prospect={prospect}
                  key={doc.id}
                  resoStatus={resoStatus}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {corp.length > 0 ? <h3> Corporate </h3> : ""}
        <div style={noteStyle}>
          {corp.length > 0
            ? corp.map((doc) => (
                <DocItem
                  prospect={prospect}
                  key={doc.id}
                  resoStatus={resoStatus}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {annuity.length > 0 ? <h3> Annuity </h3> : ""}
        <div style={noteStyle}>
          {annuity.length > 0
            ? annuity.map((doc) => (
                <DocItem
                  prospect={prospect}
                  key={doc.id}
                  resoStatus={resoStatus}
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
