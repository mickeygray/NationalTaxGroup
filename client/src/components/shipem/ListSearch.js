import React, { useContext, useState } from "react";
import LeadContext from "../../context/lead/leadContext";

const ListSearch = () => {
  const leadContext = useContext(LeadContext);

  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      console.log("Please enter something", "light");
    } else {
      leadContext.searchLeads(text);

      setText("");
    }
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search...'
          value={text}
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

export default ListSearch;
