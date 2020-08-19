import React from "react";
import PeriodTrackingItem from "./PeriodTrackingItem";
import PeriodSalesItem from "./PeriodSalesItem";

const Period = (props) => {
  const { periodPaymentSummary } = props;

  const {
    periodPayments,
    periodPaymentAmount,
    periodRedlineAmount,
    periodRefundAmount,
    periodRefundCount,
    periodRedlineCount,
    periodNewPaymentAmount,
    periodPaymentMin,
    periodPaymentMax,
    periodNewPaymentMin,
    periodNewPaymentMax,
    periodRecurringPaymentAmount,
    periodClientCount,
    periodClients,
    periodAvgPayment,
    periodTrackingPayments,
    periodNewGross,
    periodNewInitial,
    periodNewTotal,
    periodAvgGross,
    periodAvgInitial,
    periodAvgTotal,
    periodSalesPayments,
    periodCalls,
    periodProspects,
    periodLeads,
  } = periodPaymentSummary;

  return (
    <div>
      <h3 className='text-center'>period</h3>
      <nav className='card bg-success text-danger'>
        <h4>Payment Summary</h4>
        <ul style={{ display: "flex" }}>
          <li className='text-center'>
            Total Payments:
            <br />${periodNewTotal}
          </li>
          <li className='text-center'>
            New Payments: <br /> ${periodNewPaymentAmount}
          </li>

          <li className='text-center'>
            Recurring Payments: <br /> ${periodRecurringPaymentAmount}
          </li>
          <li className='text-center'>
            New Client Count: <br /> {periodClientCount}
          </li>
          <li className='text-center'>
            Average Payment: <br /> ${periodAvgPayment}
          </li>
          <li className='text-center'>
            Highest Payment: <br /> ${periodPaymentMax}
          </li>
        </ul>
      </nav>

      <br />

      <nav className='card bg-primary text-success'>
        <h4>New Client Totals And Averages</h4>
        <ul style={{ display: "flex" }}>
          <li className='text-center mx-2'>
            Total
            <br /> Gross: <br /> ${periodNewGross}
          </li>
          <li className='text-center mx-2'>
            Average
            <br /> Gross: <br /> ${periodAvgGross && periodAvgGross.toFixed(2)}
          </li>
          <li className='text-center mx-2'>
            Total
            <br /> Initial: <br /> ${periodNewInitial}
          </li>
          <li className='text-center mx-2'>
            Average <br />
            Initial: <br /> ${periodAvgInitial && periodAvgInitial.toFixed(2)}
          </li>
          <li className='text-center mx-2'>
            Total...
            <br /> Totals?: <br /> ${periodNewTotal}
          </li>
          <li className='text-center mx-2'>
            Average <br />
            Total: <br /> ${periodAvgTotal && periodAvgTotal.toFixed(2)}
          </li>
        </ul>
      </nav>
      <br />
      <nav className='card bg-danger text-success'>
        <h4>Refunds and Redlines</h4>
        <ul style={{ display: "flex" }}>
          <li className='mx-2 text-center'>
            Refunded
            <br /> Amount : <br /> {periodRefundAmount}
          </li>
          <li className='mx-2 text-center'>
            Refunded
            <br /> Payments : <br /> {periodRefundCount}
          </li>
          <li className='mx-2 text-center'>
            Redlined
            <br /> Amount : <br /> {periodRedlineAmount}
          </li>
          <li className='mx-2 text-center'>
            {" "}
            Refunded
            <br /> Payments : <br /> {periodRedlineCount}
          </li>
        </ul>
      </nav>
      <br />
      <nav className='card bg-primary text-success'>
        <h4>Lead, Prospect and Call Count</h4>
        <ul style={{ display: "flex" }}>
          <li className='mx-2 text-center'>
            Leads
            <br /> Added : <br /> {periodLeads && periodLeads.length}
          </li>
          <li className='mx-2 text-center'>
            Prospects
            <br /> Added : <br /> {periodProspects && periodProspects.length}
          </li>
          <li className='mx-2 text-center'>
            New
            <br /> Calls : <br /> {periodCalls && periodCalls.length}
          </li>
          <li className='mx-2 text-center'>
            Close <br /> Rate : <br /> %
            {periodClients &&
              (periodClients.length / periodProspects.length) * 100}
          </li>
        </ul>
      </nav>

      <br />
      <div>
        {periodTrackingPayments &&
          periodTrackingPayments.map((tracking) => (
            <PeriodTrackingItem tracking={tracking} />
          ))}
      </div>
      <div>
        {periodSalesPayments &&
          periodSalesPayments.map((sales) => <PeriodSalesItem sales={sales} />)}
      </div>
    </div>
  );
};

export default Period;
