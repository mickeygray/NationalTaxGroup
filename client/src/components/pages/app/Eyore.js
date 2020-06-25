import React from "react";
import Upload from "../../eyore/lists/Upload";

import EmailCreator from "../../eyore/emails/EmailCreator";
import EmailLibrary from "../../eyore/emails/EmailLibrary";
import ListFilter from "../../eyore/lists/ListFilter";
import CampaignBuilder from "../../eyore/campaigns/CampaignBuilder";
import CampaignEditor from "../../eyore/campaigns/CampaignEditor";
import Campaigns from "../../eyore/campaigns/Campaigns";

const Eyore = () => {
  return (
    <div>
      <h3 className='text-danger text-center'>E-Yore</h3>
      <div className='container'>
        <div>
          <EmailCreator />
        </div>
        <br />
        <br />
        <div className='grid-2'>
          <div>
            <ListFilter />
          </div>
          <div className='card' style={{ width: "400px", height: "400px" }}>
            Phones
          </div>
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

export default Eyore;
