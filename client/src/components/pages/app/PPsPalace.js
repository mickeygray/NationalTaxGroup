import React, { Fragment, useState } from "react";
import Navbar from "../../layout/Navbar";
import PaymentProcessing from "../../PPsPalace/PaymentProcessing";
import CommissionProcessing from "../../PPsPalace/CommissionProcessing";
const PPsPalace = () => {
  const [processing, setProcessing] = useState(true);

  const onChange = (e) => {
    setProcessing((prevState) => !prevState);
  };

  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>

      <div>
        <select name='processing' id='' onChange={onChange}>
          <option value='true'>View Today's Payments</option>
          <option value='false'>View Period Totals</option>
        </select>

        {processing ? <PaymentProcessing /> : <CommissionProcessing />}
      </div>
    </Fragment>
  );
};

export default PPsPalace;
