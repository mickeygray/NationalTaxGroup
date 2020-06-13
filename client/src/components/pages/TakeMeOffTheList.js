import React, { useContext, useEffect, useState, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";

const TakeMeOffTheList = () => {
  const leadContext = useContext(LeadContext);

  const { makeDNC } = leadContext;

  const [field, setField] = useState({
    fullName: "",
    address: "",
    email: "",
    lexId: "",
  });

  const onChange = (e) => {
    setField({
      ...field,
      [e.target.name]: e.target.value,
    });
  };

  const { fullName, address, lexId, email } = field;

  const lead = { fullName, address, lexId, email };

  const clearLead = () => {
    setField({
      fullName: "",
      address: "",
      email: "",
      lexId: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    makeDNC(lead);
    clearLead();
  };

  return (
    <Fragment>
      <h3 className='all-center lead text-dager'>
        Please enter all information as it appears in the email or letter you
        received and we will remove you from our database for future contacts.
        We appologize for any inconvenience, thanks!
      </h3>

      <div className='card'>
        <p className='text-center'>
          Please Note that to complete this request we only need one (1) of the
          following:
        </p>
        <ul className='all-center'>
          <li>Name and Address Exactly As Printed</li>
          <li>The Exact Address You Received an Email at</li>
          <li>The pincode that is provided in any document</li>
        </ul>
      </div>
      <p className='text-center'>
        We Appreciate Your Cooperation and Again Appologize For The
        inconvenience
      </p>
      <form className='card form' onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={fullName}
          onChange={onChange}
        />

        <input
          type='text'
          placeholder='Address'
          name='address'
          value={address}
          onChange={onChange}
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={onChange}
        />

        <input
          type='text'
          placeholder='Pin Code'
          name='lexId'
          value={lexId}
          onChange={onChange}
        />

        <button className='btn btn-block btn-danger' onSubmit={onSubmit}>
          Take Me Off The List
        </button>
      </form>
    </Fragment>
  );
};

export default TakeMeOffTheList;
