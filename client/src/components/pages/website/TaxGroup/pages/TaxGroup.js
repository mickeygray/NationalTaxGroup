import React, { Fragment } from "react";
import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import Footer from "../layout/Footer";
import SmallForm from "../layout/SmallForm";
import About from "../layout/About";
import ContactUs from "./ContactUs";
import Feedback from "../contactus/Feedback";
import Blogs from "../About/Blogs";

const TaxGroup = () => {
  return (
    <Fragment>
      <div>
        <Hero />
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='container'>
        <div id='about'>
          <About />
        </div>
        <br />
        <br />

        <div id='learn'>
          <h3 className='lead text-center text-primary'>Learn About Us </h3>
          <Blogs />
          <br />
          <br />
          <Feedback />
        </div>
        <div id='contact'>
          <ContactUs />
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default TaxGroup;
