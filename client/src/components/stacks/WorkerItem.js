import React, { Fragment, useContext, useState, useEffect } from "react";
import StatContext from "../../context/stat/statContext";
import LeadContext from "../../context/lead/leadContext";

const WorkerItem = (props) => {
  const { filtered } = props;
  const { setWorkers } = useContext(LeadContext);

  console.log(props);

  const [worker, setWorker] = useState("");
  useEffect(() => {
    if (worker != "") {
      setWorkers(worker);
    }
  }, [worker, filtered]);

  const onChange = (e) => {
    setWorker({ ...worker, [e.target.name]: e.target.value });
  };

  console.log(worker);
  console.log(filtered);
  return (
    <Fragment>
      {" "}
      <label htmlFor='cnc'>{filtered.name}</label>
      <input
        name='worker'
        type='checkbox'
        value={filtered.name}
        onChange={onChange}
      />
    </Fragment>
  );
};

export default WorkerItem;
