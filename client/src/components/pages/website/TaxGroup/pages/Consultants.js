import React, { Fragment } from "react";
import Footer from "../layout/Footer";
import Hero from "../layout/Hero";
import SmallForm from "../layout/SmallForm";
import PlanCards from "../consultants/PlanCards";
const Consultants = () => {
 return (
  <Fragment>
   <Hero />
   <br />
   <hr />
   <SmallForm />
   <hr />
   <br />
   <div className='container'>
    <PlanCards />
   </div>

   <Footer />
  </Fragment>
 );
};

export default Consultants;
