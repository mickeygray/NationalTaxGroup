import React, { useContext, useState, useEffect } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import { Link } from "react-router-dom";
import refund from "../../images/refund.png";

const ProspectItem = (props) => {
  const { prosp, filtered, prospect } = props;

  const {
    showCreateDate,
    showName2,
    showAddress2,
    showCity2,
    showState2,
    showZip2,
    showEmployerTime,
    showSsn2,
    showLexId,
    showRelation,
    showPhone2,
    showPhone3,
    showBankruptcyType,
    showHomeLoan,
    showAge,
    showEmail2,
    showEmail3,
    showPlaintiff,
    showPrac,
    showProblem1,
    showProblem2,
    showProblem3,
    showCreditScore,
    showResSold,
    showResSold2,
    showHome,
    showHomePay,
    showWages,
    showIncome1Type,
    showIncome1Value,
    showIncome2Type,
    showIncome2Value,
    showIncome3Type,
    showIncome3Value,
    showOtherIncomeType,
    showOtherIncomeValue,
    showAvailableCredit,
    showTotalCredit,
    showEmployerName,
    showEmail,
    showEmployerPhone,
    showFullName,
    showAmount,
    showPhone,
    showPinCode,
    showStatus,
    showCompliant,
    showFilingStatus,
    showCpa,
    showSsn,
    showGross,
    showQuote,
    showInitial,
    showTotal,
    showPayments,
    showPercent,
    showRedline,
    showRefund,
    showInitialPaymentDate,
    showLastPaymentDate,
    showBalance,
    showLoan,
  } = prosp;

  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);

  const { getProspect } = leadContext;
  const { setRecent } = userContext;
  let match = {};
  if (filtered) {
    match = filtered;
  } else {
    match = prospect;
  }

  const onClick = (e) => {
    getProspect(match._id);
    setRecent(match);
  };

  const [colorStyle, setColorStyle] = useState({
    backgroundColor: "yellow",
    color: "black",
    fontWeight: "bold",
    height: "66px",
  });

  console.log(prospect);

  console.log(filtered, "111111111");

  useEffect(() => {
    if (match.status === "client") {
      setColorStyle({
        backgroundColor: "#00FF00",
        color: "black",
        fontWeight: "bold",
        height: "66px",
      });
    } else if (match.status === "upsellable") {
      setColorStyle({
        backgroundColor: "#3CB371",
        color: "black",
        fontWeight: "bold",
        height: "66px",
      });
    } else if (match.status === "highdollar") {
      setColorStyle({
        backgroundColor: "#6B8E23",
        color: "white",
        fontWeight: "bold",
        height: "66px",
      });
    } else if (match.status === "prospect") {
      setColorStyle({
        backgroundColor: "yellow",
        color: "black",
        height: "66px",
      });
    } else if (match.status === "redline") {
      setColorStyle({
        backgroundColor: "red",
        color: "black",
        fontWeight: "bold",
        height: "66px",
      });
    } else if (match.status === "refund") {
      setColorStyle({
        backgroundImage: `url(${refund})`,
        backgroundRepeat: "norepeat",
        backgroundSize: "cover",
        fontWeight: "bold",
        height: "66px",
      });
    }
  }, [match]);

  return (
    <Link
      to={`/prospects/${filtered ? filtered._id : prospect._id}`}
      onClick={onClick}
      style={colorStyle}>
      <nav className='navbar'>
        <ul>
          {showCreateDate ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Create Date </strong> <br />{" "}
              {filtered
                ? Intl.DateTimeFormat(
                    "en-US",
                    { timeZone: "America/Los_Angeles" },
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }
                  ).format(new Date(filtered.createDate))
                : Intl.DateTimeFormat(
                    "en-US",
                    { timeZone: "America/Los_Angeles" },
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }
                  ).format(new Date(prospect.createDate))}
            </li>
          ) : (
            ""
          )}
          {showName2 ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Secondary Name</strong> <br />{" "}
              {filtered ? filtered.name2 : prospect.name2}
            </li>
          ) : (
            ""
          )}
          {showAddress2 ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Secondary Address </strong> <br />{" "}
              {filtered ? filtered.address2 : prospect.address2}
            </li>
          ) : (
            ""
          )}
          {showEmail ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Email Address </strong> <br />{" "}
              {filtered ? filtered.emailAddress : prospect.emailAddress}
            </li>
          ) : (
            ""
          )}

          {showCity2 ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Secondary City </strong> <br />{" "}
              {filtered ? filtered.city2 : prospect.city2}
            </li>
          ) : (
            ""
          )}
          {showState2 ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Secondary State</strong> <br />{" "}
              {filtered ? filtered.state2 : prospect.state2}
            </li>
          ) : (
            ""
          )}
          {showZip2 ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Secondary Zip</strong> <br />{" "}
              {filtered ? filtered.zip2 : prospect.zip2}
            </li>
          ) : (
            ""
          )}
          {showEmployerTime ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Time Employed </strong> <br />{" "}
              {filtered ? filtered.employerTime : prospect.employerTime}
            </li>
          ) : (
            ""
          )}
          {showSsn2 ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Secondary SSN </strong> <br />
              {filtered ? filtered.Ssn2 : prospect.Ssn2}
            </li>
          ) : (
            ""
          )}
          {showCreditScore ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>CreditScore</strong> <br />{" "}
              {filtered ? filtered.creditScore : prospect.creditScore}
            </li>
          ) : (
            ""
          )}
          {showLexId ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Lexis Id </strong> <br />
              {filtered ? filtered.lexId : prospect.lexId}
            </li>
          ) : (
            ""
          )}
          {showPhone2 && match.phones ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Secondary Phone </strong> <br />{" "}
              {filtered ? filtered.phones[0] : prospect.phones[0]}
            </li>
          ) : (
            ""
          )}
          {showPhone3 && match.phones ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Third Phone</strong> <br />{" "}
              {filtered ? filtered.phones[1] : prospect.phones[1]}
            </li>
          ) : (
            ""
          )}
          {showBankruptcyType && match.bankruptcy ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Bankruptcy</strong> <br />{" "}
              {filtered
                ? filtered.bankruptcy.filingType
                : prospect.bankruptcy.filingType}
            </li>
          ) : (
            ""
          )}

          {showAge ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Age </strong> <br />{" "}
              {filtered ? filtered.age : prospect.age}
            </li>
          ) : (
            ""
          )}
          {showEmail2 && match.emailAddresses ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Secondary Email</strong> <br />{" "}
              {filtered
                ? filtered.emailAddresses[0]
                : prospect.emailAddresses[0]}
            </li>
          ) : (
            ""
          )}
          {showEmail3 && match.emailAddresses ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Third Email </strong> <br />{" "}
              {filtered
                ? filtered.emailAddresses[1]
                : prospect.emailAddresses[1]}
            </li>
          ) : (
            ""
          )}

          {showProblem1 ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Tax Problem 1</strong> <br />{" "}
              {filtered ? filtered.problem1 : prospect.problem1}
            </li>
          ) : (
            ""
          )}
          {showProblem2 ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Tax Problem 2</strong> <br />{" "}
              {filtered ? filtered.problem2 : prospect.problem2}
            </li>
          ) : (
            ""
          )}
          {showProblem3 ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Tax Problem 3</strong> <br />{" "}
              {filtered ? filtered.problem3 : prospect.problem3}
            </li>
          ) : (
            ""
          )}
          {showResSold ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Resolution Sold</strong> <br />{" "}
              {filtered ? filtered.resSold : prospect.resSold}
            </li>
          ) : (
            ""
          )}
          {showResSold2 ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Second Reso Sold</strong> <br />{" "}
              {filtered ? filtered.resSold2 : prospect.resSold2}
            </li>
          ) : (
            ""
          )}
          {showHome ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Monthly House Payment</strong> <br />{" "}
              {filtered ? filtered.homePay : prospect.homePay}
            </li>
          ) : (
            ""
          )}
          {showHomePay && match.real ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Mortgage Loan</strong> <br />{" "}
              {filtered ? filtered.real.amount : prospect.real.amount}
            </li>
          ) : (
            ""
          )}
          {showWages ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Wages </strong> <br />{" "}
              {filtered ? filtered.wages : prospect.wages}
            </li>
          ) : (
            ""
          )}
          {showIncome1Type ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Income 1 </strong> <br />{" "}
              {filtered ? filtered.income1Type : prospect.income1Type}
            </li>
          ) : (
            ""
          )}
          {showIncome1Value ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Value 1 </strong> <br />{" "}
              {filtered ? filtered.income1Value : prospect.income1Value}
            </li>
          ) : (
            ""
          )}
          {showIncome2Type ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Income 2 </strong> <br />{" "}
              {filtered ? filtered.income2Type : prospect.income2Type}
            </li>
          ) : (
            ""
          )}
          {showIncome2Value ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Value 2 </strong> <br />{" "}
              {filtered ? filtered.income2Value : prospect.income2Value}
            </li>
          ) : (
            ""
          )}
          {showIncome3Type ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Income 3 </strong> <br />{" "}
              {filtered ? filtered.income3Type : prospect.income3Type}
            </li>
          ) : (
            ""
          )}
          {showPlaintiff ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Plaintiff </strong> <br />{" "}
              {filtered ? filtered.plaintiff : prospect.plaintiff}
            </li>
          ) : (
            ""
          )}
          {showIncome3Value ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Value 3</strong> <br />{" "}
              {filtered ? filtered.income3Value : prospect.income3Value}
            </li>
          ) : (
            ""
          )}
          {showOtherIncomeType ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Other Income</strong> <br />{" "}
              {filtered ? filtered.otherIncomeType : prospect.otherIncomeType}
            </li>
          ) : (
            ""
          )}
          {showOtherIncomeValue ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Other Value</strong> <br />{" "}
              {filtered ? filtered.otherIncomeValue : prospect.otherIncomeValue}
            </li>
          ) : (
            ""
          )}
          {showAvailableCredit ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Available Credit</strong> <br />{" "}
              {filtered ? filtered.availableCredit : prospect.availableCredit}
            </li>
          ) : (
            ""
          )}
          {showTotalCredit ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Total Credit</strong> <br />{" "}
              {filtered ? filtered.totalCredit : prospect.totalCredit}
            </li>
          ) : (
            ""
          )}
          {showEmployerName ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Employer Name</strong> <br />{" "}
              {filtered ? filtered.employerName : prospect.employerName}
            </li>
          ) : (
            ""
          )}
          {showEmployerPhone ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Employer Phone </strong> <br />{" "}
              {filtered ? filtered.employerPhone : prospect.employerPhone}
            </li>
          ) : (
            ""
          )}
          {showFullName ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Full Name </strong> <br />{" "}
              {filtered ? filtered.fullName : prospect.fullName}
            </li>
          ) : (
            ""
          )}
          {showAmount ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Amount </strong> <br />{" "}
              {filtered ? filtered.amount : prospect.amount}
            </li>
          ) : (
            ""
          )}
          {showPhone ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Phone Number </strong> <br />{" "}
              {filtered ? filtered.phone : prospect.phone}
            </li>
          ) : (
            ""
          )}
          {showPinCode ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Pin Code</strong> <br />{" "}
              {filtered ? filtered.pinCode : prospect.pinCode}
            </li>
          ) : (
            ""
          )}
          {showStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Status </strong> <br />{" "}
              {filtered ? filtered.status : prospect.status}
            </li>
          ) : (
            ""
          )}
          {showCompliant ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Compliance</strong> <br />{" "}
              {filtered ? filtered.compliant : prospect.compliant}
            </li>
          ) : (
            ""
          )}
          {showFilingStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Filing Status</strong> <br />{" "}
              {filtered ? filtered.filingStatus : prospect.filingStatus}
            </li>
          ) : (
            ""
          )}
          {showCpa ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>CPA</strong> <br />{" "}
              {filtered ? filtered.cpa : prospect.cpa}
            </li>
          ) : (
            ""
          )}
          {showSsn ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>SSN</strong> <br />{" "}
              {filtered ? filtered.ssn : prospect.ssn}
            </li>
          ) : (
            ""
          )}
          {showGross && match.paymentStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Gross</strong> <br />{" "}
              {filtered
                ? filtered.paymentStatus.gross
                : prospect.paymentStatus.gross}
            </li>
          ) : (
            ""
          )}
          {showQuote && match.paymentStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Quote</strong> <br />{" "}
              {filtered
                ? filtered.paymentStatus.quote
                : prospect.paymentStatus.quote}
            </li>
          ) : (
            ""
          )}
          {showInitial && match.paymentStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Initial</strong> <br />{" "}
              {filtered
                ? filtered.paymentStatus.initial
                : prospect.paymentStatus.initial}
            </li>
          ) : (
            ""
          )}
          {showTotal && match.paymentStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Total</strong> <br />{" "}
              {filtered
                ? filtered.paymentStatus.total
                : prospect.paymentStatus.total}
            </li>
          ) : (
            ""
          )}
          {showPayments && match.paymentStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Payments Left</strong> <br />{" "}
              {filtered
                ? filtered.paymentStatus.paymentsRemaining
                : prospect.paymentStatus.paymentsRemaining}
            </li>
          ) : (
            ""
          )}
          {showPercent && match.paymentStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Percent Remaining</strong> <br />{" "}
              {filtered
                ? filtered.paymentStatus.percentPaid
                : prospect.paymentStatus.percentPaid}
            </li>
          ) : (
            ""
          )}
          {showRedline && match.paymentStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Late Payments</strong> <br />{" "}
              {filtered
                ? filtered.paymentStatus.redLine
                : prospect.paymentStatus.redLine}
            </li>
          ) : (
            ""
          )}
          {showRefund && match.paymentStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Refund</strong> <br />{" "}
              {filtered
                ? filtered.paymentStatus.refund
                : prospect.paymentStatus.refund}
            </li>
          ) : (
            ""
          )}
          {showInitialPaymentDate && match.paymentStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Initial Payment Date</strong> <br />{" "}
              {filtered
                ? Intl.DateTimeFormat(
                    "en-US",
                    { timeZone: "America/Los_Angeles" },
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }
                  ).format(new Date(filtered.paymentStatus.initialPaymentDate))
                : Intl.DateTimeFormat(
                    "en-US",
                    { timeZone: "America/Los_Angeles" },
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }
                  ).format(new Date(prospect.paymentStatus.initialPaymentDate))}
            </li>
          ) : (
            ""
          )}
          {showLastPaymentDate && match.paymentStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Last Payment Date</strong> <br />{" "}
              {filtered
                ? Intl.DateTimeFormat(
                    "en-US",
                    { timeZone: "America/Los_Angeles" },
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }
                  ).format(new Date(filtered.paymentStatus.lastPaymentDate))
                : Intl.DateTimeFormat(
                    "en-US",
                    { timeZone: "America/Los_Angeles" },
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }
                  ).format(new Date(prospect.paymentStatus.lastPaymentDate))}
            </li>
          ) : (
            ""
          )}
          {showBalance && match.paymentStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Balance</strong> <br />{" "}
              {filtered
                ? filtered.paymentStatus.balance
                : prospect.paymentStatus.balance}
            </li>
          ) : (
            ""
          )}
          {showLoan && match.paymentStatus ? (
            <li style={{ fontSize: ".6rem" }} className='px-2'>
              {" "}
              <strong>Loans</strong> <br />{" "}
              {filtered
                ? filtered.paymentStatus.loans
                : prospect.paymentStatus.loans}
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </Link>
  );
};

export default ProspectItem;
