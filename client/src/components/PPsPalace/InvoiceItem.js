import React from "react";

const InvoiceItem = () => {
  return (
    <div>
      <Fragment>
        <label htmlFor='quote'>Card Type</label>
        <input type='text' value={ccType} name='ccType' onChange={onChange} />
        <label htmlFor='quote'>Name on Card</label>
        <input type='text' value={ccName} name='ccName' onChange={onChange} />
        <label htmlFor='quote'>Credit Card Number</label>
        <input type='text' value={ccNo} name='ccNo' onChange={onChange} />
        <label htmlFor='quote'>Credit Card Expiry</label>
        <input type='text' value={ccExp} name='ccExp' onChange={onChange} />
        <label htmlFor='quote'>Credit Card Security Code</label>
        <input type='text' value={ccSec} name='ccExp' onChange={onChange} />
        <label htmlFor='quote'>Credit Card Zip</label>
        <input type='text' value={ccZip} name='ccZip' onChange={onChange} />

        <button onClick={onClick}>Update Credit Card</button>
      </Fragment>
    </div>
  );
};

export default InvoiceItem;
