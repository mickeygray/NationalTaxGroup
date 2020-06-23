import React, { useEffect, useState, Fragment, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../../images/logo.png";
import AuthContext from "../../context/auth/authContext";
import RecentLeads from "../ntenet/stacks/RecentLeads";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const { isAuthenticated, logout, loadUser } = authContext;

  const [style, setStyle] = useState({});

  const position = window.pageYOffset;
  const onClick = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    setStyle({
      backgroundColor: "none",
    });
  }, []);

  const onLogout = () => {
    logout();
  };

  const location = useLocation();
  useEffect(() => {
    if (position === 0) {
      setStyle({
        backgroundColor: "rgba(52, 52, 52, 0.1)",
        zIndex: "999999999999999",
      });
    }
  }, [position, setStyle]);

  const onScroll = () => {
    setStyle({
      position: "sticky",
      top: "0",
      background: "black",
      zIndex: "999999999999999",
    });
  };

  const guestLinks = <Fragment></Fragment>;

  const authLinks = <Fragment></Fragment>;

  return (
    <div className='navgrid' onScroll={onScroll} style={style}>
      <div className='container'>
        <p className='text-primary'>
          <Link to='/taxgroup' onClick={onClick}>
            <img
              src={logo}
              alt='National Tax Group'
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "10px",
                opacity: "50%",
              }}
            />{" "}
            National Tax Group
          </Link>
        </p>
      </div>
      <div>
        <br />
        <ul>
          {" "}
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <a href='#!' onClick={onLogout}>
              <i className='fa fa-sign-out' />{" "}
              <span className='hide-sm'>Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <RecentLeads />
      </div>
    </div>
  );
};

export default Navbar;
