import React, {
  Fragment,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import Navbar from "../../layout/Navbar";
import ProspectsSearch from "../../stacks/ProspectsSearch";
import Prospects from "../../stacks/Prospects";
import TodaysProspects from "../../stacks/TodaysProspects";
import StatContext from "../../../context/stat/statContext";
import LeadContext from "../../../context/lead/leadContext";
import FieldSelect from "../../stacks/FieldSelect";

const Stacks = () => {
  const statContext = useContext(StatContext);
  const leadContext = useContext(LeadContext);

  const {
    filterPayments,
    clearFilter,
    filtered,
    searchPaymentDates,
  } = statContext;

  useEffect(() => {
    setProsp({
      listOriginators: false,
      listLoanProcessors: false,
      listDocumentProcessors: false,
      listUpsells: false,
      listFederalReso: false,
      listTaxPreparers: false,
      listStateReso: false,
      listStatus: false,
      hasRepresentation: false,
      hasFederalFile: false,
      hasStateFile: false,
      hasHardship: false,
      hasPaymentPlan: false,
      hasOffer: false,
      hasAppeal: false,
      hasCorp: false,
      hasAnnuity: false,
      showCreateDate: false,
      showName2: false,
      showAddress2: false,
      showCity2: false,
      showState2: false,
      showZip2: false,
      showEmployerTime: false,
      showSsn2: false,
      showLexId: false,
      showRelation: false,
      showPhone2: false,
      showPhone3: false,
      showBankruptcyType: false,
      showHomeLoan: false,
      showAge: false,
      showEmail2: false,
      showEmail3: false,
      showProblem1: false,
      showProblem2: false,
      showProblem3: false,
      showResSold: false,
      showResSold2: false,
      showHome: false,
      showHomePay: false,
      showWages: false,
      showIncome1Type: false,
      showIncome1Value: false,
      showIncome2Type: false,
      showIncome2Value: false,
      showIncome3Type: false,
      showIncome3Value: false,
      showOtherIncomeType: false,
      showOtherIncomeValue: false,
      showAvailableCredit: false,
      showTotalCredit: false,
      showEmployerName: false,
      showEmployerPhone: false,
      showFullName: true,
      showAmount: true,
      showPlaintiff: false,
      showPhone: true,
      showPinCode: true,
      showStatus: true,
      showCompliant: false,
      showFilingStatus: false,
      showCpa: false,
      showCreditScore: false,
      showSsn: false,
      showGross: false,
      showQuote: false,
      showInitial: false,
      showTotal: false,
      showPayments: false,
      showPercent: false,
      showRedline: false,
      showRefund: false,
      showInitialPaymentDate: false,
      showLastPaymentDate: false,
      showBalance: false,
      showLoan: false,
    });
  }, []);

  const [prosp, setProsp] = useState({
    listOriginators: false,
    listLoanProcessors: false,
    listDocumentProcessors: false,
    listUpsells: false,
    listFederalReso: false,
    listTaxPreparers: false,
    listStateReso: false,
    listStatus: false,
    hasRepresentation: false,
    hasFederalFile: false,
    hasStateFile: false,
    hasHardship: false,
    hasPaymentPlan: false,
    hasOffer: false,
    hasAppeal: false,
    hasCorp: false,
    hasAnnuity: false,
    showCreateDate: false,
    showName2: false,
    showAddress2: false,
    showCity2: false,
    showCreditScore: false,
    showState2: false,
    showZip2: false,
    showEmployerTime: false,
    showSsn2: false,
    showLexId: false,
    showRelation: false,
    showPhone2: false,
    showPhone3: false,
    showBankruptcyType: false,
    showHomeLoan: false,
    showAge: false,
    showEmail2: false,
    showEmail3: false,
    showProblem1: false,
    showProblem2: false,
    showProblem3: false,
    showResSold: false,
    showResSold2: false,
    showHome: false,
    showHomePay: false,
    showWages: false,
    showIncome1Type: false,
    showIncome1Value: false,
    showIncome2Type: false,
    showIncome2Value: false,
    showIncome3Type: false,
    showIncome3Value: false,
    showOtherIncomeType: false,
    showOtherIncomeValue: false,
    showAvailableCredit: false,
    showTotalCredit: false,
    showEmployerName: false,
    showEmployerPhone: false,
    showFullName: true,
    showAmount: true,
    showPlaintiff: false,
    showPhone: true,
    showPinCode: true,
    showStatus: true,
    showEmail: false,
    showCompliant: false,
    showFilingStatus: false,
    showCpa: false,
    showSsn: false,
    showGross: false,
    showQuote: false,
    showInitial: false,
    showTotal: false,
    showPayments: false,
    showPercent: false,
    showRedline: false,
    showRefund: false,
    showInitialPaymentDate: false,
    showLastPaymentDate: false,
    showBalance: false,
    showLoan: false,
  });

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
          Search Prospects / Clients
        </option>
        <option
          onChange={onChange2}
          value='false'
          checked={searchState === false}>
          View Todays Prospects / Clients
        </option>
      </select>
      <div className='grid-2b'>
        <div>
          <FieldSelect prosp={prosp} setProsp={setProsp} />
        </div>
        {searchState ? (
          <div className='card'>
            <h3 className='text-danger'>Stacks!</h3>
            <ProspectsSearch />
            <Prospects prosp={prosp} />
          </div>
        ) : (
          <div className='card' style={{ height: "100%" }}>
            <h3 className='text-danger'>Racks! - {formattedToday}</h3>

            <TodaysProspects />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Stacks;
