import React, { Fragment, useState, useEffect, useContext } from "react";
import hero2 from "../../../images/hero2.png";
import LeadContext from "../../../context/lead/leadContext";
import Footer from "../website/layout/Footer";
import { Link } from "react-router-dom";
import StickyNavbar from "../../layout/StickyNavbar";

const FileAComplaint = () => {
  const leadContext = useContext(LeadContext);

  const { submitLead } = leadContext;

  useEffect(() => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      problem: "",
      company: "",
      paid: "",
      status: "new",
    });
  }, []);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    problem: "",
    company: "",
    paid: "",
    status: "new",
  });

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const { fullName, email, phone, problem, company, paid } = form;

  const onClick = (e) => {
    submitLead(form);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <Fragment>
        <StickyNavbar />
      </Fragment>
      <Fragment>
        <div className='grid-hero'>
          <div className='overlay'>
            <p style={{ backgroundColor: "#f4f4f4" }}>
              <img
                src={hero2}
                alt=''
                style={{ zIndex: "-1", height: "120vh", opacity: "22%" }}
              />
            </p>
          </div>
          <div className='homecopy'>
            <div className='container grid-2 py-3 mx-3'>
              <div className='card' style={{ height: "500px" }}>
                <h2 className='text-danger lead'>Tax Scam Complaint Form</h2>
                <i>
                  Thank you for Responding to our Email. We are looking forward
                  to helping you resolve your grievance with the tax company,
                  and then help you solve your tax problems.{" "}
                </i>

                <ul>
                  <li>
                    Our Attorneys accept Contingency and will work to fight all
                    the major tax fraudsters
                  </li>
                  <li>
                    We will help you find tax relief with a real and reputible
                    firm.
                  </li>
                </ul>
                <h5>
                  The Consultation is completely free and we will review your
                  lawsuit and tax case for free. Give us a call 1-800-459-7124
                </h5>

                <Link
                  onClick={onClick}
                  to='/igetyourmoneyback'
                  className='btn btn-primary btn-block'
                  style={{ height: "50px" }}>
                  Speak To A Lawyer
                </Link>
              </div>
              <div>
                <form onSubmit={onSubmit}>
                  <input
                    type='text'
                    name='fullName'
                    placeholder='Full Name'
                    onChange={onChange}
                    value={fullName}
                  />
                  <input
                    type='text'
                    name='email'
                    placeholder='e-mail'
                    onChange={onChange}
                    value={email}
                  />
                  <input
                    type='text'
                    name='phone'
                    placeholder='Phone Number'
                    onChange={onChange}
                    value={phone}
                  />
                  <label htmlFor='years'>
                    Do you still have unfiled taxes? Tax debt?
                  </label>
                  <input
                    type='text'
                    placeholder='Tax Years UnFiled'
                    name='problem'
                    onChange={onChange}
                    value={problem}
                  />
                  <label htmlFor='company'>
                    What Was The Name Of The Other Company
                  </label>
                  <input
                    type='text'
                    placeholder='Other Company'
                    name='company'
                    onChange={onChange}
                    value={company}
                  />
                  <label htmlFor='paid'>
                    How Much Did You Pay The Other Company?
                  </label>
                  <input
                    type='text'
                    placeholder='Amount Paid'
                    name='Paid'
                    onChange={onChange}
                    value={paid}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    </Fragment>
  );
};

export default FileAComplaint;
