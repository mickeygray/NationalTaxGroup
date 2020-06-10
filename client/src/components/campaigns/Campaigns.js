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
  const { dncArray } = leadContext;

  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch("visible");
  }, [searchCampaigns]);

  const { _id } = campaign;
  console.log(campaign);

  return (
    <Fragment>
      <div className='card'>
        <CampaignSearch />

        {search === "visible"
          ? campaigns.map((campaign) => (
              <CampaignItem key={campaign._id} campaign={campaign} />
            ))
          : ""}
      </div>
    </Fragment>
  );
};

export default Campaigns;
