import React, { Fragment } from "react";

const PlanCards = () => {
  return (
    <Fragment>
      <h3
        className='lead text-primary text-center'
        style={{ marginLeft: "-10rem", padding: "0" }}>
        Our Resolution Process
      </h3>
      <div className='grid-3 m-2 ' style={{ height: "100%", width: "80%" }}>
        <div className='card offercard bg-light'>
          <h2>
            {" "}
            <span className='text-primary' style={{ fontSize: "2rem" }}>
              F
            </span>
            ile your taxes
          </h2>
          <ul>
            <li>
              <span className='text-primary' style={{ fontSize: "2rem" }}>
                C
              </span>
              ollect your receipts
            </li>
            <li>
              <span className='text-danger' style={{ fontSize: "2rem" }}>
                H
              </span>
              alt all irs collections
            </li>
            <li>
              <span className='text-success' style={{ fontSize: "2rem" }}>
                E
              </span>
              nroll you in relief programs
            </li>
            <li>
              <span className='text-primary' style={{ fontSize: "2rem" }}>
                M
              </span>
              anage your long term tax planning.
            </li>
          </ul>
          <br />
          <h5 className='text-danger'>
            Tax Analysts file returns and enroll you in relief programs.
          </h5>

          <h5>Starting at $499.00/month</h5>
          <br />
          <a
            href='tel:+18004597124'
            className='btn btn-sm btn-success all-center'>
            Expert Tax Relief
          </a>
        </div>
        <div className='card offercard bg-dark'>
          {" "}
          <h2>
            {" "}
            <span style={{ fontSize: "2rem" }} className='text-primary'>
              R
            </span>
            elief Prorgrams Available
          </h2>
          <ul>
            <li>
              <span className='text-primary' style={{ fontSize: "2rem" }}>
                O
              </span>
              ffer in compromise
            </li>
            <li>
              <span className='text-danger' style={{ fontSize: "2rem" }}>
                S
              </span>
              treamlined Fresh Start
            </li>
            <li>
              <span className='text-success' style={{ fontSize: "2rem" }}>
                C
              </span>
              urrently Not Collectible
            </li>
            <li>
              <span className='text-primary' style={{ fontSize: "2rem" }}>
                L
              </span>
              ien subbordination
            </li>
          </ul>
          <br />
          <h5 className='text-danger'>
            Tax Attorneys and enrolled agents licensed to represent taxpayers in
            all 50 states answer all your questions
          </h5>
          <h5>Starting at $5000.00</h5>
          <br />
          <a
            href='tel:+18004597124'
            className='btn btn-sm btn-success all-center'>
            Expert Tax Help
          </a>
          <br />
        </div>
        <div className='card offercard bg-light'>
          {" "}
          <h2>
            {" "}
            <span className='text-primary' style={{ fontSize: "2rem" }}>
              P
            </span>
            ay your legal fees through loans
          </h2>
          <ul>
            <li>
              <span className='text-primary' style={{ fontSize: "2rem" }}>
                U
              </span>
              se one of our approved lenders
            </li>
            <li>
              <span className='text-danger' style={{ fontSize: "2rem" }}>
                D
              </span>
              ramatically reduce your upfront cost
            </li>
            <li>
              <span className='text-success' style={{ fontSize: "2rem" }}>
                P
              </span>
              ay a managable monthly fee
            </li>
            <li>
              <span className='text-primary' style={{ fontSize: "2rem" }}>
                S
              </span>
              olve your tax burden for years to come
            </li>
          </ul>
          <br />
          <h5 className='text-danger'>
            With a good credit score you can be done with all of your fees in
            one click.
          </h5>
          <h5>Must have a 600 credit score</h5>
          <br />
          <a
            href='tel:+18004597124'
            className='btn btn-sm btn-success all-center'>
            Qualify for a Loan
          </a>
          <br />
        </div>
      </div>
    </Fragment>
  );
};

export default PlanCards;
