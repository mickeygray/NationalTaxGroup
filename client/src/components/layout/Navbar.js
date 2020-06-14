import React, { Fragment, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };

  let location = useLocation();

  console.log(location.pathname);

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <img src={logo} alt='' style={{ width: "50px", height: "50px" }} />
        </Link>
      </h1>
      <ul>{location.pathname === `/takemeoffthelist` ? "" : authLinks}</ul>
    </div>
  );
};

export default Navbar;
