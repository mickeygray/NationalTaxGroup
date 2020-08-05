import React, { useState, useEffect, useCallback, useContext } from "react";
import UserContext from "../../context/user/userContext";
import LeadContext from "../../context/lead/leadContext";
import StatusModal from "./StatusModal";
import FederalResoModal from "./FederalResoModal";
import StateResoModal from "./StateResoModal";
import OriginatorsModal from "./OriginatorsModal";
import DocumentProcessorsModal from "./DocumentProcessorsModal";
import UpsellsModal from "./UpsellsModal";
import TaxPrepModal from "./TaxPrepModal";
import LoanProcessorsModal from "./LoanProcessorsModal";

const FieldSelect = (props) => {
  const { prosp, toggleProsp } = props;

  const { getUserReminded, users } = useContext(UserContext);

  const { workers, setFilters } = useContext(LeadContext);

  useEffect(() => {
    let query = "";
    getUserReminded(query);
  }, []);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (prosp.listOriginators) {
      setModal(true);
    } else if (prosp.listLoanProcessors) {
      setModal(true);
    } else if (prosp.listDocumentProcessors) {
      setModal(true);
    } else if (prosp.listTaxPreparers) {
      setModal(true);
    } else if (prosp.listFederalReso) {
      setModal(true);
    } else if (prosp.listUpsells) {
      setModal(true);
    } else if (prosp.listStateReso) {
      setModal(true);
    }
  }, [modal, prosp]);

  const toggleModal = useCallback(() => {
    setModal(false);
  });

  /*
        {prospects !== []
          ?''
          : ""}



*/
  const cases = Object.keys(prosp).filter((k) => prosp[k]);
  const onClick = (e) => {
    if (e.target.checked === true) {
      const filter = e.target.name;
      setFilters(filter);
    } else {
      const filter = "pop" + e.target.name;
      setFilters(filter);
    }
  };
  return (
    <div className='sidebar'>
      <ul className='m-1'>
        <h3>List Groupings</h3>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            View Originators
          </label>
          <input
            name='listOriginators'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        {prosp.listOriginators ? (
          <OriginatorsModal
            users={users}
            role={"originator"}
            toggleModal={toggleModal}
          />
        ) : (
          ""
        )}
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            View Loan Processors
          </label>
          <input
            name='listLoanProcessors'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        {prosp.listLoanProcessors ? (
          <LoanProcessorsModal
            users={users}
            role={"loanProcessor"}
            toggleModal={toggleModal}
          />
        ) : (
          ""
        )}
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            View Document Processors
          </label>
          <input
            name='listDocumentProcessors'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        {prosp.listDocumentProcessors ? (
          <DocumentProcessorsModal
            users={users}
            role={"documentProcessor"}
            toggleModal={toggleModal}
          />
        ) : (
          ""
        )}
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            View Upsells
          </label>
          <input
            name='listUpsells'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        {prosp.listUpsells ? (
          <UpsellsModal
            users={users}
            role={"upsell"}
            toggleModal={toggleModal}
          />
        ) : (
          ""
        )}
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            View Federal Reso
          </label>
          <input
            name='listFederalReso'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        {prosp.listFederalReso ? (
          <FederalResoModal
            users={users}
            role={"fedReso"}
            toggleModal={toggleModal}
          />
        ) : (
          ""
        )}
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            View Tax Preparers
          </label>
          <input
            name='listTaxPreparers'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        {prosp.listTaxPreparers ? (
          <TaxPrepModal
            users={users}
            role={"taxPrep"}
            toggleModal={toggleModal}
          />
        ) : (
          ""
        )}
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            View State Reso
          </label>
          <input
            name='listStateReso'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        {prosp.listStateReso ? (
          <StateResoModal
            users={users}
            role={"stateReso"}
            toggleModal={toggleModal}
          />
        ) : (
          ""
        )}
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            View Statuses
          </label>
          <input
            name='listStatus'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        {prosp.listStatus ? (
          <StatusModal prosp={prosp} toggleProsp={toggleProsp} />
        ) : (
          ""
        )}
        <br />
        <h3>Case Status</h3>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Has Representation?
          </label>
          <input
            name='hasRepresentation'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Has Federal Tax Returns?
          </label>
          <input
            name='hasFederalFile'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Has State Tex Returns?
          </label>
          <input
            name='hasStateFile'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Has Hardship?
          </label>
          <input
            name='hasHardship'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Has Payment Plan?
          </label>
          <input
            name='hasPaymentPlan'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Has Offer
          </label>
          <input
            name='hasOffer'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Has Appeal?
          </label>
          <input
            name='hasAppeal'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Has Corp Set Up?
          </label>
          <input
            name='hasCorp'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Has Annuity Set Up
          </label>
          <input
            name='hasAnnuity'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <br />
        <h3>Field Display</h3>
        <h5>Client Information</h5>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Full Name
          </label>
          <input
            name='showFullName'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Amount
          </label>
          <input
            name='showAmount'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Pin Code
          </label>
          <input
            name='showPinCode'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Status{" "}
          </label>
          <input
            name='showStatus'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Primary SSN
          </label>
          <input
            name='showSsn'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Age
          </label>
          <input
            name='showAge'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Lexis ID
          </label>
          <input
            name='showLexId'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Lien Plaintiff
          </label>
          <input
            name='showPlaintiff'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <h5>Contact Information</h5>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Primary Phone
          </label>
          <input
            name='showPhone'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Secondary Phone
          </label>
          <input
            name='showPhone2'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Teritary Phone
          </label>
          <input
            name='showPhone3'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Email
          </label>
          <input
            name='showEmail'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Secondary Email
          </label>
          <input
            name='showEmail2'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Teritiary Email
          </label>
          <input
            name='showEmail3'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <h5>Financial Information</h5>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Monthly House Payment
          </label>
          <input
            name='showHome'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Mortgage Amount
          </label>
          <input
            name='showHomePay'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Bankruptcy Type
          </label>
          <input
            name='showBankruptcyType'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Wages
          </label>
          <input
            name='showWages'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Income Type 1
          </label>
          <input
            name='showIncome1Type'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Income Value 1
          </label>
          <input
            name='showIncome1Value'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Income Type 2
          </label>
          <input
            name='showIncome2Type'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Income Value 2
          </label>
          <input
            name='showIncome2Value'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Income Type 3
          </label>
          <input
            name='showIncome3Type'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Income Value 3
          </label>
          <input
            name='showIncome3Value'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Other Income Type
          </label>
          <input
            name='showOtherIncomeType'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Other Income Value
          </label>
          <input
            name='showOtherIncomeValue'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Available Credit
          </label>
          <input
            name='showAvailableCredit'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Total Credit
          </label>
          <input
            name='showTotalCredit'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <h5>Payment Information</h5>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Quote
          </label>
          <input
            name='showQuote'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Gross
          </label>
          <input
            name='showGross'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Initial
          </label>
          <input
            name='showInitial'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Total
          </label>
          <input
            name='showTotal'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Payments Remaining
          </label>
          <input
            name='showPayments'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>{" "}
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Percent Paid
          </label>
          <input
            name='showPercent'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>{" "}
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Late Amount
          </label>
          <input
            name='showRedline'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Refunded Amount
          </label>
          <input
            name='showRefund'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Initial Payment Date
          </label>
          <input
            name='showInitialPaymentDate'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Last Payment Date{" "}
          </label>
          <input
            name='showLastPaymentDate'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Balance
          </label>
          <input
            name='showBalance'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <h5>Loans and Credit</h5>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Credit Score
          </label>
          <input
            name='showCreditScore'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Employed Duration
          </label>
          <input
            name='showEmployerTime'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Loan
          </label>
          <input
            name='showLoan'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <h5>Case Information</h5>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Create Date
          </label>
          <input
            name='showCreateDate'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Marketing Source
          </label>
          <input
            name='showCreateDate'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <h5>Prospect Status Filters</h5>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Primary Tax Problem
          </label>
          <input
            name='showProblem1'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Secondary Tax Problem
          </label>
          <input
            name='showProblem2'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Teritary Problem
          </label>
          <input
            name='showProblem3'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Primary Resolution Sold
          </label>
          <input
            name='showResSold'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Second Resolution Sold{" "}
          </label>
          <input
            name='showResSold2'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Compliance
          </label>
          <input
            name='showCompliant'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Filing Status
          </label>
          <input
            name='showFilingStatus'
            type='checkbox'
            onClick={onClick}
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show CPA Status
          </label>
          <input
            name='showCpa'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <h5>Secondary Contact</h5>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Secondary Contact
          </label>
          <input
            name='showName2'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Secondary Address
          </label>
          <input
            name='showAddress2'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Secondary City
          </label>
          <input
            name='showCity2'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Secondary State
          </label>
          <input
            name='showState2'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Secondary Zip
          </label>
          <input
            name='showZip2'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
        <li>
          {" "}
          <label style={{ fontSize: ".75rem" }} htmlFor='filedFederal'>
            Show Secondary SSN
          </label>
          <input
            name='showSsn2'
            type='checkbox'
            onClick={onClick}
            onChange={toggleProsp}
          />
        </li>
      </ul>
    </div>
  );
};

export default FieldSelect;
