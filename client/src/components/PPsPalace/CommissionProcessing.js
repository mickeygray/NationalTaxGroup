import React, { useEffect, useContext } from "react";
import UserContext from "../../context/user/userContext";
import StatContext from "../../context/stat/statContext";
import CommissionItem from "./CommissionItem";
const CommissionProcessing = () => {
  const userContext = useContext(UserContext);
  const statContext = useContext(StatContext);

  const { getPeriodPay, periodPay } = userContext;
  const { period } = statContext;

  useEffect(() => {
    getPeriodPay(period);
  }, []);

  console.log(periodPay);
  return (
    <div className='grid-4'>
      {periodPay
        ? periodPay
            .filter((payment) => payment.paymentId.length > 20)
            .map((payment) => (
              <CommissionItem key={payment._id} payment={payment} />
            ))
        : ""}
    </div>
  );
};

export default CommissionProcessing;
