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
  const { prosp, setProsp } = props;

  const { getUserReminded, users } = useContext(UserContext);

  const { workers } = useContext(LeadContext);

  console.log(workers);
  useEffect(() => {
    let query = "";
    getUserReminded(query);
  }, []);

  const onChange = (e) => {
    setProsp({ ...prosp, [e.target.name]: e.target.checked });
  };

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
  console.log(prosp);
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
            onChange={onChange}
            checked={prosp.listOriginators}
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
            onChange={onChange}
            checked={prosp.listLoanProcessors}
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
            onChange={onChange}
            checked={prosp.listDocumentProcessors}
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
            onChange={onChange}
            checked={prosp.listUpsells}
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
            onChange={onChange}
            checked={prosp.listFederalReso}
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
            onChange={onChange}
            checked={prosp.listTaxPreparers}
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
            onChange={onChange}
            checked={prosp.listStateReso}
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
            onChange={onChange}
            checked={prosp.listStatus}
          />
        </li>
        {prosp.listStatus ? <StatusModal /> : ""}
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
            onChange={onChange}
            checked={prosp.hasRepresentation}
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
            onChange={onChange}
            checked={prosp.hasFederalFile}
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
            onChange={onChange}
            checked={prosp.hasStateFile}
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
            onChange={onChange}
            checked={prosp.hasHardship}
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
            onChange={onChange}
            checked={prosp.hasPaymentPlan}
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
            onChange={onChange}
            checked={prosp.hasOffer}
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
            onChange={onChange}
            checked={prosp.hasAppeal}
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
            onChange={onChange}
            checked={prosp.hasCorp}
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
            onChange={onChange}
            checked={prosp.hasAnnuity}
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
            onChange={onChange}
            checked={prosp.showFullName}
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
            onChange={onChange}
            checked={prosp.showAmount}
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
            onChange={onChange}
            checked={prosp.showPinCode}
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
            onChange={onChange}
            checked={prosp.showStatus}
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
            onChange={onChange}
            checked={prosp.showSsn}
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
            onChange={onChange}
            checked={prosp.showAge}
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
            onChange={onChange}
            checked={prosp.showLexId}
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
            onChange={onChange}
            checked={prosp.showPlaintiff}
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
            onChange={onChange}
            checked={prosp.showPhone}
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
            onChange={onChange}
            checked={prosp.showPhone2}
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
            onChange={onChange}
            checked={prosp.showPhone3}
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
            onChange={onChange}
            checked={prosp.showEmail}
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
            onChange={onChange}
            checked={prosp.showEmail2}
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
            onChange={onChange}
            checked={prosp.showEmail3}
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
            onChange={onChange}
            checked={prosp.showHome}
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
            onChange={onChange}
            checked={prosp.showHomePay}
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
            onChange={onChange}
            checked={prosp.showBankruptcyType}
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
            onChange={onChange}
            checked={prosp.showWages}
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
            onChange={onChange}
            checked={prosp.showIncome1Type}
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
            onChange={onChange}
            checked={prosp.showIncome1Value}
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
            onChange={onChange}
            checked={prosp.showIncome2Type}
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
            onChange={onChange}
            checked={prosp.showIncome2Value}
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
            onChange={onChange}
            checked={prosp.showIncome3Type}
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
            onChange={onChange}
            checked={prosp.showIncome3Value}
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
            onChange={onChange}
            checked={prosp.showOtherIncomeType}
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
            onChange={onChange}
            checked={prosp.showOtherIncomeValue}
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
            onChange={onChange}
            checked={prosp.showAvailableCredit}
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
            onChange={onChange}
            checked={prosp.showTotalCredit}
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
            onChange={onChange}
            checked={prosp.showQuote}
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
            onChange={onChange}
            checked={prosp.showGross}
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
            onChange={onChange}
            checked={prosp.showInitial}
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
            onChange={onChange}
            checked={prosp.showTotal}
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
            onChange={onChange}
            checked={prosp.showPayments}
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
            onChange={onChange}
            checked={prosp.showPercent}
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
            onChange={onChange}
            checked={prosp.showRedline}
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
            onChange={onChange}
            checked={prosp.showRefund}
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
            onChange={onChange}
            checked={prosp.showInitialPaymentDate}
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
            onChange={onChange}
            checked={prosp.showLastPaymentDate}
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
            onChange={onChange}
            checked={prosp.showBalance}
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
            onChange={onChange}
            checked={prosp.showCreditScore}
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
            onChange={onChange}
            checked={prosp.showEmployerTime}
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
            onChange={onChange}
            checked={prosp.showLoan}
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
            onChange={onChange}
            checked={prosp.showCreateDate}
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
            onChange={onChange}
            checked={prosp.showCreateDate}
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
            onChange={onChange}
            checked={prosp.showProblem1}
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
            onChange={onChange}
            checked={prosp.showProblem2}
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
            onChange={onChange}
            checked={prosp.showProblem3}
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
            onChange={onChange}
            checked={prosp.showResSold}
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
            onChange={onChange}
            checked={prosp.showResSold2}
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
            onChange={onChange}
            checked={prosp.showCompliant}
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
            onChange={onChange}
            checked={prosp.showFilingStatus}
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
            onChange={onChange}
            checked={prosp.showCpa}
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
            onChange={onChange}
            checked={prosp.showName2}
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
            onChange={onChange}
            checked={prosp.showAddress2}
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
            onChange={onChange}
            checked={prosp.showCity2}
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
            onChange={onChange}
            checked={prosp.showState2}
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
            onChange={onChange}
            checked={prosp.showZip2}
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
            onChange={onChange}
            checked={prosp.showSsn2}
          />
        </li>
      </ul>
    </div>
  );
};

export default FieldSelect;
