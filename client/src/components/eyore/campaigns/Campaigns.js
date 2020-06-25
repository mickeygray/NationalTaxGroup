import React, { useEffect, useContext, useState, Fragment } from "react";
import EmailContext from "../../../context/email/emailContext";

import CampaignItem from "./CampaignItem";
import CampaignSearch from "./CampaignSearch";
const Campaigns = () => {
  const emailContext = useContext(EmailContext);

  const { searchCampaigns, campaigns } = emailContext;

  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch("visible");
  }, [searchCampaigns]);

  const clearAll = () => {
    setSearch("");
  };

  return (
    <Fragment>
      <div className='card'>
        <CampaignSearch />
        <button
          type='submit'
          value='clear'
          onClick={() => clearAll()}
          className='btn btn-light btn-block'>
          {" "}
          Clear Search
        </button>

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
