import React, { useContext, useEffect, useState, Fragment } from "react";

import LeadContext from "../../context/lead/leadContext";
import ResoTaskItem from "./ResoTaskItem";
import ftreturn from "../../forms/f1040.pdf";
import streturn from "../../forms/2019-540.pdf";
import articles from "../../forms/arts-gs.pdf";
import f433a from "../../forms/f433a.pdf";
import f433b from "../../forms/f433boi.pdf";
import f433f from "../../forms/f433f.pdf";
import f656 from "../../forms/f656--2017-03-00--web.pdf";
import f8821 from "../../forms/f8821.pdf";
import f9465 from "../../forms/f9465.pdf";
import f12153 from "../../forms/f12153.pdf";
import f14134 from "../../forms/f14134.pdf";
import fss4 from "../../forms/fss4.pdf";
import operating from "../../forms/llc-1.pdf";
import f2848 from "../../forms/f2848.pdf";
import f3520 from "../../forms/f3520-pit.pdf";
import Docs from "./Docs";

import { v4 as uuidv4 } from "uuid";
const ResoTasks = (props) => {
  const { prospect, reso } = props;

  const {
    representation1,
    federalFile1,
    stateFile1,
    paymentPlan1,
    corp1,
    annuity1,
    offer1,
    hardship1,
    appeal1,
  } = reso;

  useEffect(() => {
    setDocs({
      rep: [],
      fed: [],
      state: [],
      payment: [],
      corp: [],
      off: [],
      hard: [],
      app: [],
      ann: [],
    });
  }, []);

  useEffect(() => {
    const representation2 = [
      {
        document: f3520,
        name: "State POA",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "representation",
        id: uuidv4(),
      },
      {
        document: f2848,
        name: "Federal POA",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "representation",
        id: uuidv4(),
      },
      {
        document: f8821,
        name: "8821",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "representation",
        id: uuidv4(),
      },
    ];

    const federalFile2 = [
      {
        document: ftreturn,
        name: "1040",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        id: uuidv4(),
        endpoint: "federalFile",
      },
      {
        document: ftreturn,
        name: "Expenses",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        id: uuidv4(),
        endpoint: "federalFile",
      },
      {
        document: ftreturn,
        name: "Wages",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        id: uuidv4(),
        endpoint: "federalFile",
      },
    ];
    const stateFile2 = [
      {
        document: streturn,
        name: "State Tax Return",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        id: uuidv4(),
        endpoint: "stateFile",
      },
      {
        document: streturn,
        name: "Expenses",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        id: uuidv4(),
        endpoint: "stateFile",
      },
      {
        document: streturn,
        name: "Wages",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        id: uuidv4(),
        endpoint: "stateFile",
      },
    ];
    const hardship2 = [
      {
        document: f433a,
        name: "433a",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        id: uuidv4(),
        endpoint: "hardship",
      },
      {
        document: f433b,
        name: "433b",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        id: uuidv4(),
        endpoint: "hardship",
      },
    ];
    const paymentPlan2 = [
      {
        document: f433f,
        name: "433f",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "paymentPlan",
        id: uuidv4(),
      },
      {
        document: f9465,
        name: "9465",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "paymentPlan",
        id: uuidv4(),
      },
    ];
    const offer2 = [
      {
        document: f656,
        name: "656",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "offer",
        id: uuidv4(),
      },

      {
        document: f433a,
        name: "433a",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "offer",
        id: uuidv4(),
      },
    ];
    const appeal2 = [
      {
        document: f12153,
        name: "12153",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "appeal",
        id: uuidv4(),
      },
      {
        document: f14134,
        name: "14134",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "appeal",
        id: uuidv4(),
      },
    ];
    const corp2 = [
      {
        document: fss4,
        name: "SS4",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "corp",
        id: uuidv4(),
      },
      {
        document: articles,
        name: "Articles of Incorporation",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "corp",
        id: uuidv4(),
      },
      {
        document: operating,
        name: "Operating Agreement",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "corp",
        id: uuidv4(),
      },
    ];
    const annuity2 = [
      {
        document: ftreturn,
        name: "Craig Special 1",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "annuity",
        id: uuidv4(),
      },
      {
        document: ftreturn,
        name: "Craig  Special 2",
        department: "",
        postedDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        updatedBy: "",
        endpoint: "annuity",
        id: uuidv4(),
      },
    ];
    if (prospect.resoStatus) {
      setDocs({
        rep: representation2,
        fed: federalFile2,
        state: stateFile2,
        payment: paymentPlan2,
        cor: corp2,
        off: offer2,
        hard: hardship2,
        app: appeal2,
        ann: annuity2,
      });
    } else if (prospect.resoStatus.representation.length > 0) {
      setDocs({
        rep: prospect.resoStatus.representation,
      });
    } else if (prospect.resoStatus.federalFile.length > 0) {
      setDocs({
        fed: prospect.resoStatus.federalFile,
      });
    } else if (prospect.resoStatus.stateFile.length > 0) {
      setDocs({
        rep: prospect.resoStatus.stateFile,
      });
    } else if (prospect.resoStatus.hardship.length > 0) {
      setDocs({
        hard: prospect.resoStatus.hardship,
      });
    } else if (prospect.resoStatus.paymentPlan.length > 0) {
      setDocs({
        payment: prospect.resoStatus.paymentPlan,
      });
    } else if (prospect.resoStatus.offer.length > 0) {
      setDocs({
        off: prospect.resoStatus.offer,
      });
    } else if (prospect.resoStatus.corp.length > 0) {
      setDocs({
        cor: prospect.resoStatus.corp,
      });
    } else if (prospect.resoStatus.annuity.length > 0) {
      setDocs({
        ann: prospect.resoStatus.annuity,
      });
    }
  }, [prospect]);

  const [docs, setDocs] = useState({
    rep: [],
    fed: [],
    state: [],
    payment: [],
    cor: [],
    off: [],
    hard: [],
    app: [],
    ann: [],
  });
  console.log(docs);
  const { rep, fed, state, payment, cor, hard, app, ann, off } = docs;
  return (
    <div>
      <h2>Please Ensure Completion and Submission of all required docs here</h2>

      <Fragment>
        {representation1 ? <h3> Representation </h3> : ""}
        <div style={noteStyle}>
          {representation1
            ? rep.map((doc) => (
                <ResoTaskItem
                  reso={reso}
                  prospect={prospect}
                  resoStatus={prospect.resoStatus}
                  key={doc.id}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {federalFile1 ? <h3> Federal Tax Returns </h3> : ""}
        <div style={noteStyle}>
          {federalFile1
            ? fed.map((doc) => (
                <ResoTaskItem
                  reso={reso}
                  prospect={prospect}
                  resoStatus={prospect.resoStatus}
                  key={doc.id}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {stateFile1 ? <h3> State Tax Returns </h3> : ""}
        <div style={noteStyle}>
          {stateFile1
            ? state.map((doc) => (
                <ResoTaskItem
                  reso={reso}
                  prospect={prospect}
                  resoStatus={prospect.resoStatus}
                  key={doc.id}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {hardship1 ? <h3> Currently Non Collectible </h3> : ""}
        <div style={noteStyle}>
          {hardship1
            ? hard.map((doc) => (
                <ResoTaskItem
                  reso={reso}
                  prospect={prospect}
                  key={doc.id}
                  resoStatus={prospect.resoStatus}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {offer1 ? <h3> Offer In Compromise </h3> : ""}
        <div style={noteStyle}>
          {offer1
            ? off.map((doc) => (
                <ResoTaskItem
                  reso={reso}
                  prospect={prospect}
                  key={doc.id}
                  resoStatus={prospect.resoStatus}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {paymentPlan1 ? <h3> Payment Plan </h3> : ""}
        <div style={noteStyle}>
          {paymentPlan1
            ? payment.map((doc) => (
                <ResoTaskItem
                  reso={reso}
                  prospect={prospect}
                  key={doc.id}
                  resoStatus={prospect.resoStatus}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {appeal1 ? <h3> Appeal </h3> : ""}
        <div style={noteStyle}>
          {appeal1
            ? app.map((doc) => (
                <ResoTaskItem
                  reso={reso}
                  prospect={prospect}
                  key={doc.id}
                  resoStatus={prospect.resoStatus}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {corp1 ? <h3> Corporate </h3> : ""}
        <div style={noteStyle}>
          {corp1
            ? cor.map((doc) => (
                <ResoTaskItem
                  reso={reso}
                  key={doc.id}
                  prospect={prospect}
                  resoStatus={prospect.resoStatus}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {annuity1 ? <h3> Annuity </h3> : ""}
        <div style={noteStyle}>
          {annuity1
            ? ann.map((doc) => (
                <ResoTaskItem
                  reso={reso}
                  key={doc.id}
                  prospect={prospect}
                  resoStatus={prospect.resoStatus}
                  doc={doc}
                />
              ))
            : ""}
        </div>
      </Fragment>
      <Fragment>
        {" "}
        <div className='card sidebar'>
          <Docs prospect={prospect} resoStatus={prospect.resoStatus} />
        </div>
      </Fragment>
    </div>
  );
};
const noteStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: ".2rem",
};

export default ResoTasks;
