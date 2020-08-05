import React, { Fragment, useState, useEffect, useContext } from "react";
import hero2 from "../../../images/hero2.png";
import LeadContext from "../../../context/lead/leadContext";
import Footer from "../website/layout/Footer";
import { Link } from "react-router-dom";
import StickyNavbar from "../../layout/StickyNavbar";
import criminal from "../../../images/criminal.jpg";

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
  const [letters, setLetters] = useState([]);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setLetters([...letters, e.target.value]);
  };

  useEffect(() => {
    if (letters.length > 0 && new Set(letters).size !== letters.length) {
      function filterByCount(array, count) {
        return array.filter(function (value) {
          return (
            array.filter(function (v) {
              return v === value;
            }).length === count
          );
        });
      }

      setLetters(filterByCount(letters, 1));
    }
  }, [letters]);

  const [client, setClient] = useState(false);

  console.log(letters);

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
        <div className='grid-zero' style={{ overflowX: "hidden" }}>
          <div className='overlay'>
            <p style={{ backgroundColor: "#f4f4f4" }}>
              <img
                src={hero2}
                alt=''
                style={{
                  zIndex: "-1",
                  height: "100vh",
                  width: "95vw",
                  opacity: "22%",
                }}
              />
            </p>
          </div>
          <div className='homecopy'>
            <div className='container grid-2 py-3 mx-3'>
              <div className='card'>
                <br />
                <br />
                <h2 className='text-danger lead'>
                  NOTICE OF CRIMINAL INVESTIGATION MAILER
                </h2>
                <h4>
                  <i>
                    If you or a loved one has recieved a letter like the one
                    above, you may be entitled to compensation as an ongoing
                    complaint filed against the company American Tax Solutions
                    and Disbarred Attorney Terrance "Terry" Selb Aka Chris
                    Baker.{" "}
                  </i>
                </h4>
                <br />
                <a
                  href='tel:+13106665997'
                  className='btn btn-block btn-primary all-center'>
                  Speak to a lawyer
                </a>
                <br />
                <ul>
                  <br />
                  <li>
                    <h4>
                      Disbarred Attorney Terrance Selb sends fraudulent mailers
                      to people with expired tax liens impersonating the
                      government and threatening criminal charges.
                    </h4>
                  </li>

                  <li>
                    <h5>
                      We are actively submitting all complaints against Terrance
                      Selb, Tyler Bennet, Chris Baker, Ben Graupner and Andrew
                      Rappor and the companies American Tax Solutions, Tax Debt
                      Group and Get A Tax Lawyer to the BBB, FTC and State of
                      California.
                    </h5>
                  </li>
                </ul>
                <h5>
                  Your complaints are completely anonymous and could lead to
                  financial compensation if you were directly impacted by this
                  scam.
                </h5>
              </div>
              <div>
                <img src={criminal} style={{ height: "800px" }} />
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='card homeform'>
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
              <div className='grid-2'>
                <div>
                  <h3>Which Letters Did you Receive</h3>

                  <label htmlFor='years'>
                    Notice of Criminal Investigation
                  </label>
                  <input
                    type='checkbox'
                    name='letters'
                    value='criminal'
                    onChange={onChange}
                  />
                  <br />
                  <label htmlFor='years'>Notice of Distraint Warrant</label>
                  <input
                    type='checkbox'
                    name='letters'
                    value='distraint'
                    onChange={onChange}
                  />
                  <br />
                  <label htmlFor='years'>Social Security Seizure</label>
                  <input
                    type='checkbox'
                    name='letters'
                    value='ssi'
                    onChange={onChange}
                  />
                </div>
                <div>
                  <br />
                  <br />
                  <button className='btn btn-danger btn-block '>
                    File A Complaint
                  </button>
                </div>
              </div>
              <br />
              <label htmlFor='company'>
                Were you an American Tax Solutions Client?
              </label>
              <select
                name='client'
                id='client'
                onChange={(e) => setClient(e.target.value)}>
                <option value=''></option>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
              </select>
              <label htmlFor='paid'>
                If So How Much Money Did You Pay Them?
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
        <Footer />
      </Fragment>
    </Fragment>
  );
};

export default FileAComplaint;
