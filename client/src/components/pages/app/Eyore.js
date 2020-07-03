import React, { Fragment } from "react";
import Upload from "../../eyore/lists/Upload";
import Navbar from "../../layout/Navbar";
import EmailCreator from "../../eyore/emails/EmailCreator";
import EmailLibrary from "../../eyore/emails/EmailLibrary";
import ListFilter from "../../eyore/lists/ListFilter";
import ListStats from "../../eyore/lists/ListStats";
import CampaignBuilder from "../../eyore/campaigns/CampaignBuilder";
import CampaignEditor from "../../eyore/campaigns/CampaignEditor";
import Campaigns from "../../eyore/campaigns/Campaigns";
import CampaignCalls from "../../calls/CampaignCalls";
import CampaignPreviewer from "../../eyore/campaigns/CampaignPreviewer";

const Eyore = () => {
  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>
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
            <div>
              <CampaignPreviewer />
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
    </Fragment>
  );
};

export default Eyore;
