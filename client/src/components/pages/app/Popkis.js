import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  Fragment,
} from "react";
import LeadCalls from "../../calls/LeadCalls";
import Notes from "../../popkis/Notes";
import NotePad from "../../popkis/NotePad";
import StatusBox from "../../popkis/StatusBox";
import Navbar from "../../layout/Navbar";
import PopkisForm from "../../popkis/PopkisForm";

import leadContext from "../../../context/lead/leadContext";
import PDFviewer from "../../popkis/PDFviewer";

const Popkis = ({ match }) => {
  const {
    setProspect,
    getProspect,
    prospect,
    notes,
    setNotes,
    deleteDups,
    doc,
  } = useContext(leadContext);

  useEffect(() => {
    getProspect(match.params.id);

    if (prospect) {
      deleteDups(prospect);
    }
  }, []);

  console.log(doc);
  const [pdfState, setPdfState] = useState(false);

  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>

      <div>
        <StatusBox prospect={prospect} />

        <div className='grid-6'>
          <div className='grid-popkis'>
            <div>
              {doc ? (
                ""
              ) : (
                <Fragment>
                  <Notes prospect={prospect} />
                  <hr />
                  <NotePad prospect={prospect} />
                </Fragment>
              )}
            </div>
            <div>
              {doc ? (
                <PDFviewer doc={doc} />
              ) : (
                <PopkisForm prospect={prospect} />
              )}
            </div>
            <div>{doc ? "" : <LeadCalls prospect={prospect} />}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Popkis;
