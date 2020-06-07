import React from "react";
import Upload from "../lists/Upload";

import EmailCreator from "../emails/EmailCreator";
import EmailLibrary from "../emails/EmailLibrary";
import ListFilter from "../lists/ListFilter";
import CampaignBuilder from "../campaigns/CampaignBuilder";
const Home = () => {
  return (
    <div>
      <div>
        <Upload />
      </div>

      <div>
        <EmailCreator />
      </div>

      <div>
        <ListFilter />
      </div>

      <div>
        <CampaignBuilder />
      </div>

      <div>
        <EmailLibrary />
      </div>
    </div>
  );
};

export default Home;
