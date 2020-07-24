import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import LeadContext from "../../context/lead/leadContext";
import UserContext from "../../context/user/userContext";
import DocModal from "./DocModal";

const DocItem = (props) => {
  const { prospect, doc } = props;
  const leadContext = useContext(LeadContext);
  const { getResoStatus, deleteDoc } = leadContext;

  const onClick = (e) => {
    getResoStatus(prospect, doc);
  };

  const [modal, setDocModalState] = useState(false);

  console.log(doc);

  return (
    <Fragment>
      {modal ? <DocModal doc={doc} /> : ""}
      <div
        className='btn btn-dark btn-sm'
        style={{
          backgroundColor: "black",
          marginLeft: "5px",
          width: "150px",
          height: "35px",
        }}>
        {doc.id ? (
          <button
            className='bg-dark'
            style={{
              width: "125px",
            }}
            onClick={onClick}>
            {" "}
            {doc.name}
          </button>
        ) : (
          <button
            className='bg-dark'
            style={{
              width: "125px",
            }}
            onClick={() => setDocModalState((prevState) => !prevState)}>
            {" "}
            {doc.name}
          </button>
        )}
        <button
          style={{
            float: "right",
            width: "18px",
          }}
          onClick={() => deleteDoc()}>
          {" "}
          X
        </button>
      </div>
    </Fragment>
  );
};

export default DocItem;
