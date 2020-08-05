import React, { Fragment, useContext, useState, useEffect } from "react";
import StatContext from "../../context/stat/statContext";
import LeadContext from "../../context/lead/leadContext";

const WorkerItem = (props) => {
  const { filtered } = props;
  const { setFilters } = useContext(LeadContext);

  const [checked, setChecked] = useState(false);
  const [worker, setWorker] = useState("");

  useEffect(() => {
    if (checked === true) {
      setFilters(filtered.name);
      setWorker(filtered.name);
    }
    if (checked === false && worker === filtered.name) {
      setFilters(`pop${filtered.name}`);
      setWorker("");
    }
  }, [checked, filtered]);

  const onChange = (e) => {
    setChecked((prevState) => !prevState);
  };

  return (
    <Fragment>
      {" "}
      <label htmlFor='cnc'>{filtered.name}</label>
      <input
        name='worker'
        type='checkbox'
        checked={checked}
        value={filtered.name}
        onChange={onChange}
      />
    </Fragment>
  );
};

export default WorkerItem;
