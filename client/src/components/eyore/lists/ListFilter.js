import React, { useState, useContext, Fragment, useEffect } from "react";
import LeadContext from "../../../context/lead/leadContext";
import StatContext from "../../../context/stat/statContext";
const ListFilter = () => {
  const leadContext = useContext(LeadContext);
  const statContext = useContext(StatContext);
  const { parseDb, mailList, deleteLeads } = leadContext;
  const { getFilterSelected, getListLength, getIdArray } = statContext;
  const onSubmit = (e) => {
    deleteLeads(mailList);
  };

  const [query, setQuery] = useState({
    status: "",
    fileType: "",
    amount: {},
  });

  const onClick = (e) => {
    parseDb(query);
    getFilterSelected(query);
  };

  useEffect(() => {
    if (mailList != null) {
      getListLength(mailList);
      getIdArray(mailList);
    }
  }, [mailList]);

  const clearQuery = () => {
    setQuery("");
    getFilterSelected(query);
  };
  return (
    <Fragment>
      <h3>Filter the Mail List</h3>
      <nav className='nav navbar'>
        {" "}
        <ul>
          <li>
            {" "}
            <button className='btn btn-sm btn-success p-2 ' onClick={onClick}>
              Load List
            </button>{" "}
          </li>
          <li>
            {" "}
            <button
              className='btn btn-sm btn-light p-2'
              onClick={() => clearQuery()}>
              Clear Filter
            </button>
          </li>
          <li>
            {" "}
            <button
              className='btn btn-sm btn-danger py-2'
              onClick={() =>
                setQuery({
                  status: "dnc",
                })
              }>
              Pull DNCS
            </button>{" "}
          </li>
          <li>
            {" "}
            <button className='btn btn-sm btn-danger py-2' onClick={onSubmit}>
              Delete DNCS
            </button>
          </li>
        </ul>
      </nav>
      <div className='grid-4 card bg-light all-center'>
        <div>
          <ul>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "new",
                  })
                }>
                New Emails
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "lexis",
                  })
                }>
                Enriched Emails
              </button>
            </li>
            <li className='py-1'>
              <button
                style={{ width: "110px" }}
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "form",
                  })
                }>
                Form <br /> Emails
              </button>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "lead",
                  })
                }>
                Leads
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "lead",
                    fileType: "State Tax Lien",
                  })
                }>
                State Tax Leads
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "lead",
                    fileType: "Federal Tax Lien",
                  })
                }>
                Federal Tax Leads
              </button>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "prospect",
                  })
                }>
                Prospects
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "prospect",
                    amount: { "$gte": 25000 },
                  })
                }>
                Above $25000
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "prospect",
                    amount: { "$lt": 25000 },
                  })
                }>
                Under $25000
              </button>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "client",
                  })
                }>
                Clients
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "upsellable",
                  })
                }>
                Upsellable Clients
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "highdollar",
                  })
                }>
                Highdollar Clients
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default ListFilter;
