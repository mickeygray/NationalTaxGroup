import React, { useContext, useRef, useEffect, useState } from "react";
import StatContext from "../../context/stat/statContext";
import { DateRangePicker, Calendar } from "react-date-range";
import PaymentProcessing from "./PaymentProcessing";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const PaymentProcessingSearch = () => {
  const statContext = useContext(StatContext);
  const text = useRef("");

  const {
    filterPayments,
    clearFilter,
    filtered,
    searchPaymentDates,
  } = statContext;
  const today = new Date(Date.now());

  console.log(today);

  let formattedToday = Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(today);

  const date1 = useRef(formattedToday);
  const date2 = useRef(formattedToday);

  useEffect(() => {
    if (filtered === null && searchState === true) {
      text.current.value = "";
    }
  });

  const [searchState, setSearchState] = useState(true);

  const onChange2 = (e) => {
    setSearchState((prevState) => !prevState);
  };

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterPayments(e.target.value);
    } else {
      clearFilter();
    }
  };

  const handleSelect = (ranges) => {
    searchPaymentDates(ranges);
  };

  const selectionRange = {
    startDate: today,
    endDate: today,
    key: "selection",
  };
  console.log();

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
        <div>
          <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
        </div>
      )}
    </form>
  );
};

export default PaymentProcessingSearch;
