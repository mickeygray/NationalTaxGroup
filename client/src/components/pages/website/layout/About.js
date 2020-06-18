import React, { useState, Fragment } from "react";
import bodyimg from "../../../../images/bodyimg.jpg";
import bodyimg2 from "../../../../images/bodyimg2.jpg";
import bodyimg3 from "../../../../images/bodyimg3.jpg";
import Iframe from "react-iframe";
import ToolSelect from "../solutions/ToolSelect";
import Company from "../consultants/Company";
import PlanCards from "../consultants/PlanCards";

const About = () => {
  const [video, loadVideo] = useState(false);
  const [video2, loadVideo2] = useState(false);
  const [video3, loadVideo3] = useState(false);

  return (
    <Fragment>
      <div className='grid-2'>
        <p className='mx-3'>
          <h2>
            A <span className='lead text-primary'> Story </span> <br />
            About Us
          </h2>
        </p>

        <p>
          We are one of the largest tax resolution firms in the nation. Our
          track record spans back over a decade. We have had thousands of
          clients who have saved millions of dollars.
          <br />
          <br />
          Our process includes following all the standards provided the State
          and Internal Revenue Service. Our accounts, enrolled agents and
          attorneys are nationally recognized tax experts.
        </p>
      </div>

      <div className='grid-home'>
        <div className='container'>
          <div className='bodyimg' id='about'>
            <div className='bg-dark' style={{ height: "99%" }}>
              <img style={{ opacity: "66%" }} src={bodyimg} alt='' />
            </div>
            <h1 className='py-3 m-3 text-white'>
              <br />
              <button
                onClick={video ? () => loadVideo(false) : () => loadVideo(true)}
                style={{
                  width: "10rem",
                  height: "5rem",
                  fontSize: "1.5rem",
                  zIndex: "9999",
                }}
                id='1'
                className='btn btn-primary btn-sm py-3 m-3'>
                Latest on Covid
              </button>
            </h1>
            {video ? (
              <div className='video-port'>
                <br />
                <br />
                <Iframe
                  url='https://www.youtube.com/embed/phcbFAiKM_c'
                  width='100%'
                  height='100%'
                  display='initial'
                  position='absolute'
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <br />
          <br />
          <br />
          <br />
          <Company />
        </div>

        <div className='bodyimg2  container' id='consultants'>
          <div className='bg-dark' style={{ height: "99%" }}>
            <img style={{ opacity: "66%" }} src={bodyimg2} alt='' />
          </div>
          <h1 className='py-3 m-3 text-white'>
            <br />
            <button
              onClick={
                video2 ? () => loadVideo2(false) : () => loadVideo2(true)
              }
              style={{
                width: "10rem",
                height: "5rem",
                fontSize: "1.5rem",
                zIndex: "9999",
              }}
              id='2'
              className='btn btn-primary btn-sm py-3 m-3'>
              Consultants
            </button>
          </h1>
          {video2 ? (
            <div className='video-port'>
              <br />
              <br />
              <Iframe
                url='https://www.youtube.com/embed/Pd2OCeiRmKI'
                width='100%'
                height='100%'
                display='initial'
                position='absolute'
              />
            </div>
          ) : (
            ""
          )}
          <br />
          <br />
          <br />
          <br />

          <PlanCards />
        </div>

        <div className='bodyimg3 container' id='software'>
          <div className='bg-dark' style={{ height: "98%" }}>
            <img style={{ opacity: "66%" }} src={bodyimg3} alt='' />
          </div>
          <h1 className='py-3 m-3 text-white'>
            <br />
            <button
              onClick={
                video3 ? () => loadVideo3(false) : () => loadVideo3(true)
              }
              style={{
                width: "10rem",
                height: "5rem",
                fontSize: "1.5rem",
                zIndex: "9999",
              }}
              id='3'
              className='btn btn-primary btn-sm py-3 m-3'>
              Resolution
            </button>
          </h1>
          {video3 ? (
            <div className='video-port'>
              <br />
              <br />
              <Iframe
                url='https://www.youtube.com/embed/qgr6c6UG67I'
                width='100%'
                height='100%'
                display='initial'
                position='absolute'
              />
            </div>
          ) : (
            ""
          )}
          <br />
          <br />
          <div style={{ width: "85%" }}>
            <ToolSelect />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
