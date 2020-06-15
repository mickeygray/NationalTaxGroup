import React, { Fragment, useState, useEffect, useContext } from "react";
import ContactForm from "../contactus/ContactForm";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import LeadContext from "../../../../../context/lead/leadContext";

const ContactUs = (props) => {
  const style = {
    maxWidth: "450px",
    height: "250px",
    overflowX: "hidden",
    overflowY: "hidden",
  };
  const containerStyle = {
    maxWidth: "450px",
    height: "350px",
  };

  return (
    <Fragment>
      <h2 className='lead text-primary text-center'>Get in touch</h2>

      <div className='grid-2'>
        <div>
          <h4>National Tax Group</h4>
          <ul>
            <li>Sherman Oaks, CA 90210</li>
            <li>info@nationaltaxgroup.com</li>
            <li>1-800-324-3423</li>
          </ul>

          <Map
            google={props.google}
            style={style}
            containerStyle={containerStyle}
          />
        </div>

        <div>
          {" "}
          <ContactForm />
        </div>
      </div>
    </Fragment>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_VbXBOu4L-xHvB8BHvSf_kMPxDBPLmo8",
})(ContactUs);
