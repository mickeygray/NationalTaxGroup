import React, { Fragment, useContext, useState, useEffect } from "react";
import StatContext from "../../context/stat/statContext";
import LeadContext from "../../context/lead/leadContext";

const WorkerItem = (props) => {
  const { filtered } = props;
  const { setFilters } = useContext(LeadContext);

  const [array, setWorkers] = useState([]);

  useEffect(() => {
    if (array.length > 0 && new Set(array).size !== array.length) {
      function filterByCount(array, count) {
        return array.filter(function (value) {
          return (
            array.filter(function (v) {
              return v === value;
            }).length === count
          );
        });
      }

      setWorkers(filterByCount(array, 1));
      setFilters(array);
    } else if (array.length === 1) setFilters(array);
  }, [array]);

  const onChange = (e) => {
    setWorkers([...array, e.target.value]);
  };

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
