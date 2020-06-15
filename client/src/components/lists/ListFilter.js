import React, { useState, useContext, useEffect, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";

const ListFilter = () => {
  const leadContext = useContext(LeadContext);

  const { parseDb, mailList, deleteLeads, setMailList } = leadContext;

  const onSubmit = (e) => {
    deleteLeads(mailList);
  };

  const leadStatus = new Map([
    ["contacted", "contacted"],
    ["new", "new"],
    ["dnc", "dnc"],
    ["optedin", "optedin"],
    ["converted", "converted"],
    ["upsellable", "upsellable"],
    ["highdollar", "highdollar"],
  ]);

  const setLeadStatus = (leadStatus) => {
    setQuery({
      status: leadStatus,
    });
  };

  const [query, setQuery] = useState({
    status: "",
    type: "",
    amount: {},
  });

  const onClick = (e) => {
    parseDb(query);
  };

  console.log(query);

  return (
    <Fragment>
      <h3>Filter the Mail List</h3>
      <div className='card grid-2'>
        <div>
          <ul>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "dnc",
                  })
                }>
                Pull DNCS
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "new",
                  })
                }>
                Non Contacted
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "contacted",
                  })
                }>
                All Contacted Leads
              </button>
            </li>
            <li className='py-1'>
              <button className='btn btn-sm btn-danger py-2' onClick={onSubmit}>
                Delete DNCS
              </button>
            </li>
            <li className='py-1'>
              <button className='btn btn-sm btn-success' onClick={onClick}>
                Load List
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
                    status: "optedin",
                    type: "Federal Tax Lien",
                  })
                }>
                Federal Leads
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "optedin",
                    type: "State Tax Lien",
                  })
                }>
                State Tax
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger py-2'
                onClick={() =>
                  setQuery({
                    status: "converted",
                  })
                }>
                All Clients
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
                All Upsellable Clients
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
                All High Dollar Clients
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default ListFilter;
