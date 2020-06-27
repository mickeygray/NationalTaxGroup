import React, { Fragment } from "react";
import Hero from "../layout/Hero";
import Footer from "../layout/Footer";

import About from "../layout/About";
import ContactForm from "../contactus/ContactForm";
import Feedback from "../contactus/Feedback";
import Blogs from "../About/Blogs";
import StickyNavbar from "../../../layout/StickyNavbar";

const TaxGroup = () => {
  return (
    <Fragment>
      <div>
        <StickyNavbar />
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
          <ContactForm />
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default TaxGroup;
