import React, { useState, useContext, useEffect } from "react";
import StatContext from "../../context/stat/statContext";
import LeadContext from "../../context/lead/leadContext";
import leadContext from "../../context/lead/leadContext";

const StatusBar = (props) => {
  const [status, setStatus] = useState(null);

  const leadContext = useContext(LeadContext);

  const { prospect, updateProspectStatus } = leadContext;

  console.log(prospect);
  useEffect(() => {
    if (
      prospect.paymentStatus &&
      prospect.paymentStatus.total > 0 &&
      prospect.resoStatus.representation.length > 0
    ) {
      setStatus("client");
    } else if (
      prospect.paymentStatus &&
      prospect.paymentStatus.percentPaid > 0.85 &&
      prospect.resoStatus.representation.length > 0
    ) {
      setStatus("upsellable");
    } else if (
      prospect.paymentStatus &&
      prospect.paymentStatus.total > 50000 &&
      prospect.resoStatus.representation.length > 0
    ) {
      setStatus("highdollar");
    } else if (
      prospect.paymentStatus &&
      prospect.paymentStatus.redLine > 0 &&
      prospect.resoStatus.representation.length > 0
    ) {
      setStatus("redline");
    } else if (
      prospect.paymentStatus &&
      prospect.paymentStatus.refunded > 0 &&
      prospect.resoStatus.representation.length > 0
    ) {
      setStatus("refunded");
    } else {
      setStatus("prospect");
    }
  }, [prospect, leadContext]);

  console.log(status);

  const onChange = (e) => {
    setStatus({ ...status, [e.target.name]: e.target.checked });
    updateProspectStatus(prospect, status);
  };

  console.log(status);
  console.log(prospect);

  return (
    <div>
      <select name='status' value={status} onChange={onChange}>
        <option></option>
        <option value='prospect' checked={status === "prospect"}>
          Prospect
        </option>
        <option
          value='refunded'
          checked={status === "refunded"}
          onChange={onChange}>
          {" "}
          Refund
        </option>
        <option value='redline' checked={status === "redline"}>
          Redline
        </option>
        <option value='client' checked={status === "client"}>
          Client
        </option>
        <option value='upsellable' checked={status === "upsellable"}>
          Upsellable
        </option>
        <option value='highdollar' checked={status === "highdollar"}>
          Highdollar
        </option>
      </select>
      <button onClick={() => updateProspectStatus(prospect, status)}>
        Trigger Status Update
      </button>
    </div>
  );
};

export default StatusBar;
