import React, { useContext } from "react";
import MailContext from "../../context/mail/mailContext";
import DirectMailEntry from "./DirectMailEntry";

const DirectMailSchedule = (props) => {
  const { mailSchedule } = props;

  const mailContext = useContext(MailContext);
  const inputs = [];

  return (
    <div>
      <DirectMailEntry />{" "}
    </div>
  );
};

export default DirectMailSchedule;
