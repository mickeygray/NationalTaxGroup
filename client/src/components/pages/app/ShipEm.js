import React, { Fragment } from "react";
import ListSearch from "../../shipem/ListSearch";
import CallFilter from "../../calls/CallFilter";
import Leads from "../../shipem/Leads";
import Navbar from "../../layout/Navbar";
import LeadForm from "../../shipem/LeadForm";
import Calls from "../../calls/Calls";

const ShipEm = () => {
  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>
      <div className='grid-ship'>
        <div className='card'>
          <h5 className='text-danger'>
            {" "}
            Full Name, Address, Phone, Pincode, Email{" "}
          </h5>
          <ListSearch />
          <Leads />
        </div>

        <div className='card'>
          <LeadForm />
        </div>

        <div className='card'>
          <h3 className='text-danger text-center'> Call Log </h3>
          <CallFilter />
          <Calls />
        </div>
      </div>
    </Fragment>
  );
};

export default ShipEm;
