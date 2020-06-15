import React, { Fragment } from "react";
import Footer from "../layout/Footer";
import Hero from "../layout/Hero";
import ToolSelect from "../solutions/ToolSelect";
import SmallForm from "../layout/SmallForm";

const Solutions = () => {
 return (
  <Fragment>
   <Hero />
   <br />
   <hr />
   <SmallForm />
   <hr />
   <br />
   <div className='container'>
    <h3 className='lead all-center'>Design your Freshbooks Package</h3>
    <br />
    <ToolSelect />
   </div>
   <br />
   <Footer />
  </Fragment>
 );
};

export default Solutions;
