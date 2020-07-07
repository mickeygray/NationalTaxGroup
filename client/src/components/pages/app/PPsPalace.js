import React, { Fragment } from "react";
import Navbar from "../../layout/Navbar";
import PaymentProcessing from "../../PPsPalace/PaymentProcessing";
import InvoiceEntry from "../../PPsPalace/InvoiceEntry";
const PPsPalace = () => {
  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>

      <div>
        <PaymentProcessing />
      </div>
    </Fragment>
  );
};

export default PPsPalace;
