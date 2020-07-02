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
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    status: "new",
  });

  const clearAll = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      status: "new",
    });
  };
  useEffect(() => {
    setForm({
      name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      status: "new",
    });
  }, []);

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const { name, city, state, phone, email } = form;
  return (
    <Fragment>
      <div className='container all center'>
        <form className='card bg-primary' style={{ width: "30rem" }}>
          <h5>1-800-459-7124</h5>
          <h5>
            <span className='lead text-danger'>A</span>sk us anything or just
            leave your name and number..
          </h5>
          Name
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
            style={{ width: "33%", borderRadius: "5px" }}
          />
          <input
            type='text'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Email'
            style={{ width: "33%", borderRadius: "5px" }}
          />
          <input
            type='text'
            name='phone'
            value={phone}
            onChange={onChange}
            placeholder='Phone'
            style={{ width: "33%", borderRadius: "5px" }}
          />
          <input
            type='text'
            name='city'
            value={city}
            onChange={onChange}
            placeholder='City'
            style={{ width: "33%", borderRadius: "5px" }}
          />
          <input
            type='text'
            name='state'
            value={state}
            onChange={onChange}
            placeholder='State'
            style={{ width: "33%", borderRadius: "5px" }}
          />
          <button
            className='btn btn-sm btn-light'
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
