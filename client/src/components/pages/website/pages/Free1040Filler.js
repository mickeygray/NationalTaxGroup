import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  Fragment,
} from "react";
import LeadContext from "../../../../context/lead/leadContext";
import TenFourtyItem from "../Free1040Filler/TenFourtyItem";
import StickyNavbar from "../../../layout/StickyNavbar";

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
      address: "",
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
    address: "",
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

  const updateForm = useCallback(
    (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    },
    [form]
  );

  console.log(form);
  const formFields = Object.entries(form);

  return (
    <Fragment>
      <Fragment>
        <StickyNavbar />
      </Fragment>
      <form style={tenStyle}>
        {formFields.map((form) => (
          <TenFourtyItem
            key={Object.values(form)}
            updateForm={updateForm}
            form={form}
          />
        ))}
      </form>
    </Fragment>
  );
};

const tenStyle = {
  display: "grid",
  gridTemplateColumns: "200px 200px 200px",
};

export default Free1040Filler;
