import React, { Fragment } from "react";

import court from "../../../../images/court.mp4";
import SmallForm from "../layout/SmallForm";

const Hero = () => {
  return (
    <Fragment>
      <div className='grid-hero'>
        <div className='overlay'>
          <p style={{ backgroundColor: "black" }}>
            <video
              autoPlay
              muted
              loop
              style={{
                opacity: "15%",
                width: "100vw",
                height: "100vh",
              }}>
              <source src={court} type='video/mp4' />
            </video>
          </p>
        </div>
        <div className='homecopy'>
          <div className='container py-3 mx-3'>
            <br />
            <br />
            <h2 className='text-primary'>Have you been ripped off?</h2>
            <h3 className='text-danger'>We Will Sue!</h3>
            <p style={{ color: "white" }}>
              We have taken on every major debt resolution firm
              <br />
              and sued on behalf of hundreds of ripped off clients <br />
              recouping them millions in legal fees for work not done.
            </p>
            <br />
            <a
              href='tel:+180000000'
              className='btn btn-primary all-center'
              style={{ borderRadius: "5px", width: "200px" }}>
              Talk To A Lawyer
            </a>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "-10rem" }}>
        <SmallForm />
      </div>
      <br />
      <br />
      <br />
    </Fragment>
  );
};

export default Hero;
