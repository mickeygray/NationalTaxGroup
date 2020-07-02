import React, { Fragment } from "react";
import solo from "../../../../images/solo.mp4";
import SmallForm from "./SmallForm";

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
                postion: "relative",
                top: "-10",
                right: "25",
                opacity: "15%",
                overflow: "hidden",
              }}>
              <source src={solo} type='video/mp4' />
            </video>
          </p>
        </div>
        <div className='homecopy'>
          <div className='container py-3 mx-3'>
            <br />
            <br />
            <h2 className='text-primary'>National Tax Group</h2>
            <h3 className='text-danger'>Tax Resolution Made Simple</h3>
            <p style={{ color: "white" }}>
              We save clients thousands <br /> with a full suite of financial
              solutions <br /> and the help of our world class Accountants and
              Enrolled Agents.
            </p>
            <br />
            <a
              href='tel:+18004597124'
              className='btn btn-primary all-center'
              style={{ borderRadius: "5px", width: "200px" }}>
              I need help
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
