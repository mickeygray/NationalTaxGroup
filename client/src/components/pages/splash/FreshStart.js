import React, { Fragment, useState, useEffect, useContext } from "react";
import hero from "../../../images/hero.png";
import LeadContext from "../../../context/lead/leadContext";
import Footer from "../website/layout/Footer";
import StickyNavbar from "../../layout/StickyNavbar";
const FreshStart = () => {
  const leadContext = useContext(LeadContext);

  const { submitLead } = leadContext;

  useEffect(() => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      amount: "",
      years: "",
      employed: "",
      income: "",
      creditscore: "",
      status: "form",
    });
  }, []);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    debt: "",
    years: "",
    employed: "",
    income: "",
    status: "form",
  });

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const { fullName, email, phone, amount, years, employed, income } = form;

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
                src={hero}
                alt=''
                style={{ zIndex: "-1", height: "120vh", opacity: "22%" }}
              />
            </p>
          </div>
          <div className='homecopy'>
            <div className='container grid-2 py-3 mx-3'>
              <div className='card'>
                <h2 className='text-danger lead'>
                  Your Prequalification Questionaire
                </h2>
                <i>Please note the following information before submiting</i>

                <ul>
                  <li>
                    You must be a resident of the United States or have a valid
                    TIN
                  </li>
                  <li>
                    You must owe more than 10,000 dollars as of your last known
                    assessment
                  </li>
                  <li>
                    You must provide accurate financial statements to be
                    inspected and processed by the Internal Revenue Service
                  </li>
                </ul>
                <h5>
                  If these are all true, please fill out the form to the right
                  and we will instantly estimate a possible savings for you.
                  Give us a call 1-800-459-7124
                </h5>
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
                  <input
                    type='text'
                    name='amount'
                    placeholder='Amount Owed...'
                    onChange={onChange}
                    value={amount}
                  />
                  <input
                    type='text'
                    placeholder='Tax Years UnFiled'
                    name='years'
                    onChange={onChange}
                    value={years}
                  />
                  <input
                    type='text'
                    placeholder='Last Years Income'
                    name='income'
                    onChange={onChange}
                    value={income}
                  />
                  <input
                    type='radio'
                    name='employed'
                    value='false'
                    checked={employed === "false"}
                    onChange={onChange}
                  />{" "}
                  Unemployed{" "}
                  <input
                    type='radio'
                    name='employed'
                    value='true'
                    onChange={onChange}
                    checked={employed === "true"}
                  />{" "}
                  Employed
                  <button
                    onClick={onClick}
                    className='btn btn-primary btn-block'
                    style={{ height: "50px" }}>
                    Do I qualify
                  </button>
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

export default FreshStart;
