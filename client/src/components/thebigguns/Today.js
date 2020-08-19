import React from "react";
import TodayTrackingItem from "./TodayTrackingItem";
import TodaySalesItem from "./TodaySalesItem";

const Today = (props) => {
  const { today } = props;

  const {
    todayPayments,
    todayPaymentAmount,
    todayRedlineAmount,
    todayRedlineCount,
    todayRefundCount,
    todayRefundAmount,
    todayNewPaymentAmount,
    todayPaymentMin,
    todayPaymentMax,
    todayNewPaymentMin,
    todayNewPaymentMax,
    todayRecurringPaymentAmount,
    todayClientCount,
    todayClients,
    todayAvgPayment,
    todayTrackingPayments,
    todayCallIds,
    todayNewGross,
    todayNewInitial,
    todayNewTotal,
    todayAvgGross,
    todayAvgInitial,
    todayAvgTotal,
    todaySalesPayments,
    todayCalls,
    todayProspects,
    todayLeads,
  } = today;
  return (
    <div>
      <h3 className='text-center'>TODAY</h3>
      <nav className='card bg-success text-danger'>
        <h4>Payment Summary</h4>
        <ul style={{ display: "flex" }}>
          <li className='text-center'>
            Total Payments:
            <br />${todayNewTotal}
          </li>
          <li className='text-center'>
            New Payments: <br /> ${todayNewPaymentAmount}
          </li>

          <li className='text-center'>
            Recurring Payments: <br /> ${todayRecurringPaymentAmount}
          </li>
          <li className='text-center'>
            New Client Count: <br /> {todayClientCount}
          </li>
          <li className='text-center'>
            Average Payment: <br /> ${todayAvgPayment}
          </li>
          <li className='text-center'>
            Highest Payment: <br /> ${todayPaymentMax}
          </li>
        </ul>
      </nav>

      <br />

      <nav className='card bg-primary text-success'>
        <h4>New Client Totals And Averages</h4>
        <ul style={{ display: "flex" }}>
          <li className='text-center mx-2'>
            Total
            <br /> Gross: <br /> ${todayNewGross}
          </li>
          <li className='text-center mx-2'>
            Average
            <br /> Gross: <br /> ${todayAvgGross && todayAvgGross.toFixed(2)}
          </li>
          <li className='text-center mx-2'>
            Total
            <br /> Initial: <br /> ${todayNewInitial}
          </li>
          <li className='text-center mx-2'>
            Average <br />
            Initial: <br /> ${todayAvgInitial && todayAvgInitial.toFixed(2)}
          </li>
          <li className='text-center mx-2'>
            Total...
            <br /> Totals?: <br /> ${todayNewTotal}
          </li>
          <li className='text-center mx-2'>
            Average <br />
            Total: <br /> ${todayAvgTotal && todayAvgTotal.toFixed(2)}
          </li>
        </ul>
      </nav>
      <br />
      <nav className='card bg-danger text-success'>
        <h4>Refunds and Redlines</h4>
        <ul style={{ display: "flex" }}>
          <li className='mx-2 text-center'>
            Refunded
            <br /> Amount : <br /> {todayRefundAmount}
          </li>
          <li className='mx-2 text-center'>
            Refunded
            <br /> Payments : <br /> {todayRefundCount}
          </li>
          <li className='mx-2 text-center'>
            Redlined
            <br /> Amount : <br /> {todayRedlineAmount}
          </li>
          <li className='mx-2 text-center'>
            {" "}
            Refunded
            <br /> Payments : <br /> {todayRedlineCount}
          </li>
        </ul>
      </nav>
      <br />
      <nav className='card bg-primary text-success'>
        <h4>Lead, Prospect and Call Count</h4>
        <ul style={{ display: "flex" }}>
          <li className='mx-2 text-center'>
            Leads
            <br /> Added : <br /> {todayLeads && todayLeads.length}
          </li>
          <li className='mx-2 text-center'>
            Prospects
            <br /> Added : <br /> {todayProspects && todayProspects.length}
          </li>
          <li className='mx-2 text-center'>
            New
            <br /> Calls : <br /> {todayCalls && todayCalls.length}
          </li>
          <li className='mx-2 text-center'>
            Close <br /> Rate : <br /> %
            {todayClients &&
              (todayClients.length / todayProspects.length) * 100}
          </li>
        </ul>
      </nav>

      <br />
      <div>
        {todayTrackingPayments &&
          todayTrackingPayments.map((tracking) => (
            <TodayTrackingItem
              key={Object.keys(tracking)}
              tracking={tracking}
            />
          ))}
      </div>
      <div>
        {todaySalesPayments &&
          todaySalesPayments.map((sales) => (
            <TodaySalesItem key={Object.keys(sales)} sales={sales} />
          ))}
      </div>
    </div>
  );
};

export default Today;
