import React, { useContext } from "react";
import LeadContext from "../../context/lead/leadContext";
import CSVReader from "react-csv-reader";

const Upload = () => {
  const leadContext = useContext(LeadContext);

  const { uploadFile } = leadContext;

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => toCamelCaseString(header),
  };

  function convertToString(input) {
    if (input) {
      if (typeof input === "string") {
        return input;
      }

      return String(input);
    }
    return "";
  }

  // convert string to words
  function toWords(input) {
    input = convertToString(input);

    var regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;

    return input.match(regex);
  }

  // convert the input array to camel case
  function toCamelCase(inputArray) {
    let result = "";

    for (let i = 0, len = inputArray.length; i < len; i++) {
      let currentStr = inputArray[i];

      let tempStr = currentStr.toLowerCase();

      if (i != 0) {
        // convert first letter to upper case (the word is in lowercase)
        tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
      }

      result += tempStr;
    }

    return result;
  }

  // this function call all other functions

  function toCamelCaseString(header) {
    let words = toWords(header);

    return toCamelCase(words);
  }
  return (
    <div>
      <CSVReader
        label='Upload Leads'
        parserOptions={papaparseOptions}
        onFileLoaded={(data, fileInfo) => uploadFile(data)}
        inpuId='leads'
        inputStyle={{ color: "red" }}
      />
    </div>
  );
};

export default Upload;
