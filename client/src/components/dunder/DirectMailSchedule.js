import React, { useContext } from "react";
import MailContext from "../../context/mail/mailContext";
import DirectMailEntry from "./DirectMailEntry";
import DirectMailItem from "./DirectMailItem";

const DirectMailSchedule = (props) => {
  const mailContext = useContext(MailContext);

  const { scheduleObj } = mailContext;

  const sched = Object.assign(
    {},
    ...Object.keys(scheduleObj).map((k) => ({
      [k]: scheduleObj[k].map((entry) => (
        <DirectMailItem key={entry._id} entry={entry} />
      )),
    }))
  );

  console.log(
    Object.assign(
      {},
      ...Object.keys(scheduleObj)
      .map((k) => ({
        [k]: scheduleObj[k].map((entry) => entry),
      }))
    )
  );

  return (
    <div>
      <div>
        <DirectMailEntry />
      </div>

      <div className='grid-5'>
        {Object.entries(sched)
          .sort((a, b) => (a > b ? 1 : -1))
          .map((sched) => (
            <div style={{ display: "flex" }}>{sched}</div>
          ))}
      </div>
    </div>
  );
};

export default DirectMailSchedule;
