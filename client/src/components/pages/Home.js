import React from "react";
import Upload from "../lists/Upload";

import EmailCreator from "../emails/EmailCreator";
import EmailLibrary from "../emails/EmailLibrary";
import ListFilter from "../lists/ListFilter";
import CampaignBuilder from "../campaigns/CampaignBuilder";
import CampaignEditor from "../campaigns/CampaignEditor";
import Campaigns from "../campaigns/Campaigns";
const Home = () => {
  return (
    <div>
      <h3 className='text-danger text-center'>E-Yore</h3>
      <div className='container'>
        <div>
          <EmailCreator />
        </div>

        <div>
          <ListFilter />
        </div>

        <div className='grid-2'>
          <div>
            {" "}
            <CampaignBuilder />
          </div>
          <div>
            <CampaignEditor />
          </div>
        </div>
        <div className='grid-2'>
          <div>
            <EmailLibrary />
          </div>
          <div>
            {" "}
            <Campaigns />
          </div>
        </div>

        <div>
          <Upload />
        </div>
      </div>
    </div>
  );
};

export default Home;
