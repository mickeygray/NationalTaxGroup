import React, { useState } from "react";

const StatusModal = () => {
  const [statusFilter, setStatusFilter] = useState("");

  const onChange = (e) => {
    setStatusFilter({
      [e.target.name]: e.target.value,
    });
    console.log(statusFilter);
  };

  return (
    <div>
      <ul>
        <li>
          {" "}
          <label htmlFor='filedFederal'>Prospect</label>
          <input
            name='statusFilter'
            type='checkbox'
            onChange={onChange}
            value='prospect'
            checked={statusFilter === "prospect"}
          />
        </li>

        <li>
          {" "}
          <label htmlFor='filedFederal'>Client</label>
          <input
            name='statusFilter'
            type='checkbox'
            onChange={onChange}
            value={statusFilter}
            checked={() => setStatusFilter("client")}
          />
        </li>

        <li>
          {" "}
          <label htmlFor='filedFederal'>Upsellable</label>
          <input
            name='statusFilter'
            type='checkbox'
            value='upsellable'
            onChange={onChange}
            checked={statusFilter === "upsellable"}
          />
        </li>
        <li>
          {" "}
          <label htmlFor='filedFederal'>Highdollar</label>
          <input
            name='statusFilter'
            type='checkbox'
            value='highdollar'
            onChange={onChange}
            checked={statusFilter === "highdollar"}
          />
        </li>
        <li>
          {" "}
          <label htmlFor='filedFederal'>Redline</label>
          <input
            name='statusFilter'
            type='checkbox'
            value='redLine'
            onChange={onChange}
            checked={statusFilter === "redline"}
          />
        </li>
        <li>
          {" "}
          <label htmlFor='filedFederal'>Refund</label>
          <input
            name='statusFilter'
            type='checkbox'
            value='refunded'
            onChange={onChange}
            checked={statusFilter === "refund"}
          />
        </li>
      </ul>
    </div>
  );
};

export default StatusModal;
