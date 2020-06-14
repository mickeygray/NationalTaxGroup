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

  return (
    <Fragment>
      <div className='card grid-4'>
        <div>
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setQuery({
                status: "dnc",
              })
            }>
            Pull DNCS
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setQuery({
                status: "new",
              })
            }>
            Non Contacted
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setQuery({
                status: "optedin",
              })
            }>
            All Leads
          </button>
        </div>
        <div>
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setQuery({
                status: "optedin",
                type: "Federal Tax Lien",
              })
            }>
            Federal Leads
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setQuery({
                status: "optedin",
                type: "Federal Tax Lien",
                amount: { "$lte": 25000 },
              })
            }>
            Federal Tax Less Than 25000
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setQuery({
                status: "optedin",
                type: "Federal Tax Lien",
                amount: { "$gte": 25000 },
              })
            }>
            Federal Tax More than 25000
          </button>
        </div>
        <div>
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setQuery({
                status: "optedin",
                type: "State Tax Lien",
              })
            }>
            State Tax
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setQuery({
                status: "optedin",
                type: "State Tax Lien",
                amount: { "$lte": 25000 },
              })
            }>
            State Tax Below 25000
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setLeadStatus("optedin") &&
              setQuery({
                status: "optedin",
                type: "State Tax Lien",
                amount: { "$gte": 25000 },
              })
            }>
            State Tax Above 25000
          </button>
        </div>
        <div>
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setQuery({
                status: "converted",
              })
            }>
            All Clients
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setQuery({
                status: "upsellable",
              })
            }>
            All Upsellable Clients
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setQuery({
                status: "highdollar",
              })
            }>
            All High Dollar Clients
          </button>
        </div>
      </div>
      <div className='grid-2'>
        <button className='btn btn-block btn-danger' onClick={onSubmit}>
          Delete DNCS
        </button>
        <button className='btn btn-block btn-success' onClick={onClick}>
          Load List
        </button>
      </div>
    </Fragment>
  );
};

export default ListFilter;
