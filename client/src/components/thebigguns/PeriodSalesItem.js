import React from "react";

const PeriodSalesItem = ({ sales }) => {
  return (
    <div>
      {sales
        ? Object.entries(sales).map(([key, value]) => {
            const { gross, initial, total, redLine, refunded } = value;
            return (
              <div className='card bg-dark'>
                {key} <br />
                <ul style={{ display: "flex" }}>
                  {gross > 0 ? <li className='mx-2'>Gross: {gross} </li> : ""}
                  {redLine > 0 ? (
                    <li className='mx-2'>Redline: {redLine} </li>
                  ) : (
                    ""
                  )}
                  {initial > 0 ? (
                    <li className='mx-2'>Initial: {initial} </li>
                  ) : (
                    ""
                  )}

                  {total > 0 ? <li className='mx-2'>Total: {total} </li> : ""}
                  {refunded > 0 ? (
                    <li className='mx-2'>Refunded: {refunded} </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            );
          })
        : ""}
      ;
    </div>
  );
};

export default PeriodSalesItem;
