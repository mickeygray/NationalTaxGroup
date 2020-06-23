import React, { useContext, useRef, useEffect } from "react";
import CallContext from "../../../context/call/callContext";

const Filter = () => {
  const callContext = useContext(CallContext);
  const text = useRef("");

  const { filterCalls, clearFilter, filtered } = callContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterCalls(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter recent calls...'
        onChange={onChange}
      />
    </form>
  );
};

export default Filter;
