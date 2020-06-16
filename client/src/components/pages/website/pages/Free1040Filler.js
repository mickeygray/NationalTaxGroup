import React, { useContext, useEffect, useState } from "react";
import LeadContext from "../../../../context/lead/leadContext";

const Free1040Filler = () => {
  const leadContext = useContext(LeadContext);

  useEffect(() => {
    setForm({
      firstName: "",
      middleI: "",
      lastName: "",
      spouseFirstName: "",
      spouseMiddleI: "",
      spouseLastName: "",
      ssn: "",
      spouseSsn: "",
      aptNo: "",
      city: "",
      st: "",
      zip: "",
      foreignCountry: "",
      foreignProvince: "",
      foreignPostalCode: "",
      wages: "",
      interest1: "",
      interest2: "",
      dividends1: "",
      dividends2: "",
      distributions: "",
      taxableDistribution: "",
      taxablePension: "",
      taxableBenefits: "",
      pensions: "",
      benefits: "",
      captialGain: "",
      otherIncome: "",
      totalIncome: "",
      adjustments: "",
      adjustedGross: "",
      standardDeduction: "",
      businessDeduction: "",
      sumDeduction: "",
      taxableIncome: "",
      tax: "",
      tax2: "",
      childCredit: "",
      childCredit2: "",
      otherTaxes: "",
      totalTax: "",
      federalWithheld: "",
      otherPayments: "",
      eic: "",
      americanOpp: "",
      totalOther: "",
      totalPayments: "",
      overpaid: "",
      refund: "",
      routingNumber: "",
      accountNumber: "",
      appliedPayment: "",
      amountOwed: "",
      penalty: "",
      age: "",
      blindness: "",
      dependent1: "",
      dependent1ssn: "",
      filingStatus: "",
      qualifyingPerson: "",
    });
  }, []);

  const [form, setForm] = useState({
    firstName: "",
    middleI: "",
    lastName: "",
    spouseFirstName: "",
    spouseMiddleI: "",
    spouseLastName: "",
    ssn: "",
    spouseSsn: "",
    aptNo: "",
    city: "",
    st: "",
    zip: "",
    foreignCountry: "",
    foreignProvince: "",
    foreignPostalCode: "",
    wages: "",
    interest1: "",
    interest2: "",
    dividends1: "",
    dividends2: "",
    distributions: "",
    taxableDistribution: "",
    taxablePension: "",
    taxableBenefits: "",
    pensions: "",
    benefits: "",
    captialGain: "",
    otherIncome: "",
    totalIncome: "",
    adjustments: "",
    adjustedGross: "",
    standardDeduction: "",
    businessDeduction: "",
    sumDeduction: "",
    taxableIncome: "",
    tax: "",
    tax2: "",
    childCredit: "",
    childCredit2: "",
    otherTaxes: "",
    totalTax: "",
    federalWithheld: "",
    otherPayments: "",
    eic: "",
    americanOpp: "",
    totalOther: "",
    totalPayments: "",
    overpaid: "",
    refund: "",
    routingNumber: "",
    accountNumber: "",
    appliedPayment: "",
    amountOwed: "",
    penalty: "",
    age: "",
    blindness: "",
    dependent1: "",
    dependent1ssn: "",
    filingStatus: "",
    qualifyingPerson: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { firstName } = form;

  return (
    <form className='container'>
      <div className='container grid-2 '>
        <div className='card'>
          {/* contact info panel */}

          <p
            className='formfiller'
            style={{ paddingTop: "1pt", paddingLeft: "1pt" }}>
            Form
          </p>

          <h1 style={{}}>1040</h1>

          <p
            className='formfiller'
            style={{
              paddingLeft: "74pt",

              lineHeight: "8pt",
            }}>
            Department of the Treasury—Internal Revenue Service
            <span>(99)</span>
          </p>
          <h3
            style={{
              paddingLeft: "74pt",

              lineHeight: "13pt",
            }}>
            U.S. Individual Income Tax Return
          </h3>
          <h2
            style={{
              paddingTop: "6pt",
              paddingLeft: "13pt",
            }}>
            2019
          </h2>

          <p className='formfiller' style={{ paddingLeft: "4pt" }}>
            OMB No. 1545-0074
          </p>

          <p
            className='formfiller'
            style={{
              paddingTop: "5pt",
              paddingLeft: "8pt",
            }}>
            IRS Use Only—Do not write or staple in this space.
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "6pt",
              paddingLeft: "13pt",
            }}>
            Filing Status
          </p>

          <p className='formfiller' style={{ paddingLeft: "13pt" }}>
            Qualifying widow(er) (QW)
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "1pt",
              paddingLeft: "13pt",

              fontSize: "0.6rem",
            }}>
            Check only one box.
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "13pt",

              lineHeight: "124%",

              fontSize: "0.6rem",
            }}>
            If you checked the MFS box', enter the name of spouse. If you
            checked the HOH or QW box', enter the child’s name if the qualifying
            person is a child but not your dependent. <span>▶</span>
          </p>
          <p className='formfiller'>Last name</p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "1pt",
              paddingLeft: "17pt",

              fontSize: "0.6rem",
            }}>
            Your first name and middle initial{" "}
            <b>Your social security number</b>
          </p>

          <p className='formfiller'>Last name</p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "5pt",
              paddingLeft: "17pt",

              fontSize: "0.6rem",
            }}>
            If joint return', spouse’s first name and middle initial
            <b>Spouse’s social security number</b>
          </p>

          <p
            className='formfiller'
            style={{
              paddingTop: "1pt",
              paddingLeft: "4pt",

              fontSize: "0.6rem",
            }}>
            Apt. no.
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "5pt",
              paddingLeft: "17pt",

              fontSize: "0.6rem",
            }}>
            Home address (number and street). If you have a P.O. box', see
            instructions.
          </p>

          <p
            className='formfiller'
            style={{
              paddingTop: "1pt",
              paddingLeft: "3pt",

              fontSize: "0.6rem",
            }}>
            Foreign postal code
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "1pt",
              paddingLeft: "3pt",

              fontSize: "0.6rem",
            }}>
            Foreign province/state/county
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "6pt",
              paddingLeft: "17pt",

              lineHeight: "298 %",

              fontSize: "0.6rem",
            }}>
            City', town or post office', state', and ZIP code. If you have a
            foreign address', also complete spaces below (see instructions).
            Foreign country name
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "5pt",
              paddingLeft: "17pt",
              textIndent: "2pt",
              lineHeight: "118 %",
            }}>
            Presidential Election Campaign
            <span>
              Check here if you', or your spouse if filing jointly', want $3 to
              go to this fund.
            </span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingLeft: "17pt",

              lineHeight: "123 %",
            }}>
            Checking a box below will not change your tax or refund.
            <span>You Spouse</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "4pt",
              paddingLeft: "21pt",

              lineHeight: "106 %",
            }}>
            If more than four dependents', see instructions and
            <span>✓ </span>here <span>▶</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingLeft: "13pt",

              lineHeight: "9pt",
            }}>
            Standard
          </p>
          <p className='formfiller' style={{ paddingLeft: "13pt" }}>
            Someone can claim:
          </p>
          <p className='formfiller' style={{ paddingLeft: "13pt" }}>
            You as a dependent
          </p>
          <p className='formfiller' style={{ paddingLeft: "13pt" }}>
            Your spouse as a dependent
          </p>
          <p className='formfiller' style={{ paddingLeft: "13pt" }}>
            Deduction
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "4pt",
              paddingLeft: "9pt",
            }}>
            Spouse itemizes on a separate return or you were a dualStatus alien
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "6pt",
              paddingLeft: "12pt",
            }}>
            Age/Blindness <span>You:</span>
          </p>

          <p className='formfiller' style={{ paddingLeft: "12pt" }}>
            Were born before January 2', 1955
          </p>

          <p className='formfiller' style={{ paddingLeft: "12pt" }}>
            Are blind <b>Spouse:</b>
          </p>

          <p className='formfiller' style={{ paddingLeft: "12pt" }}>
            Was born before January 2', 1955
          </p>

          <p className='formfiller' style={{ paddingLeft: "12pt" }}>
            Is blind
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "2pt",
              paddingLeft: "13pt",
            }}>
            (3) <span>Relationship to you</span>
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "2pt",
              paddingLeft: "7pt",
            }}>
            (2) <span>Social security number</span>
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p className='formfiller'>
            Dependents <span>(see instructions):</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "4pt",
            }}>
            (1) <span>First name</span>
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "423pt",
            }}>
            (4) <span>✓ </span>
            <span>if qualifies for (see instructions):</span>
          </p>
          <p className='formfiller'>Last name</p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "1pt",
              paddingLeft: "414pt",
            }}>
            Child tax credit Credit for other dependents
          </p>

          <p
            className='formfiller'
            style={{ paddingTop: "3pt", textAlign: "center" }}>
            1
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <div style={{ borderCollapse: "collapse", padding: "0px" }}>
            <ul
              style={{
                display: "inlineFlex",
                textDecoration: "none",
                backgroundColor: "#DCFFFA",
              }}>
              <li style={{ paddingLeft: "13pt" }}>
                <input type='radio' /> Single
              </li>

              <li style={{ paddingLeft: "13pt" }}>
                <input type='radio' /> Married filing jointly
              </li>

              <li style={{ paddingLeft: "13pt" }}>
                <input type='radio' /> Married filing separately (MFS)
              </li>

              <li style={{ paddingLeft: "13pt" }}>
                <input type='radio' /> Head of household (HOH)
              </li>
            </ul>

            <div
              style={{
                height: "12pt",
                width: "22pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
                backgroundColor: "#DCFFFA",
              }}>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "6pt",

                  lineHeight: "7pt",
                }}>
                2a
              </p>
            </div>

            <div className='formfiller'>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "6pt",

                  lineHeight: "7pt",
                }}>
                3a
              </p>
            </div>

            <div>
              <div
                style={{
                  height: "12pt",
                  width: "22pt",
                  borderTopStyle: "solid",
                  borderTopWidth: "1pt",
                  borderLeftStyle: "solid",
                  borderLeftWidth: "1pt",
                  borderBottomStyle: "solid",
                  borderBottomWidth: "1pt",
                  borderRightStyle: "solid",
                  borderRightWidth: "1pt",
                  backgroundColor: "#DCFFFA",
                }}>
                <p
                  className='formfiller'
                  style={{
                    paddingTop: "3pt",
                    paddingLeft: "6pt",

                    lineHeight: "7pt",
                  }}>
                  4a
                </p>
              </div>
            </div>

            <div className='formfiller'>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "6pt",

                  lineHeight: "7pt",
                }}>
                4c
              </p>
            </div>

            <div className='formfiller'>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "6pt",

                  lineHeight: "7pt",
                }}>
                5a
              </p>
            </div>
          </div>

          <p
            className='formfiller'
            style={{
              paddingTop: "5pt",
              paddingLeft: "73pt",
            }}>
            1
            <span>
              Wages', salaries', tips', etc. Attach Form(s) W-2 . . . . . . . .
              . . . . . . . . . .
            </span>
          </p>

          <p
            className='formfiller'
            style={{
              paddingTop: "5pt",
              paddingLeft: "10pt",

              lineHeight: "6pt",
            }}>
            Standard
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "10pt",
            }}>
            2a <span>Tax-exempt interest . . . .</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "10pt",
            }}>
            3a <span>Qualified dividends . . . .</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "10pt",
            }}>
            b <span>Taxable interest. Attach Sch. B if required</span>
          </p>
          <p
            className='formfiller'
            style={{ paddingTop: "3pt", textAlign: "center" }}>
            6
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            5b
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            4d
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            4b
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            3b
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            2b
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "10pt",
            }}>
            b <span>Ordinary dividends. Attach Sch. B if required</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "1pt",
              paddingLeft: "10pt",
            }}>
            Deduction for—
          </p>
          <ul>
            <li>
              <p
                className='formfiller'
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "14pt",
                  textIndent: "-5pt",
                }}>
                Single or Married filing separately',
              </p>
              <p className='formfiller' style={{ paddingLeft: "14pt" }}>
                $12',200
              </p>
            </li>
            <li>
              <p
                className='formfiller'
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "14pt",
                  textIndent: "-4pt",
                  lineHeight: "3pt",
                }}>
                Married filing
              </p>
              <p className='formfiller' style={{ paddingLeft: "10pt" }}>
                4a <span>IRA distributions . . . . .</span>
              </p>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "13pt",
                }}>
                c <span>Pensions and annuities . . .</span>
              </p>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "10pt",
                }}>
                5a <span>Social security benefits . . .</span>
              </p>
              <p className='formfiller' style={{ paddingLeft: "10pt" }}>
                b <span>Taxable amount . . . . . .</span>
              </p>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "10pt",
                }}>
                d <span>Taxable amount . . . . . .</span>
              </p>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "10pt",
                }}>
                b <span>Taxable amount . . . . . .</span>
              </p>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "15pt",
                }}>
                jointly or Qualifying widow(er)',
              </p>
              <p className='formfiller' style={{ paddingLeft: "15pt" }}>
                $24',400
              </p>
            </li>
            <li>
              <p
                className='formfiller'
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "15pt",
                  textIndent: "-5pt",
                }}>
                Head of household',
              </p>
              <p className='formfiller' style={{ paddingLeft: "15pt" }}>
                $18',350
              </p>
            </li>
            <li>
              <p
                className='formfiller'
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "15pt",
                  textIndent: "-5pt",
                }}>
                If you checked any box under <i>Standard Deduction',</i>
              </p>
            </li>
          </ul>
          <p className='formfiller' style={{ paddingLeft: "15pt" }}>
            see instructions.
          </p>
          <p
            className='formfiller'
            style={{
              paddingLeft: "9pt",

              lineHeight: "8pt",
            }}>
            6
            <span>
              Capital gain or (loss). Attach Schedule D if required. If not
              required', check here{" "}
            </span>
            <span>▶</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            7b
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            7a
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "9pt",
            }}>
            7a
            <span>
              Other income from Schedule 1', line 9 . . . . . . . . . . . . . .
              . . . . . .
            </span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            8a
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "13pt",
            }}>
            b
            <span>
              Add lines 1', 2b', 3b', 4b', 4d', 5b', 6', and 7a. This is your{" "}
            </span>
            total income <span>▶</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            8b
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "9pt",
            }}>
            8a
            <span>
              Adjustments to income from Schedule 1', line 22 . . . . . . . . .
              . . . . . . . .
            </span>
          </p>
          <p
            className='formfiller'
            style={{ paddingTop: "3pt", textAlign: "center" }}>
            9
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "10pt",
            }}>
            9
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "13pt",
            }}>
            b<span>Subtract line 8a from line 7b. This is your </span>
            adjusted gross income <span>▶</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            10
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "28pt",
            }}>
            Standard deduction or itemized deductions
            <span>(from Schedule A) . . . . .</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "4pt",
            }}>
            11a
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "5pt",
            }}>
            10
            <span>
              Qualified business income deduction. Attach Form 8995 or Form
              8995A . . .
            </span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "4pt",
            }}>
            11b
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "5pt",
            }}>
            11a
            <span>
              Add lines 9 and 10 . . . . . . . . . . . . . . . . . . . . . . . .
              .
            </span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "13pt",
            }}>
            b Taxable income.
            <span>
              Subtract line 11a from line 8b. If zero or less', enter -0- . . .
              . . . . . . . .
            </span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "2pt",
              paddingLeft: "13pt",
            }}>
            <span>
              For Disclosure', Privacy Act', and Paperwork Reduction Act
              Notice', see separate instructions.{" "}
            </span>
            Cat. No. 11320B Form <span>1040 </span>(2019<span>)</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingLeft: "7pt",

              lineHeight: "10pt",
            }}></p>

          <p
            className='formfiller'
            style={{
              paddingTop: "2pt",
              paddingLeft: "70pt",
            }}>
            12a Tax <span>(see inst.) Check if any from Form(s): '</span>1
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "2pt",
              paddingLeft: "15pt",
            }}>
            8814 <b>2</b>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "2pt",
              paddingLeft: "15pt",
            }}>
            4972 <b>3</b>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "2pt",
              paddingLeft: "63pt",
            }}>
            12a
          </p>

          <ul>
            <li>
              <p
                className='formfiller'
                style={{ paddingLeft: "14pt", textIndent: "-4pt" }}>
                If you have a
              </p>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "17pt",
                }}>
                b
                <span>
                  Add Schedule 2', line 3', and line 12a and enter the total{" "}
                </span>
                <span>▶</span>
              </p>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "10pt",
                }}>
                13a
                <span>Child tax credit or credit for other dependents </span>13a
              </p>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "17pt",
                }}>
                b
                <span>
                  Add Schedule 3', line 7', and line 13a and enter the total{" "}
                </span>
                <span>▶</span>
              </p>
              <ol>
                <li>
                  <p
                    className='formfiller'
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "32pt",
                      textIndent: "-22pt",
                    }}>
                    Subtract line 13b from line 12b. If zero or less', enter -0-
                    . . . . . . . . . . . . . . .
                  </p>
                </li>
                <li>
                  <p
                    className='formfiller'
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "32pt",
                      textIndent: "-22pt",
                    }}>
                    Other taxes', including self-employment tax', from Schedule
                    2', line 10 . . . . . . . . . . . .
                  </p>
                </li>
                <li>
                  <p
                    className='formfiller'
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "32pt",
                      textIndent: "-22pt",
                    }}>
                    Add lines 14 and 15. This is your <b>total tax </b>
                    <span>▶</span>
                  </p>
                </li>
                <li>
                  <p
                    className='formfiller'
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "32pt",
                      textIndent: "-22pt",
                    }}>
                    Federal income tax withheld from Forms W-2 and 1099 . . . .
                    . . . . . . . . . . .
                  </p>
                </li>
                <li>
                  <p
                    className='formfiller'
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "32pt",
                      textIndent: "-22pt",
                    }}>
                    Other payments and refundable credits:
                  </p>
                  <p
                    className='formfiller'
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "10pt",
                    }}>
                    12b
                  </p>

                  <p
                    className='formfiller'
                    style={{
                      paddingTop: "6pt",
                      paddingLeft: "12pt",
                      textIndent: "-2pt",
                      lineHeight: "149 %",
                    }}>
                    13b 14
                  </p>
                  <p className='formfiller' style={{ paddingLeft: "12pt" }}>
                    15
                  </p>
                  <p
                    className='formfiller'
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "12pt",
                    }}>
                    16
                  </p>
                  <p
                    className='formfiller'
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "12pt",
                    }}>
                    17
                  </p>
                  <p className='formfiller' style={{ paddingLeft: "14pt" }}>
                    qualifying child', attach Sch. EIC.
                  </p>
                </li>
              </ol>
            </li>
            <li>
              <p
                className='formfiller'
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "14pt",
                  textIndent: "-5pt",
                }}>
                If you have nontaxable combat pay', see instructions.
              </p>
            </li>
          </ul>
          <ol>
            <li>
              <p
                className='formfiller'
                style={{ paddingLeft: "24pt", textIndent: "-14pt" }}>
                Earned income credit (EIC) . . . . . . . . . . . . . . .
              </p>
            </li>
            <li>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "24pt",
                  textIndent: "-14pt",
                }}>
                Additional child tax credit. Attach Schedule 8812 . . . . . . .
                . .
              </p>
            </li>
            <li>
              <p
                className='formfiller'
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "24pt",
                  textIndent: "-14pt",
                }}>
                American opportunity credit from Form 8863', line 8 . . . . . .
                . .
              </p>
            </li>
          </ol>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "10pt",
            }}>
            d<span>Schedule 3', line 14 . . . . . . . . . . . . . . . . .</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingLeft: "10pt",

              lineHeight: "149 %",
              textAlign: "justify",
            }}>
            18a 18b 18c 18d
          </p>

          <p className='formfiller' style={{ paddingLeft: "13pt" }}>
            Refund
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "10pt",
              paddingLeft: "13pt",
            }}>
            Direct deposit? See instructions.
          </p>

          <p
            className='formfiller'
            style={{
              paddingTop: "5pt",
              paddingLeft: "13pt",

              lineHeight: "87 %",
            }}>
            Amount You Owe
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "4pt",
              paddingLeft: "13pt",

              lineHeight: "87 %",
            }}>
            Third Party Designee
          </p>
          <p
            className='formfiller'
            style={{
              paddingLeft: "13pt",

              lineHeight: "8pt",
            }}>
            e <span>Add lines 18a through 18d. These are your </span>total other
            payments and refundable credits <span>▶</span>
          </p>
          <ol>
            <li>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "27pt",
                  textIndent: "-22pt",
                }}>
                Add lines 17 and 18e. These are your <b>total payments </b>
                <span>▶</span>
              </p>
            </li>
            <li>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "27pt",
                  textIndent: "-22pt",
                }}>
                If line 19 is more than line 16', subtract line 16 from line 19.
                This is the amount you <b>overpaid </b>. . . . . .
              </p>
            </li>
          </ol>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "27pt",
              textIndent: "-22pt",
            }}
            x>
            21a <span>Amount of line 20 you want </span>refunded to you.
            <span>If Form 8888 is attached', check here </span>
            <span>▶</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            ▶ <span>b </span>
            <span>Routing number </span>▶<span>c </span>
            <span>Type: 'Checking Savings</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            ▶ <span>d </span>
            <span>Account number</span>
          </p>
          <ol>
            <li>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "27pt",
                  textIndent: "-22pt",
                }}>
                Amount of line 20 you want{" "}
                <b>applied to your 2020 estimated tax </b>. . . . <span>▶</span>
                <span> </span>
                <b>22</b>
              </p>
            </li>
            <li>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "27pt",
                  textIndent: "-22pt",
                }}>
                Amount you owe.
                <span>
                  Subtract line 19 from line 16. For details on how to pay', see
                  instructions{" "}
                </span>
                <span>▶</span>
              </p>
            </li>
            <li>
              <p
                className='formfiller'
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "27pt",
                  textIndent: "-22pt",
                }}>
                Estimated tax penalty (see instructions) . . . . . . . . . . .
                <span>▶</span>
                <b>24</b>
              </p>
            </li>
          </ol>
          <p
            className='formfiller'
            style={{
              paddingTop: "2pt",
              paddingLeft: "13pt",
            }}>
            Do you want to allow another person (other than your paid preparer)
            to discuss this return with the IRS? See instructions.
          </p>
          <p
            className='formfiller'
            style={{
              paddingLeft: "8pt",
              textIndent: "-2pt",
              lineHeight: "149 %",
            }}>
            18e 19
          </p>
          <p className='formfiller' style={{ paddingLeft: "8pt" }}>
            20
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "6pt",
            }}>
            21a
          </p>

          <p className='formfiller' style={{ paddingLeft: "8pt" }}>
            23
          </p>

          <p
            className='formfiller'
            style={{
              paddingTop: "6pt",
              paddingLeft: "2pt",
            }}>
            Yes. <span>Complete below.</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "2pt",
            }}>
            No
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "13pt",

              lineHeight: "94 %",
            }}>
            (Other than paid preparer)
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "2pt",
              paddingLeft: "13pt",

              lineHeight: "89 %",
            }}>
            Designee’s name <span>▶</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "2pt",
              paddingLeft: "13pt",

              lineHeight: "89 %",
            }}>
            Phone no. <span>▶</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "2pt",
              paddingLeft: "13pt",

              lineHeight: "89 %",
            }}>
            Personal identification number (PIN) <span>▶</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",
              paddingLeft: "13pt",
            }}>
            Sign Here
          </p>

          <p className='formfiller' style={{ paddingLeft: "13pt" }}>
            Joint return? See instructions. Keep a copy for your records.
          </p>

          <h4
            style={{
              paddingLeft: "13pt",

              lineHeight: "12pt",
            }}>
            Paid
          </h4>
          <p
            className='formfiller'
            style={{
              paddingTop: "5pt",
              paddingLeft: "13pt",
            }}>
            Under penalties of perjury', I declare that I have examined this
            return and accompanying schedules and statements', and to the best
            of my knowledge and belief', they are true', correct', and complete.
            Declaration of preparer (other than taxpayer) is based on all
            information of which preparer has any knowledge.
          </p>
          <p
            className='formfiller'
            style={{
              paddingLeft: "1pt",

              lineHeight: "14pt",
            }}>
            ▲
          </p>
          <input
            className='mx-1'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <p
            className='formfiller'
            style={{
              paddingTop: "5pt",
              paddingLeft: "377pt",
              textIndent: "-363pt",
            }}>
            Your signature Date Your occupation If the IRS sent you an Identity
            Protection PIN', enter it here (see inst.)
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "4pt",
              paddingLeft: "14pt",
            }}>
            Spouse’s signature. If a joint return', <b>both </b>must sign. Date
            Spouse’s occupation If the IRS sent your spouse an
          </p>
          <p
            className='formfiller'
            style={{
              paddingLeft: "377pt",

              lineHeight: "106 %",
            }}>
            Identity Protection PIN', enter it here (see inst.)
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "5pt",
              paddingLeft: "14pt",
            }}>
            Phone no. Email address
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "2pt",
              paddingLeft: "14pt",
            }}>
            Preparer’s name Preparer’s signature Date PTIN Check if:
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "3pt",

              lineHeight: "4pt",
              textAlign: "right",
            }}>
            3rd Party Designee
          </p>
          <h4 style={{ paddingLeft: "13pt" }}>Preparer Use Only</h4>

          <p className='formfiller' style={{ paddingLeft: "13pt" }}>
            Firm’s name <span>▶</span>
          </p>
          <p
            className='formfiller'
            style={{
              paddingTop: "4pt",
              paddingLeft: "13pt",
            }}>
            Firm’s address <span>▶</span>
          </p>

          <p className='formfiller' style={{ paddingLeft: "13pt" }}>
            Phone no.
          </p>

          <p className='formfiller' style={{ paddingLeft: "13pt" }}>
            Firm’s EIN <span>▶</span>
          </p>

          <p className='formfiller' style={{}}>
            Self-employed
          </p>
          <p
            className='formfiller'
            style={{ paddingTop: "2pt", paddingLeft: "13pt" }}>
            <a
              href='http://www.irs.gov/Form1040'
              style={{
                color: "black",
                fontFamily: "Arial",
                fontStyle: "normal",
                fontWeight: "normal",
                textDecoration: "none",
                fontSize: "7pt",
              }}
              target='_blank'>
              {" "}
              Go to{" "}
            </a>
            <span
              style={{
                color: "black",
                fontFamily: "Arial",
                fontStyle: "italic",
                fontWeight: "normal",
                textDecoration: "none",
                fontSize: "7pt",
              }}>
              www.irs.gov/Form1040{" "}
            </span>
            <span>for instructions and the latest information. </span>Form
            <span>1040 </span>(2019)
          </p>
        </div>
      </div>
    </form>
  );
};

export default Free1040Filler;
