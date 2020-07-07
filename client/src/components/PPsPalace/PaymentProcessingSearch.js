import React, { useContext, useRef, useEffect, useState } from "react";
import StatContext from "../../context/stat/statContext";
import PaymentProcessing from "./PaymentProcessing";

const PaymentProcessingSearch = () => {
  const statContext = useContext(StatContext);
  const text = useRef("");

  const { filterPayments, clearFilter, filtered } = statContext;

  useEffect(() => {
    if (filtered === null && searchState === true) {
      text.current.value = "";
    }
  });

  const [searchState, setSearchState] = useState(true);

  const onChange2 = (e) => {
    setSearchState((prevState) => !prevState);
  };

  const [period, setPeriod] = useState({
    periodStart: Date.now(),
    periodEnd: Date.now(),
  });

  const { periodStart, periodEnd } = period;
  const onChange = (e) => {
    if (text.current.value !== "") {
      filterPayments(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <select
        name='searchState'
        id='searchState'
        value={searchState}
        onChange={onChange2}>
        <option
          value='true'
          checked={searchState === true}
          onChange={onChange2}>
          Search Payment Type / Status / Amount
        </option>
        <option
          onChange={onChange2}
          value='false'
          checked={searchState === false}>
          Search Date Range
        </option>
      </select>
      {searchState ? (
        <div>
          <input
            ref={text}
            type='text'
            placeholder='Filter payments...'
            onChange={onChange}
          />
        </div>
      ) : (
        <div className='grid-2'>
          {" "}
          <div className=''>
            {" "}
            <input
              ref={text}
              type='date'
              name='periodStart'
              value={periodStart}
              onChange={onChange}
            />{" "}
          </div>
          <div className=''>
            {" "}
            <input
              ref={text}
              type='date'
              name='periodEnd'
              value={periodEnd}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default PaymentProcessingSearch;
