import React, { useContext } from "react";
import LeadContext from "../../context/lead/leadContext";

const Upload = () => {
  const leadContext = useContext(LeadContext);

  const { setSelectedFile, uploadFile, updateDb } = leadContext;

  let selectedFile;

  const onChange = (e) => {
    selectedFile = e.target.files[0];
  };

  const onClick = (e) => {
    setSelectedFile(selectedFile);
    uploadFile(selectedFile);
  };

  const onSubmit = (e) => {
    setSelectedFile(selectedFile);
    updateDb(selectedFile);
  };

  return (
    <div>
      <input type='file' name='file' onChange={onChange} />
      <button
        type='submit'
        className='btn btn-light text-danger'
        onClick={onClick}>
        Add New Leads
      </button>
      <button
        type='submit'
        className='btn btn-light text-danger'
        onClick={onSubmit}>
        Update Existing Leads
      </button>
    </div>
  );
};

export default Upload;
