import React, { useState, useContext, useEffect, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";

const ListFilter = () => {
  const leadContext = useContext(LeadContext);

  const { parseDb, mailList, setList, deleteLeads, leads } = leadContext;

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
  });

  const onClick = (e) => {
    parseDb(listConditions);
    setList(mailList);
  };

  const onSubmit = (e) => {
    deleteLeads(leads);
  };

  return (
    <Fragment>
      <div className='card grid-4'>
        <div>
          <ul>
            <li className='py-1'>
              {" "}
              <button
                className='btn btn-sm btn-danger'
                onClick={() =>
                  setListConditions({
                    isDNC: true,
                  })
                }>
                Pull DNCS
              </button>
            </li>
            <li className='py-1'>
              {" "}
              <button
                className='btn btn-sm btn-danger'
                onClick={() =>
                  setListConditions({
                    isContacted: false,
                  })
                }>
                Non Contacted
              </button>
            </li>
            <li className='py-1'>
              {" "}
              <button
                className='btn btn-sm btn-danger'
                onClick={() =>
                  setListConditions({
                    isContacted: true,
                    isClient: false,
                  })
                }>
                All Leads
              </button>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className='py-1'>
              {" "}
              <button
                className='btn btn-sm btn-danger'
                onClick={() =>
                  setListConditions({
                    isContacted: true,
                    isClient: false,
                    isFederal: true,
                  })
                }>
                Federal Leads
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger'
                onClick={() =>
                  setListConditions({
                    isContacted: true,
                    isClient: false,
                    isFederal: true,
                    isBelow25000: true,
                  })
                }>
                Federal $10000
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger'
                onClick={() =>
                  setListConditions({
                    isContacted: true,
                    isClient: false,
                    isFederal: true,
                    isAbove25000: true,
                  })
                }>
                Federal $25000
              </button>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            {" "}
            <li className='py-1'>
              {" "}
              <button
                className='btn btn-sm btn-danger'
                onClick={() =>
                  setListConditions({
                    isContacted: true,
                    isClient: false,
                    isState: true,
                  })
                }>
                State Leads
              </button>
            </li>
            <li className='py-1'>
              {" "}
              <button
                className='btn btn-sm btn-danger'
                onClick={() =>
                  setListConditions({
                    isContacted: true,
                    isClient: false,
                    isState: true,
                    isBelow25000: true,
                  })
                }>
                State $5000
              </button>
            </li>
            <li className='py-1'>
              {" "}
              <button
                className='btn btn-sm btn-danger'
                onClick={() =>
                  setListConditions({
                    isContacted: true,
                    isClient: false,
                    isState: true,
                    isAbove25000: true,
                  })
                }>
                State $25000
              </button>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li className='py-1'>
              {" "}
              <button
                className='btn btn-sm btn-danger'
                onClick={() =>
                  setListConditions({
                    isClient: true,
                  })
                }>
                All Clients
              </button>
            </li>
            <li className='py-1'>
              {" "}
              <button
                className='btn btn-sm btn-danger'
                onClick={() =>
                  setListConditions({
                    isClient: true,
                    isUpsellable: true,
                  })
                }>
                All Upsellable Clients
              </button>
            </li>
            <li className='py-1'>
              <button
                className='btn btn-sm btn-danger'
                onClick={() =>
                  setListConditions({
                    isClient: true,
                    isUpsellable: true,
                    isHighDollar: true,
                  })
                }>
                All High Dollar Clients
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className='grid-3'>
        <button className='btn btn-block btn-danger' onClick={onSubmit}>
          Delete List
        </button>
        <button className='btn btn-block btn-danger' onClick={onClick}>
          Load List
        </button>
      </div>
    </Fragment>
  );
};

export default ListFilter;
