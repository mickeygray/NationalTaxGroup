import React from "react";

const TenFortyItem = (props) => {
  const updateForm = props.updateForm;

  const form = props.form;

  const name = Object.values(form);
  return (
    <div className='grid-1040' style={{ width: "100px", fontSize: ".6rem" }}>
      <div
        style={{
          height: "12pt",
          width: "22pt",
          border: "1pt solid",

          backgroundColor: "#DCFFFA",
        }}>
        {name}
      </div>
      <div>
        <input
          onChange={updateForm}
          type='text'
          placeholder={name}
          name={name}
          style={{
            height: "12pt",
            width: "150pt",
            fontSize: ".6rem",
            margin: "0",
            padding: "0",
            border: "1pt solid",
            backgroundColor: "#f4f4f4",
          }}
        />
      </div>
    </div>
  );
};

export default TenFortyItem;
