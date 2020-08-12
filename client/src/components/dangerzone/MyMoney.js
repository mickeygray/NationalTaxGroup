import React, { useContext, useState, useEffect, useCallback } from "react";
import UserContext from "../../context/user/userContext";
import StatContext from "../../context/stat/statContext";
import AuthContext from "../../context/auth/authContext";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import MoneyChart from "./MoneyChart";
//view today
//view period
//view month

//total deals
//total prospects
//total money
//initial money

//call statistics?

const MyMoney = () => {
  const statContext = useContext(StatContext);
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  const { myProspects } = userContext;

  const { userMoney } = statContext;
  const [ranges, setRanges] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    setRanges([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  }, []);
  useEffect(() => {
    if (myProspects != null) {
      userMoney(myProspects, user);
    }
  }, [myProspects, userContext]);

  useEffect(() => {
    if (ranges.endDate > 0) {
      userMoney(myProspects, user, ranges);
    }
  }, [ranges, userContext]);

  console.log(ranges);
  return (
    <div>
      <div>
        <MoneyChart />
      </div>

      <div>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setRanges([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={ranges}
        />
      </div>
    </div>
  );
};

export default MyMoney;
