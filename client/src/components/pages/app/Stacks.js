import React, { Fragment } from "react";
import Navbar from "../../layout/Navbar";
import ProspectsSearch from "../../stacks/ProspectsSearch";
import Prospects from "../../stacks/Prospects";

const Stacks = () => {
  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>
      <div className='grid-2a'>
        <div className='card'>
          <h3 className='text-danger'>Stacks!</h3>
          <ProspectsSearch />
          <Prospects />
        </div>
        <div className='card'>
          <h3 className='text-danger' style={{ float: "right" }}>
            Racks!
          </h3>
          <br />
        </div>
      </div>
    </Fragment>
  );
};

export default Stacks;
