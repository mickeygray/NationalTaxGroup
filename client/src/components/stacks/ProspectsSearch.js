import React, { useContext, useState } from "react";
import LeadContext from "../../context/lead/leadContext";
import AlertContext from "../../context/alert/alertContext";
import UserContext from "../../context/user/userContext";

const ProspectsSearch = () => {
  const leadContext = useContext(LeadContext);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  const { user } = userContext;

  console.log(user);
  const { getProspects } = leadContext;

  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      alertContext.setAlert("Please enter something", "light");
    } else {
      setText("");
    }
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div className='container'>
      <form onSubmit={onSubmit} className='grid-5'>
        <div className='card'>
          <h5 className='text-danger'> Name, Address, Pin Code, SSN </h5>
          <input
            type='text'
            name='text'
            placeholder='Search...'
            value={text}
            onChange={onChange}
          />
          <br />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-sm'
            onClick={() => getProspects(text)}
          />
        </div>
      </form>
    </div>
  );
};

export default ProspectsSearch;
