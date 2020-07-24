import React, { useState, useContext, useEffect } from "react";
import { pdfjs } from "react-pdf";

import LeadContext from "../../context/lead/leadContext";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PDFViewer = () => {
  const leadContext = useContext(LeadContext);

  const { doc, setDoc } = leadContext;
  const [file, setFile] = useState(null);
  useEffect(() => {
    if (typeof doc === "string") {
      setFile(doc);
    } else if (doc instanceof Blob) {
      setFile(
        URL.createObjectURL(new Blob([doc], { type: "application/pdf" }))
      );
    }
  }, [doc]);

  return (
    <div>
      {doc ? (
        <div>
          {" "}
          <button className='btn-dark btn-sm btn' onClick={() => setDoc()}>
            Clear Doc
          </button>
          <iframe
            style={{ height: "100vh", width: "100vw" }}
            src={file}
            type='application/pdf'
            title='title'
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PDFViewer;
