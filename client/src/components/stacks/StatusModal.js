import React, { useState, useEffect, useContext } from "react";
import LeadContext from "../../context/lead/leadContext";
const StatusModal = (props) => {
  const { prosp, toggleProsp } = props;

  const { setFilters } = useContext(LeadContext);
  const onClick = (e) => {
    let array = [];

    array.push(e.target.name);
    setFilters(array);
  };
  return (
    <div>
      <ul>
        <li>
          {" "}
          <label htmlFor='filedFederal'>Prospect</label>
          <input
            name='isProspect'
            type='checkbox'
            checked={prosp.isProspect}
            onChange={toggleProsp}
            onClick={onClick}
          />
        </li>

        <li>
          {" "}
          <label htmlFor='filedFederal'>Client</label>
          <input
            name='isClient'
            type='checkbox'
            onChange={toggleProsp}
            checked={prosp.isClient}
            onClick={onClick}
          />
        </li>

        <li>
          {" "}
          <label htmlFor='filedFederal'>Upsellable</label>
          <input
            name='isUpsellable'
            type='checkbox'
            onChange={toggleProsp}
            checked={prosp.isUpsellable}
            onClick={onClick}
          />
        </li>
        <li>
          {" "}
          <label htmlFor='filedFederal'>Highdollar</label>
          <input
            name='isHighdollar'
            type='checkbox'
            onChange={toggleProsp}
            checked={prosp.isHighDollar}
            onClick={onClick}
          />
        </li>
        <li>
          {" "}
          <label htmlFor='filedFederal'>Redline</label>
          <input
            name='isRedLine'
            type='checkbox'
            onChange={toggleProsp}
            checked={prosp.isRedLine}
            onClick={onClick}
          />
        </li>
        <li>
          {" "}
          <label htmlFor='filedFederal'>Refund</label>
          <input
            name='isRefunded'
            type='checkbox'
            onChange={toggleProsp}
            checked={prosp.isRefunded}
            onClick={onClick}
          />
        </li>
      </ul>
    </div>
  );
};

export default StatusModal;
