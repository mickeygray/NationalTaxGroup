import React, { useState, useEffect, useContext } from "react";
import LeadContext from "../../context/lead/leadContext";
const StatusModal = (props) => {
  const { prosp, toggleProsp } = props;

  const { setFilters } = useContext(LeadContext);

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
          />
        </li>
      </ul>
    </div>
  );
};

export default StatusModal;
