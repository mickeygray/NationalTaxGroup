import React, { useState } from "react";
import { MixedCheckbox, useMixedCheckbox } from "@reach/checkbox";
const LienConditions = () => {
  let [listConditions, setListConditions] = useState({
    isFederal: false,
    isState: false,
    isAbove25000: false,
    isBelow25000: false,
  });
  // We can determine if all or some of the nested checkboxes are selected and
  // use that to determine the state of our parent checkbox.
  let newLead = Object.keys(listConditions).every(
    (condition) => listConditions[condition] === true
  );
  let oldLead = newLead
    ? false
    : Object.keys(listConditions).some(
        (conditions) => listConditions[conditions] === true
      );
  let parentIsChecked = newLead ? true : oldLead ? "Contacted Lead" : false;
  // When we toggle a parent checkbox, we expect all of the nested checkboxes
  // to toggle with it.
  function handleParentChange(event) {
    setListConditions(
      Object.keys(listConditions).reduce(
        (state, condition) => ({
          ...state,
          [condition]: !newLead,
        }),
        {}
      )
    );
  }
  function handleChildChange(event) {
    let { checked, value } = event.target;
    setListConditions({
      ...listConditions,
      [value]: checked,
    });
  }

  return (
    <fieldset>
      <label>
        <MixedCheckbox
          value='listConditions'
          checked={parentIsChecked}
          onChange={handleParentChange}
        />
        {oldLead ? "Please Select Your List Coditions" : "New Lead"}
      </label>
      <fieldset style={{ margin: "1rem 0 0", padding: "1rem 1.5rem" }}>
        <legend>List Conditions</legend>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {Object.entries(listConditions).map(([value, state]) => (
            <li key={value}>
              <label>
                <MixedCheckbox
                  name='conditions'
                  value={value}
                  checked={state}
                  onChange={handleChildChange}
                />
                {value}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </fieldset>
  );
};

export default LienConditions;
