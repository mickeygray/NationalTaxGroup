import React, { useContext, useEffect, useState, Fragment } from "react";
import LeadContext from "../../context/lead/leadContext";

const LeadForm = () => {
  const leadContext = useContext(LeadContext);

  const {
    clearLiens,
    setCurrent,
    letCall,
    number,
    clearNumber,
    addLead,
    postLogics,
    current,
  } = leadContext;

  useEffect(() => {
    if (current !== null) {
      setRecord(current);
    } else {
      setRecord({
        fullName: "",
        deliveryAddress: "",
        city: "",
        state: "",
        zip4: "",
        plaintiff: "",
        amount: "",
        lienid: "",
        pinCode: "",
        emailAddress: "",
      });
    }
  }, [current, leadContext]);

  useEffect(() => {
    if (number !== null) {
      setCall({ phone: number });
    } else {
      setCall({ phone: "" });
    }
  }, [number, leadContext]);

  const [record, setRecord] = useState({
    fullName: "",
    deliveryAddress: "",
    city: "",
    state: "",
    zip4: "",
    plaintiff: "",
    amount: "",
    lienid: "",
    pinCode: "",
    emailAddress: "",
  });

  const [call, setCall] = useState({
    phone: "",
  });

  const [open, setOpen] = useState({
    compliant: "filed",
    filingStatus: "married",
    cpa: "cpa",
    ssn: "",
    noteText: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    if (Object.keys(record).includes(name)) {
      setRecord((prev) => ({ ...prev, [name]: value }));
    }
    if (Object.keys(call).includes(name)) {
      setCall((prev) => ({ ...prev, [name]: value }));
    }
    if (Object.keys(open).includes(name)) {
      setOpen((prev) => ({ ...prev, [name]: value }));
    }
  };

  /*
  const onChange = e => {
    setRecord({...name, address, city, state, zip, plaintiff, amount, [e.target.name]: e.target.value });
    setCall({...phone, [e.target.name]: e.target.value });
    setOpen({...email, lexId, compliant, filingStatus, cpa, ssn, noteText, [e.target.name]: e.target.value});
  }
*/
  const {
    fullName,
    emailAddress,
    deliveryAddress,
    city,
    state,
    zip4,
    plaintiff,
    amount,
    lienid,
    pinCode,
  } = record;
  const { phone } = call;
  const { compliant, filingStatus, cpa, ssn, noteText } = open;

  const prospect = {
    phone,
    fullName,
    deliveryAddress,
    city,
    state,
    zip4,
    plaintiff,
    amount,
    lienid,
    emailAddress,
    pinCode,
    compliant,
    filingStatus,
    cpa,
    ssn,
    noteText,
  };
  console.log(prospect);
  const clearLead = () => {
    clearNumber();
    setCurrent(null);
    setRecord({
      fullName: "",
      deliveryAddress: "",
      city: "",
      state: "",
      zip4: "",
      plaintiff: "",
      taxAmount: "",
      lienid: "",
    });
    setCall({
      phone: "",
    });

    setOpen({
      email: "",
      compliant: "filed",
      filingStatus: "m",
      cpa: "cpa",
      noteText: "",
      ssn: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addLead(prospect);
    clearAll();
  };

  const clearAll = () => {
    clearLiens();
    clearLead();
  };

  const onClick = (e) => {
    letCall(number);
  };

  return (
    <Fragment>
      <p className='text-center'>
        <strong className='text-danger  large'>Ship Em!</strong>
      </p>

      <form onSubmit={onSubmit}>
        <div className='container grid-2'>
          <div className='card'>
            <input
              type='text'
              placeholder='Full Name'
              name='fullName'
              value={fullName}
              onChange={onChange}
            />

            <input
              type='text'
              placeholder='Address'
              name='deliveryAddress'
              value={deliveryAddress}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='City'
              name='city'
              value={city}
              onChange={onChange}
            />

            <input
              type='text'
              placeholder='State'
              name='state'
              value={state}
              onChange={onChange}
            />

            <input
              type='text'
              placeholder='Zip Code'
              name='zip4'
              value={zip4}
              onChange={onChange}
            />

            <input
              type='text'
              placeholder='Plaintiff'
              name='plaintiff'
              value={plaintiff}
              onChange={onChange}
            />

            <input
              type='text'
              placeholder='Tax Debt'
              name='amount'
              value={amount}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='Social Security Number'
              name='ssn'
              value={ssn}
              onChange={onChange}
            />
          </div>
          <div className='card'>
            <input
              type='text'
              placeholder='Phone Number'
              name='phone'
              value={phone}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='E-Mail'
              name='email'
              value={emailAddress}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='Pin Code'
              name='pinCode'
              value={pinCode}
              onChange={onChange}
            />
            <div>
              <h5 className='text-center'>Compliance Status</h5>
              <input
                type='radio'
                name='compliant'
                value='filed'
                checked={compliant === "filed"}
                onChange={onChange}
              />{" "}
              Filed{" "}
              <input
                type='radio'
                name='compliant'
                value='unfiled'
                checked={compliant === "unfiled"}
                onChange={onChange}
              />{" "}
              Unfiled
            </div>
            <div>
              <h5 className='text-center'>Marital Status</h5>
              <input
                className=''
                type='radio'
                name='filingStatus'
                value='married'
                checked={filingStatus === "married"}
                onChange={onChange}
              />{" "}
              Married{"   "}
              <input
                type='radio'
                name='filingStatus'
                value='single'
                checked={filingStatus === "single"}
                onChange={onChange}
              />{" "}
              Single{"   "}
            </div>
            <h5 className='text-center'>Tax Representation</h5>
            <input
              type='radio'
              name='cpa'
              value='cpa'
              checked={cpa === "cpa"}
              onChange={onChange}
            />{" "}
            CPA{" "}
            <input
              type='radio'
              name='cpa'
              value='nocpa'
              checked={cpa === "nocpa"}
              onChange={onChange}
            />
            NO CPA{" "}
          </div>
        </div>
        <div className='card all-center'>
          <textarea
            value={noteText}
            placeholder='notes'
            name='noteText'
            onChange={onChange}
          />
        </div>

        <div>
          <input
            type='submit'
            className='btn btn-danger btn-block'
            value='Ship Em!'
          />
        </div>
        <div>
          <input
            type='submit'
            className='btn btn-light btn-block'
            value='Clear'
          />
        </div>
      </form>
    </Fragment>
  );
};

export default LeadForm;
