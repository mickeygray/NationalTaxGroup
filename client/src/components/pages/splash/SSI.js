import React, { Fragment, useState, useEffect, useContext } from "react";
import hero2 from "../../../images/hero2.png";
import LeadContext from "../../../context/lead/leadContext";
import Footer from "../website/layout/Footer";
import { Link } from "react-router-dom";
import StickyNavbar from "../../layout/StickyNavbar";
import ssi from "../../../images/ssi.png";

const SSI = () => {
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
      status: "criminal",
    });
  }, []);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    problem: "",
    company: "",
    paid: "",
    status: "criminal",
  });
  const [letters, setLetters] = useState([]);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setLetters([...letters, e.target.value]);
  };

  const [urls, setUrls] = useState("");

  useEffect(() => {
    if (window.location.href.length > 0) {
      setUrls(window.location.href);
    }
  }, []);

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
    <div className='container '>
      <div className='grid-2'>
        <div>
          <img src={ssi} />
        </div>
        <div>
          <br />

          <h2 className='lead' style={{ color: "red" }}>
            Social Security Benefits Levy
          </h2>
          <h3>
            Pending Legal Action Against American Tax Solutions,
            GetATaxLawyer.com and Tax Debt Resolution
          </h3>
          <h4>
            <i>
              If you or a loved one has recieved a letter like this one, you may
              be entitled to compensation as an ongoing complaint filed against
              the company American Tax and Disbarred Attorney Terrance "Terry"
              Selb Aka Chris Baker.{" "}
            </i>
          </h4>
          <br />

          <br />
          <ul>
            <li>
              <h4>
                Disbarred Attorney Terrance Selb sends these mailers to people
                in an attempt to solicit services.
              </h4>
            </li>
            <br />
            <li>
              <h5>
                We are actively submitting all complaints against Terrance Selb,
                Tyler Bennet, Chris Baker, Ben Graupner and Andruw Rapport and
                the companies American Tax Solutions, Tax Debt Group and
                GetATaxLawyer.com to the BBB, FTC and State of California.
              </h5>
            </li>
          </ul>
          <br />
          <h5>
            Your complaints are completely anonymous and could lead to financial
            compensation if you were directly impacted by this scam.
          </h5>
        </div>
      </div>
      <div className='container'>
        {" "}
        <div
          className='card bg-light container all-center'
          style={{ margin: "auto" }}>
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
            <input
              type='text'
              name='url'
              style={{ display: "none" }}
              value={urls}
            />
            <div className='grid-2'>
              <div>
                <h3>Which Letters Did you Receive</h3>

                <label htmlFor='years'>Notice of Criminal Investigation</label>
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
                <button onClick={onClick} className='btn btn-danger btn-block '>
                  File A Complaint
                </button>
              </div>
            </div>
            <br />
            <label htmlFor='company'>
              Were you an American Tax Solutions (Or other listed subsidary)
              Client?
            </label>
            <select
              name='client'
              id='client'
              onChange={(e) => setClient(e.target.value)}>
              <option value=''></option>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
            <label htmlFor='paid'>If So How Much Money Did You Pay Them?</label>
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
  );
};
export default SSI;
