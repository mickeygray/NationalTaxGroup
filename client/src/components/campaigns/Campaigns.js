import React, { useEffect, useContext, useState, Fragment } from "react";
import EmailContext from "../../context/email/emailContext";
import LeadContext from "../../context/lead/leadContext";
import CampaignItem from "./CampaignItem";
import CampaignSearch from "./CampaignSearch";
const Campaigns = () => {
  const emailContext = useContext(EmailContext);
  const leadContext = useContext(LeadContext);
  const {
    searchCampaigns,
    campaigns,
    putEmail,
    putList,
    email,
    campaign,
    deleteCampaign,
  } = emailContext;
  const { mailObject } = leadContext;

  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch("visible");
  }, [searchCampaigns]);

  const { _id } = campaign;
  console.log(campaign);

  return (
    <Fragment>
      <div className='grid-2'>
        <div className='card'>
          <button
            className='btn btn-block btn-danger'
            onClick={() => putEmail(email, campaign)}>
            Update Campaign Email
          </button>
          <button
            className='btn btn-block btn-success'
            onClick={() => putList(mailObject, campaign)}>
            Update Campaign List
          </button>
          <button
            className='btn btn-block btn-black'
            onClick={() => deleteCampaign(_id)}>
            Delete Campaign
          </button>
        </div>
        <div className='card'>
          <CampaignSearch />

          {search === "visible"
            ? campaigns.map((campaign) => (
                <CampaignItem key={campaign._id} campaign={campaign} />
              ))
            : ""}
        </div>
      </div>
    </Fragment>
  );
};

export default Campaigns;
