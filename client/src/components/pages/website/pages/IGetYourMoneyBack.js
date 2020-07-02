import React, { Fragment } from "react";
import Hero from "../IGetYourMoneyBack/Hero";
import Strategy from "../IGetYourMoneyBack/Strategy";
import ContactForm from "../IGetYourMoneyBack/ContactForm";
import Footer from "../layout/Footer";
import StickyNavbar from "../../../layout/StickyNavbar";
const IGetYourMoneyBack = () => {
  return (
    <Fragment>
      <StickyNavbar />
      <Hero />
      <Strategy />

      <div className='grid-2 container'>
        <div className='card bg-light'>
          WE'VE HELPED CLIENTS GET THOUSANDS OF DOLLARS BACK FROM:
          <ul>
            <li>→ STUDENT LOAN MODIFICATION COMPANIES</li>
            <li> → TAX RESOLUTION COMPANIES </li>
            <li> → LOAN MODIFICATION COMPANIES </li>
            <li> → DEBT RELIEF COMPANIES </li>
            <li> → CREDIT REPAIR COMPANIES</li>
          </ul>
        </div>
        <div className='text-danger text-center'>
          <h5>1-800-459-7124</h5>
          <p>
            What do all these companies have in common? They all normally
            require You – the consumer – to pay for services up front - with
            nothing more Than a promise to deliver to you measurable value. But
            what happens when Those companies don’t deliver on their promises?
            Where does that leave You the customer? That’s where igetmoneyback
            springs into action! It’s No secret there are a lot of bad apples
            out there. Once we determine You’ve been ripped off, we fight for
            your rights by utilizing every tool At our disposal.
          </p>
        </div>
      </div>

      <ContactForm />
      <br />
      <br />
      <Footer />
    </Fragment>
  );
};

export default IGetYourMoneyBack;
