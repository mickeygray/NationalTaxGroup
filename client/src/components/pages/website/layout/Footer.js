import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../images/logo.png";

const Footer = () => {
  return (
    <div
      className='navgrid bg-dark'
      style={{ zIndex: "99999", height: "200%" }}>
      <div className='container'>
        <p className='text-primary'>
          <Link to='/'>
            <img
              src={logo}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "10px",
                opacity: "50%",
              }}
            />
          </Link>
          National Tax Group
        </p>
      </div>
    </div>
  );
};

export default Footer;