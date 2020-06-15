import React, { useContext, useState, useEffect } from "react";
import LeadContext from "../../../../../context/lead/leadContext";

const SmallForm = () => {
  const leadContext = useContext(LeadContext);

  const { submitLead } = leadContext;

  const onClick = (e) => {
    submitLead(form);
    clearAll();
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    setForm({
      name: "",
      email: "",
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const clearAll = () => {
    setForm({
      name: "",
      email: "",
    });
  };

  const { name, email } = form;

  return (
    <div style={{ width: "100vw" }}>
      <form className='navbar' onSubmit={onSubmit}>
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
        <button
          onClick={onClick}
          className='btn btn-success btn-sm'
          style={{ width: "25%", borderRadius: "5px" }}>
          Schedule Your Appointment
        </button>
      </form>
    </div>
  );
};

export default SmallForm;
