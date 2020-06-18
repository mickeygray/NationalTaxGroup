import React, { Fragment, useContext, useState, useEffect } from "react";
import LeadContext from "../../../../context/lead/leadContext";

const ContactForm = () => {
  const leadContext = useContext(LeadContext);

  const { submitLead } = leadContext;

  const onClick = (e) => {
    submitLead(form);
    clearAll();
  };

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    st: "",
    paid: "",
    status: "new",
  });

  const clearAll = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      st: "",
      paid: "",
      status: "new",
    });
  };
  useEffect(() => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      st: "",
      paid: "",
      status: "new",
    });
  }, []);

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const { name, city, st, paid, phone, email } = form;
  return (
    <Fragment>
      <div className='container all center'>
        <form className='card bg-primary'>
          <h5>
            {" "}
            Contact Us Free Consultation! No out of pocket costs. Our fee is
            earned when we are successful getting you your money back. No refund
            for you? No fee for us.
          </h5>
          <div className='grid-2'>
            <div>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
              />
              <input
                type='text'
                name='email'
                value={email}
                onChange={onChange}
                placeholder='Email'
              />
              <input
                type='text'
                name='phone'
                value={phone}
                onChange={onChange}
                placeholder='Phone'
              />
            </div>
            <div>
              <input
                type='text'
                name='city'
                value={paid}
                onChange={onChange}
                placeholder='Amount Paid To Other Company'
              />
              <input
                type='text'
                name='city'
                value={city}
                onChange={onChange}
                placeholder='City'
              />
              <input
                type='text'
                name='state'
                value={st}
                onChange={onChange}
                placeholder='State'
              />
            </div>
          </div>

          <button
            className='btn btn-block btn-success'
            type='submit'
            onClick={onClick}>
            Contact us
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ContactForm;
