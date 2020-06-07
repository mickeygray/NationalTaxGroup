import React from "react";
import ListConditions from "./ListConditions";
import LienConditions from "./LienConditions";

const ListBuilder = () => {
  const listConditions = {
    isFederal: false,
    isState: false,
    isAbove25000: false,
    isBelow25000: false,
    notDNC: false,
    notContacted: false,
    notClicked: false,
    notClient: false,
  };

  const onChange = (e) => {
    console.log(listConditions);
  };
  console.log(listConditions);

  return (
    <div className='grid-2'>
      <ListConditions />
    </div>
  );
};
export default ListBuilder;
