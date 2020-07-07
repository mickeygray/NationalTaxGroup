import React from "react";

import PaymentSchedule from "./PaymentSchedule";

const PaymentScheduleModal = (props) => (
  <>
    <div className='card container'>
      <button onClick={props.togglePaymentScheduleState}>X</button>
      <PaymentSchedule {...props} />
    </div>
  </>
);

export default PaymentScheduleModal;
