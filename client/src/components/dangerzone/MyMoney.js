import React, { useContext, useState, useEffect, useCallback } from "react";
import UserContext from "../../context/user/userContext";
import StatContext from "../../context/stat/statContext";

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

  const { myProspects } = userContext;

  const { userMoney } = statContext;

  useEffect(() => {
    if (myProspects != null) {
      userMoney(myProspects);
    }
  }, [myProspects, userContext]);

  return <div></div>;
};

export default MyMoney;
