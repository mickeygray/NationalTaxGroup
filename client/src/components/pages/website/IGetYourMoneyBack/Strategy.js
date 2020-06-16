import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import lawyer from "../../../../images/lawyer.png";

const Strategy = () => {
  return (
    <Fragment>
      <div className='grid-hero' style={{ height: "100%", width: "80%" }}>
        <div className='card contactcopy bg-light'>
          <h3 className='lead text-primary text-center'>Our Legal Strategy</h3>

          <ul>
            <li>
              <span className='text-primary' style={{ fontSize: "2rem" }}>
                R
              </span>
              eview The Service Agreement
            </li>
            <li>
              <span className='text-primary' style={{ fontSize: "2rem" }}>
                A
              </span>
              nalyze the specifics of your case
            </li>
            <li>
              <span className='text-danger' style={{ fontSize: "2rem" }}>
                D
              </span>
              etermine Services Rendered Value
            </li>
            <li>
              <span className='text-success' style={{ fontSize: "2rem" }}>
                E
              </span>
              valuate Fees vs Services Rendered
            </li>
            <li>
              <span className='text-primary' style={{ fontSize: "2rem" }}>
                F
              </span>
              ile a law suit against the company.
            </li>
          </ul>

          <Link
            className='btn btn-block btn-danger text-center'
            style={{ borderRadius: "10px", height: "50px" }}>
            Learn more
          </Link>
        </div>
        <div
          className='solsimg'
          style={{ backgroundColor: "black", opacity: "66%" }}>
          <img className='round-img' src={lawyer} alt='' />
        </div>
      </div>
    </Fragment>
  );
};

export default Strategy;
