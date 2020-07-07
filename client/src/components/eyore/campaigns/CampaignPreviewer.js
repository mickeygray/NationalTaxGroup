import React, { useEffect, useContext, useState, useCallback } from "react";
import CampaignCallModal from "./CampaignCallModal";
import CallContext from "../../../context/call/callContext";
import StatContext from "../../../context/stat/statContext";
import emailContext from "../../../context/email/emailContext";

const CampaignPreviewer = () => {
  const callContext = useContext(CallContext);

  const statContext = useContext(StatContext);

  const {
    listLength,
    filterSelected,
    currentCampaign,
    currentEmail,
    idArray,
  } = statContext;
  const {
    getCampaignCalls,
    campaignCalls,
    getEmailCalls,
    emailCalls,
    currentCalls,
  } = callContext;

  useEffect(() => {
    setReport({
      email: {},
      campaign: {},
      listName: "",
      date: Date.now(),
      calls: [],
      ids: [],
      listLength: "",
      prospects: [],
      clients: [],
    });
  }, []);

  useEffect(() => {
    if (
      currentEmail != null ||
      idArray != null ||
      listLength != null ||
      currentCampaign != null
    )
      setReport({
        email: currentEmail,
        campaign: currentCampaign,
        listName: "",
        date: Date.now(),
        calls: [],
        ids: idArray,
        listLength: listLength,
        prospects: [],
        clients: [],
      });
  }, [idArray, currentEmail, listLength, emailCalls, statContext]);

  const [campaignCallModal, setCampaignCallModal] = useState(false);
  const [campaignCallState, setCampaignCallState] = useState([]);

  useEffect(() => {
    if (currentEmail != null) {
      getEmailCalls(currentEmail);
      setCampaignCallState(emailCalls);
    }
  }, [currentEmail, emailCalls]);

  const toggleVisibility = useCallback(() => {
    setCampaignCallModal((prevState) => !prevState);
  }, []);

  const [report, setReport] = useState({
    email: {},
    campaign: {},
    listName: "",
    date: Date.now(),
    calls: [],
    ids: [],
    listLength: "",
    prospects: [],
    clients: [],
  });

  const { email, campaign, listName, date, calls } = report;

  return (
    <div>
      Current Campaign : {currentCampaign ? currentCampaign.campaignName : ""}{" "}
      <br />
      Current Email : {currentEmail ? currentEmail.title : ""} <br />
      Current List Filter : {filterSelected ? filterSelected : ""} <br />
      Current List Length :{listLength ? listLength : ""}
      <br />
      Campaign Start Date: {currentCampaign ? currentCampaign.startDate : ""}
      <button
        className='btn btn-sm btn-dark'
        onClick={() => setCampaignCallModal(true)}>
        {email ? email.trackingNumber : ""}{" "}
        {campaign ? campaign.trackingNumbers : ""}
      </button>
      {campaignCallModal ? (
        <CampaignCallModal
          campaignCallState={campaignCallState}
          toggleVisibility={toggleVisibility}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default CampaignPreviewer;
