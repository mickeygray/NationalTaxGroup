import React, { Fragment, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import RecentLeads from "../stacks/RecentLeads";
import UserContext from "../../context/user/userContext";
import AlertContext from "../../context/alert/alertContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  useEffect(() => {
    setText("Stacks!");
    setPop("Popkis!");
  }, []);
  const [text, setText] = useState("Stacks!");

  const [pop, setPop] = useState("Popkis!");

  const onClick = (e) => {
    if (text === "Stacks!") {
      setText("Racks!");
    } else if (text === "Racks!") {
      setText("Stacks!");
    }
  };

  const onClick2 = (e) => {
    if (pop === "Popkis!") {
      setPop("RIP Betty!");
    } else if (pop === "RIP Betty!") {
      setPop("Popkis!");
    }
  };
  const authLinks = (
    <Fragment>
      <li>
        <Link to='/'>Danger Zone!</Link>
        <Link to='/ShipEm'>Ship Em!</Link>
        <Link to='/Stacks' onClick={onClick}>
          Stacks!
        </Link>
        <Link to='/Eyore'>Eyore!</Link>
        <Link to='/thebigguns'>The Big Guns!</Link>
        <Link to='/PPsPalace'>PPs Palace!</Link>
        <Link to='/Dunder'>Dunder!</Link>
        <Link to='/FordeTwoCents'>FordeTwo Cents!</Link>
        <a href='#!' onClick={onClick2}>
          {pop}
        </a>

        <a href='#!' onClick={onLogout}>
          <i className='fa fa-sign-out' />{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </Fragment>
  );

  return (
    <div>
      <div className='navbar bg-primary'>
        <h2>
          <span className='text-dark'>NTE</span>
          <span className='text-danger lead'>NET</span>
          <span className='text-dark' style={{ fontSize: ".8rem" }}>
            {"      "}
            {user ? `Claw their eyes out, ${user.name}` : ""}
          </span>
        </h2>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </div>
      <span className='leadul bg-light'>
        {" "}
        {isAuthenticated ? <RecentLeads /> : ""}{" "}
      </span>
    </div>
  );
};

export default Navbar;
