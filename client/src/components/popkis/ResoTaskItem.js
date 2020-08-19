import React, { useContext, useState, useEffect, useCallback } from "react";
import LeadContext from "../../context/lead/leadContext";
import UserModal from "./UserModal";
import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/user/userContext";
import Docs from "./Docs";
import { v4 as uuidv4 } from "uuid";
import userContext from "../../context/user/userContext";
const ResoTaskItem = (props) => {
  const {
    putResoStatus,
    getResoStatus,
    postResoStatus,
    popDoc,
    deleteDoc,
    setDoc,
    prospect,
  } = useContext(LeadContext);

  const {
    users,
    reminded,
    getUserReminded,
    postTask,
    getAssigned,
    assignments,
  } = useContext(UserContext);

  const { user } = useContext(AuthContext);

  const [assignment, setAssignment] = useState({
    clientName: "",
    clientId: "",
    assignedDate: "",
    updatedDate: "",
    assigned: "",
    id: uuidv4(),
    assignment: "",
  });
  const { assigned, assignedDate } = assignment;

  const { doc, resoStatus, reso } = props;

  const { endpoint } = doc;
  const onClick = (e) => {
    getUserReminded(query);
    setModal(true);
  };

  const {
    representation,
    federalFile,
    stateFile,
    paymentPlan,
    corp,
    annuity,
    offer,
    hardship,
    appeal,
  } = resoStatus;
  useEffect(() => {
    getAssigned(prospect, doc);
  }, []);

  useEffect(() => {
    if (assignments != null) {
      setAssignment({
        clientName: prospect.fullName,
        assignedDate: Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }).format(assignments.postedDate),
        updatedDate: "",
        id: uuidv4(),
        assignment: doc.name,
        assigned: assignments.assigned,
        clientId: prospect._id,
      });
    } else {
      setAssignment({
        clientName: "",
        id: uuidv4(),
        clientId: "",
        assignedDate: "",
        updatedDate: "",
        assigned: "",
        assignment: "",
      });
    }
  }, [assignments, userContext]);

  console.log(doc);
  useEffect(() => {
    if (reminded != null) {
      setAssignment({
        clientName: prospect.fullName,
        assignedDate: Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }).format(Date.now()),
        updatedDate: "",
        id: "",
        assignment: doc.name,
        assigned: reminded.name,
        clientId: prospect._id,
      });
    } else {
      setAssignment({
        clientName: "",
        id: "",
        clientId: "",
        assignedDate: "",
        updatedDate: "",
        assigned: "",
        assignment: "",
      });
    }
  }, [reminded, userContext]);

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);

  const onUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("name", prospect._id + "/" + doc.endpoint + "/" + doc.name);
    formData.append("file", file);
    formData.append("prospectId", prospect._id);
    formData.append("document", file.name);
    formData.append("id", uuidv4());
    formData.append(
      "updatedDate",
      Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(Date.now())
    );

    putResoStatus(prospect, formData, endpoint, config, doc);
  };

  console.log(doc);
  const onChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };
  const toggleModal = useCallback(() => {
    setModal((prevState) => !prevState);
  }, []);

  const searchedArray = eval("prospect.resoStatus." + doc.endpoint);

  const onClick2 = (e) => {
    const formData = {
      assigned: reminded,
      name: prospect._id + "/" + doc.endpoint + "/" + doc.name,
      postedDate: new Date(Date.now()),
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    postTask(assignment, reminded);
    postResoStatus(prospect, formData, endpoint, config);
  };
  /*
  let dateDisplay2 = new Date(updatedDate);
  let formattedUpdatedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(dateDisplay2);
*/

  return (
    <div className='card bg-white' style={{ width: "300px" }}>
      <h5>{doc.name}</h5>
      <p>Assigned to: {assigned}</p>
      <p>Assigned on: {assignedDate}</p>{" "}
      <button className='btn-dark btn-sm btn' onClick={() => setDoc()}>
        Clear Doc
      </button>{" "}
      <button
        className='btn-dark btn-sm btn '
        onClick={() => setDoc(doc.document)}>
        View Doc
      </button>
      <button className='btn-dark btn-sm btn ' onClick={onClick2}>
        Assign
      </button>
      <form action='post' className='card' onSubmit={onSubmit}>
        <label htmlFor='file'>Attach updated Tax Document</label>
        <input type='file' name='file' id='doc' onChange={onUpload} />
        <input
          type='submit'
          value='Update Doc'
          className='btn-light btn-block btn m-1 all-center'
          style={{ width: "200px" }}
        />
      </form>
      <input
        type='text'
        name='query'
        placeholder='Search For A User'
        onChange={onChange}
      />
      {modal ? <UserModal toggleModal={toggleModal} users={users} /> : ""}
      <button className='btn btn-block btn-primary' onClick={onClick}>
        Assign User
      </button>
    </div>
  );
};

export default ResoTaskItem;
