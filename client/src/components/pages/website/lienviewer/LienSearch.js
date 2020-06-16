import React, { useContext, useState } from "react";
import LeadContext from "../../../../context/lead/leadContext";

const LienSearch = () => {
  const leadContext = useContext(LeadContext);

  const { getLead } = leadContext;

  const [field, setField] = useState({
    email: "",
    pinCode: "",
  });

  const onChange = (e) => {
    setField({
      ...field,
      [e.target.name]: e.target.value,
    });
  };

  const { pinCode, email } = field;

  const lead = { pinCode, email };

  const clearLead = () => {
    setField({
      email: "",
      pinCode: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getLead(lead);
    clearLead();
  };

  console.log(lead);

  return (
    <div className='all-center'>
      <form onSubmit={onSubmit} className='form'>
        <br />
        <br />
        <h5 className='all-center'>
          Please provide your pin number and a valid email address and we will
          send you a downloadable version of your lien
        </h5>
        <input
          style={{ width: "300px", margin: "auto" }}
          type='text'
          name='pinCode'
          placeholder='Enter Your Pincode... '
          value={pinCode}
          onChange={onChange}
        />
        <input
          style={{ width: "300px", margin: "auto" }}
          type='text'
          name='email'
          placeholder='Enter Your email... '
          value={email}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
    </div>
  );
};

export default LienSearch;
