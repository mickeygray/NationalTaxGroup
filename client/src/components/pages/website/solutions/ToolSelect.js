import React, { Fragment, useState, useEffect } from "react";

const ToolSelect = () => {
  const [price, setPrice] = useState(0);
  const [clicked, setClicked] = useState("");

  let cost = 0;

  useEffect(() => {
    if (clicked === "starter") {
      setPrice(1000);
    } else if (clicked === "essential") {
      setPrice(2000);
    } else if (clicked === "accrual") {
      setPrice(price * 1.2);
    } else if (clicked === "cash") {
      setPrice(price * 1.1);
    } else if (clicked === "pr") {
      setPrice(price + 1250);
    } else if (clicked === "tp") {
      setPrice(price + 750);
    } else if (clicked === "compliance") {
      setPrice(price + 2000);
    } else if (clicked === "entity") {
      setPrice(price + 400);
    }
  }, [clicked, setPrice, price]);

  useEffect(() => {
    if (price !== 0) {
      cost = price.toFixed(2);
    }
  }, [price, cost]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <h3 className='lead text-center text-primary'>Estimate Your Fees</h3>
      <div className='container bg-dark grid-3' style={{ width: "90%" }}>
        <div>
          <br />
          <ul>
            <li className='card bg-success'>Do I have to file</li>
            <li className='card bg-success'>Up Front Fee</li>
            <li className='card bg-success'>Do I have debt</li>
            <li className='card bg-success py-3'> Additional Services </li>
            <li className='card bg-success'>One Time Payment</li>
          </ul>
        </div>
        <div>
          <br />
          <form onSubmit={onSubmit}>
            <ul>
              <li className='card bg-light' style={{ height: "3.8rem" }}>
                <button
                  onClick={() => setClicked("starter")}
                  className='btn btn-primary btn-block'>
                  File Federal Only
                </button>
              </li>
              <li className='card bg-light' style={{ height: "3.8rem" }}>
                <h4 className='lead all-center'>
                  <span
                    className={
                      clicked === "starter" ? "text-primary" : "text-dark"
                    }>
                    $1000
                  </span>
                </h4>
              </li>
              <li className='card grid-2 bg-light' style={{ height: "3.8rem" }}>
                <div>
                  <h2>
                    <button
                      onClick={() => setClicked("cash")}
                      className='btn btn-danger btn-sm'
                      style={{ margin: "auto" }}>
                      Under 10k
                    </button>
                  </h2>
                </div>
                <div>
                  <h2>
                    <button
                      onClick={() => setClicked("accrual")}
                      className='btn btn-primary btn-sm'
                      style={{ margin: "auto" }}>
                      Over 10k
                    </button>
                  </h2>
                </div>
              </li>

              <li className='card bg-light'>
                <div className='grid-2'>
                  <div>
                    <h2>
                      <button
                        onClick={() => setClicked("entity")}
                        className='btn btn-primary btn-sm my'
                        style={{ marginLeft: "20px" }}>
                        Entity
                      </button>
                      <button
                        onClick={() => setClicked("compliance")}
                        className='btn btn-success btn-sm'
                        style={{ marginLeft: "20px" }}>
                        Compliance
                      </button>
                    </h2>
                  </div>
                  <div>
                    <h2>
                      <button
                        onClick={() => setClicked("tp")}
                        className='btn btn-primary btn-sm my'
                        style={{ marginLeft: "20px" }}>
                        Taxes
                      </button>
                      <br className='' />

                      <button
                        onClick={() => setClicked("pr")}
                        className='btn btn-danger btn-sm'
                        style={{ marginLeft: "20px" }}>
                        Payroll
                      </button>
                    </h2>
                  </div>
                </div>
              </li>
              <li>
                <div className='text-center gridspan' style={{ width: "200%" }}>
                  <h4>
                    <span
                      className='text-center lead'
                      style={{ width: "200%", height: "200%" }}>
                      {price !== 0 ? "$" + price.toFixed(2) : ""}
                    </span>
                  </h4>
                </div>
              </li>
            </ul>
          </form>
        </div>

        <div>
          <br />
          <form onSubmit={onSubmit}>
            <ul>
              <li className='card bg-light' style={{ height: "3.8rem" }}>
                <button
                  onClick={() => setClicked("essential")}
                  className='btn btn-primary btn-block'>
                  File State and Federal
                </button>
              </li>
              <li className='card bg-light' style={{ height: "3.8rem" }}>
                <h4 className='lead all-center'>
                  <span
                    className={
                      clicked === "essential" ? "text-primary" : "text-dark"
                    }>
                    $2000
                  </span>
                </h4>
              </li>
              <li className='card grid-2 bg-light' style={{ height: "3.8rem" }}>
                <div>
                  <h2>
                    <button
                      onClick={() => setClicked("cash")}
                      className='btn btn-danger btn-sm'
                      style={{ margin: "auto" }}>
                      Under 10k
                    </button>
                  </h2>
                </div>
                <div>
                  <h2>
                    <button
                      onClick={() => setClicked("accrual")}
                      className='btn btn-primary btn-sm'
                      style={{ margin: "auto" }}>
                      Over 10k
                    </button>
                  </h2>
                </div>
              </li>

              <li className='card bg-light'>
                <div className='grid-2'>
                  <div>
                    <h2>
                      <button
                        onClick={() => setClicked("entity")}
                        className='btn btn-primary btn-sm my'
                        style={{ marginLeft: "20px" }}>
                        Entity
                      </button>
                      <button
                        onClick={() => setClicked("compliance")}
                        className='btn btn-success btn-sm'
                        style={{ marginLeft: "20px" }}>
                        Compliance
                      </button>
                    </h2>
                  </div>
                  <div>
                    <h2>
                      <button
                        onClick={() => setClicked("tp")}
                        className='btn btn-primary btn-sm my'
                        style={{ marginLeft: "20px" }}>
                        Taxes
                      </button>
                      <br className='' />

                      <button
                        onClick={() => setClicked("pr")}
                        className='btn btn-danger btn-sm'
                        style={{ marginLeft: "20px" }}>
                        Payroll
                      </button>
                    </h2>
                  </div>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ToolSelect;
