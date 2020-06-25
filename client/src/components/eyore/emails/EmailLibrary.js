import React, { useEffect, useContext, useState, Fragment } from "react";
import EmailContext from "../../../context/email/emailContext";
import EmailItem from "./EmailItem";
import LibrarySearch from "./LibrarySearch";
const EmailLibrary = () => {
  const emailContext = useContext(EmailContext);

  const { searchEmails, emailLibrary } = emailContext;

  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch("visible");
  }, [searchEmails]);

  const clearAll = () => {
    setSearch("");
  };
  return (
    <Fragment>
      <div className='card'>
        <LibrarySearch />
        <button
          type='submit'
          value='clear'
          onClick={() => clearAll()}
          className='btn btn-light btn-block'>
          {" "}
          Clear Search
        </button>
      </div>
      {search === "visible"
        ? emailLibrary.map((email) => (
            <EmailItem key={email.key} email={email} />
          ))
        : ""}
    </Fragment>
  );
};

export default EmailLibrary;
