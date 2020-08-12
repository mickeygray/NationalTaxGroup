import React, { useState, useContext, useEffect, useCallback } from "react";
import UserContext from "../../context/user/userContext";
import StatContext from "../../context/stat/statContext";

const CommissionItem = ({ payment }) => {
  const userContext = useContext(UserContext);
  const statContext = useContext(StatContext);

  console.log(payment);
  const { setSplits } = userContext;
  const { setTrackingPayment, commissionPayment } = statContext;

  useEffect(() => {
    setSplit([]);
  }, []);
  const display = Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: "America/Los_Angeles",
    },
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  ).format(new Date(payment.paymentDate));

  const [split, setSplit] = useState([]);

  const [tracking, setTrackingObj] = useState({});
  const [trackState, setTrackState] = useState(false);
  const [processed, setProcessed] = useState(false);

  const [style, setStyle] = useState({
    backgroundColor: "yellow",
  });

  useEffect(() => {
    if (payment.commissioned === true) {
      setStyle({
        backgroundColor: "green",
      });
    } else {
      setStyle({
        backgroundColor: "yellow",
      });
    }
  }, [payment]);
  const onClick = (e) => {
    setTrackState((prevState) => !prevState);
    setTrackingObj({
      ...tracking,
      [payment.tracking]:
        payment.paymentAmount -
        []
          .concat(
            split.map((split) =>
              Object.values(split)
                ? parseInt([Object.values(split)])
                : parseInt([Object.values(split)])
            )
          )
          .reduce((x, y) => x + y),
    });
  };

  const onClear = (e) => {
    setTrackState((prevState) => !prevState);
    setSplit([]);
    setTrackingObj({});

    e.target.value = "";
  };

  const currentClient = payment.caseId;
  const commissioned = { commissioned: true };

  const onClick2 = (e) => {
    setTrackingPayment(tracking);
    setSplits(split);
    commissionPayment(payment, currentClient, commissioned);
  };

  const onChange = (e) => {
    setSplit(
      Object.entries(
        [
          ...split,
          {
            [e.target.name]:
              0.01 * payment.paymentAmount * e.target.value * 0.2,
          },
        ].reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: value[value.length - 1] };
      })
    );
  };

  return (
    <div className='card' style={style}>
      <h3>{payment.clientName}</h3>
      <h4>{display}</h4>
      <h4>Payment Amount : {payment.paymentAmount}</h4>
      <ul>
        {payment.caseWorkers.map((worker) => (
          <li>
            {worker.name}:{worker.role}{" "}
            <input
              type='text'
              name={worker.name}
              placeHolder='Enter Percent Split'
              onChange={onChange}
            />
          </li>
        ))}
      </ul>
      {trackState ? (
        <button className='btn btn-sm btn-danger' onClick={onClear}>
          Clear Split
        </button>
      ) : (
        <button className='btn btn-sm btn-dark' onClick={onClick}>
          Set Split
        </button>
      )}
      {parseInt(Object.values(tracking)) > 0 ? (
        <button className='btn btn-sm btn-success' onClick={onClick2}>
          Confirm Splits
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default CommissionItem;
