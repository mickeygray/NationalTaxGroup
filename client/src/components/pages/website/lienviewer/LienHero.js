import React, { Fragment } from "react";

import typing from "../../../../images/typing.mp4";

const LienHero = () => {
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
                postion: "relative",
                top: "-10",
                right: "25",
                opacity: "15%",
                overflow: "hidden",
                width: "100vw",
                height: "100vh",
              }}>
              <source src={typing} type='video/mp4' />
            </video>
          </p>
        </div>
        <div className='homecopy'>
          <div className='container py-3 mx-3'>
            <br />
            <br />
            <h2 className='text-primary'>Lien Viewer</h2>
            <h3 className='text-danger'>Your Free Tax Lien Look Up</h3>
            <p style={{ color: "white" }}>
              Unsure if you have a tax lien? <br /> Our Anonymous Look Up Will
              Search Public Record <br /> and Find Your Most Recent Tax Lien
              Information
            </p>
            <br />
            <a
              href='tel:+18004597124'
              className='btn btn-primary all-center'
              style={{ borderRadius: "5px", width: "200px" }}>
              Learn More
            </a>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </Fragment>
  );
};

export default LienHero;
