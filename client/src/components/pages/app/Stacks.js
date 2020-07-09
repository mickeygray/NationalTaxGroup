import React, { Fragment, useContext, useState } from "react";
import Navbar from "../../layout/Navbar";
import ProspectsSearch from "../../stacks/ProspectsSearch";
import Prospects from "../../stacks/Prospects";
import TodaysProspects from "../../stacks/TodaysProspects";
import StatContext from "../../../context/stat/statContext";

const Stacks = () => {
  const statContext = useContext(StatContext);

  const {
    filterPayments,
    clearFilter,
    filtered,
    searchPaymentDates,
  } = statContext;
  const today = new Date(Date.now());

  console.log(today);

  let formattedToday = Intl.DateTimeFormat(
    "en-US",
    { timeZone: "America/Los_Angeles" },
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  ).format(today);

  const [searchState, setSearchState] = useState(true);

  const onChange2 = (e) => {
    setSearchState((prevState) => !prevState);
  };

  console.log();

  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>
      <select
        name='searchState'
        id='searchState'
        value={searchState}
        onChange={onChange2}>
        <option
          value='true'
          checked={searchState === true}
          onChange={onChange2}>
          Search Prospects / Clients / Leads / Calls
        </option>
        <option
          onChange={onChange2}
          value='false'
          checked={searchState === false}>
          View Todays Prospects / Clients / Leads / Calls
        </option>
      </select>
      <div className='container'>
        {searchState ? (
          <div className='card'>
            <h3 className='text-danger'>Stacks!</h3>
            <ProspectsSearch />
            <Prospects />
          </div>
        ) : (
          <div className='card'>
            <h3 className='text-danger'>Racks! - {formattedToday}</h3>

            <TodaysProspects />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Stacks;
