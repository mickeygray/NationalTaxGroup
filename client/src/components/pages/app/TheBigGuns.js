import React, {
  Fragment,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import Navbar from "../../layout/Navbar";
import StatContext from "../../../context/stat/statContext";
import Today from "../../thebigguns/Today";
import Period from "../../thebigguns/Period";

const TheBigGuns = () => {
  const statContext = useContext(StatContext);

  const {
    getTodaysProspects,
    getTodaysLeads,
    getTodaysCalls,
    getTodaysPayments,
    getTodaysCosts,
    today,
    getPeriodCosts,
    getPeriodProspects,
    getPeriodLeads,
    getPeriodCalls,
    getPeriodPayments,
    periodPaymentSummary,
  } = statContext;

  useEffect(() => {
    getTodaysProspects();
    getTodaysLeads();
    getTodaysCalls();
    getTodaysPayments();
    getTodaysCosts();
    getPeriodCosts();

    getPeriodProspects();
    getPeriodLeads();
    getPeriodCalls();
    getPeriodPayments();
  }, []);

  console.log(today);
  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>
      <div className='grid-2'>
        <div>
          <Today today={today} />
        </div>

        <div>
          <Period periodPaymentSummary={periodPaymentSummary} />
        </div>
      </div>
    </Fragment>
  );
};

export default TheBigGuns;
