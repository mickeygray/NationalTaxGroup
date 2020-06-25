import React, { useContext, useState } from "react";
import EmailContext from "../../../context/email/emailContext";

const CampaignSearch = () => {
  const emailContext = useContext(EmailContext);

  const { searchCampaigns } = emailContext;

  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    searchCampaigns(text);
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Campaigns...'
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

export default CampaignSearch;
