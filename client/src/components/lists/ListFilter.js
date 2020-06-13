import React, { useState, useContext, useEffect, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";

const ListFilter = () => {
  const leadContext = useContext(LeadContext);

  const { parseDb, mailList, deleteLeads, setMailList } = leadContext;

  let [listConditions, setListConditions] = useState({
    isDNC: false,
    isContacted: false,
    isClient: false,
    isFederal: false,
    isState: false,
    isAbove25000: false,
    isBelow25000: false,
    isUpsellable: false,
    isHighDollar: false,
    isOptedIn: false,
  });

  const [list, setList] = useState([]);

  const onClick = (e) => {
    parseDb(listConditions);
  };

  const onSubmit = (e) => {
    deleteLeads(mailList);
  };

  return (
    <Fragment>
      <div className='card grid-4'>
        <div>
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setListConditions({
                isDNC: true,
              })
            }>
            Pull DNCS
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setListConditions({
                isContacted: false,
              })
            }>
            Non Contacted
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setListConditions({
                isClient: false,
              })
            }>
            All Leads
          </button>
        </div>
        <div>
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setListConditions({
                isFederal: true,
              })
            }>
            Federal Leads
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setListConditions({
                isState: true,
              })
            }>
            State Leads
          </button>
          <br />
          <br />
          <button className='btn btn-sm btn-danger'>White Hat</button>
        </div>
        <div>
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setListConditions({
                isBelow25000: true,
              })
            }>
            Less Than $25000 in Debt
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setListConditions({
                isAbove25000: true,
              })
            }>
            $25000 or More In Debt
          </button>
          <br />
          <br />
          <button className='btn btn-sm btn-danger'>Black Hat</button>
        </div>
        <div>
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setListConditions({
                isClient: true,
              })
            }>
            All Clients
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setListConditions({
                isUpsellable: true,
              })
            }>
            All Upsellable Clients
          </button>
          <br />
          <br />
          <button
            className='btn btn-sm btn-danger'
            onClick={() =>
              setListConditions({
                isHighDollar: true,
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
