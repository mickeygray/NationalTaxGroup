import React, { useState, useContext, useEffect, Fragment } from "react";

import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  const authContext = useContext(AuthContext);

  const {
    register,
    verifyAdmin,
    error,
    clearErrors,
    isAuthenticated,
    isVerified,
    token,
  } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "User already exists") {
      console.log("error");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  useEffect(() => {
    if (isVerified) {
      setUser({
        name: name,
        email: email,
        password: password,
        password2: password2,
        resoCred: resoCred,
        resoCred2: resoCred2,
        admin: token,
        role: "admin",
      });
    }
  }, [error, token, isVerified]);

  console.log(isVerified);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    resoCred: "",
    resoCred2: "",
    admin: "",
    role: "",
  });

  const [adminCred, setAdminCred] = useState("");

  const {
    name,
    email,
    password,
    password2,
    resoCred,
    resoCred2,
    admin,
    role,
  } = user;

  const onChange = (e) => {
    setAdminCred({ ...adminCred, [e.target.name]: e.target.value });
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registerUser = (user) => {
    const {
      name,
      email,
      password,
      password2,
      resoCred,
      resoCred2,
      admin,
      role,
    } = user;
    if (name === "" || email === "" || password === "") {
      console.log("error");
    } else if (password !== password2) {
      console.log("error");
    } else {
      register({
        name,
        email,
        password,
        resoCred,
        resoCred2,
        admin,
        role,
      });
      setAdminCred("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  console.log(user);

  return (
    <div className='container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-container card all-center'>
          <div className='grid-2'>
            <div>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  type='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  minLength='6'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password2'>Confirm Password</label>
                <input
                  id='password2'
                  type='password'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                  minLength='6'
                />
              </div>
              <button
                onClick={() => registerUser(user)}
                className='btn btn-primary btn-block'>
                {" "}
                Register
              </button>
            </div>

            <div>
              <div>
                <div className='form-group'>
                  <label htmlFor='password2'>Resolution Credential</label>
                  <input
                    id='resoCred'
                    type='password'
                    name='resoCred'
                    value={resoCred}
                    onChange={onChange}
                    minLength='6'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password2'>Resolution Credential 2</label>
                  <input
                    id='resoCred2'
                    type='password'
                    name='resoCred2'
                    value={resoCred2}
                    onChange={onChange}
                    minLength='6'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password2'>
                    {role != "" ? `Selected Role : ${role}` : "Select a Role"}
                  </label>

                  <select
                    onChange={onChange}
                    id='role'
                    name='role'
                    className='py-1'
                    value={role}
                    style={{ height: "2.4rem" }}
                    placeholder={role}>
                    <option> </option>

                    <option value='opener' selected={role === "opener"}>
                      Opener
                    </option>
                    <option value='originator' selected={role === "originator"}>
                      Originator
                    </option>
                    <option
                      value='loanProcessor'
                      selected={role === "loanProcessor"}>
                      Loan Processor
                    </option>
                    <option
                      value='documentProcessor'
                      selected={role === "documentProcessor"}>
                      Document Processor
                    </option>
                    <option value='upsell' selected={role === "upsell"}>
                      Upsell
                    </option>
                    <option value='fedReso' selected={role === "fedReso"}>
                      Federal Resolution
                    </option>
                    <option value='stateReso' selected={role === "stateReso"}>
                      State Resolution
                    </option>
                    <option value='taxPrep' selected={role === "taxPrep"}>
                      Tax Preparation
                    </option>
                    <option disabled value='admin' selected={role === "admin"}>
                      {" "}
                      {isVerified ? "Administration" : ""}
                    </option>
                  </select>
                </div>
                <div className='form-group py-1'>
                  <label htmlFor='password2'>Administration Credential</label>
                  <input
                    id='adminCred'
                    type='password'
                    name='adminCred'
                    onChange={onChange}
                  />
                  <button
                    className='btn btn-secondary btn-block'
                    onClick={() => verifyAdmin(adminCred)}>
                    Authorize Administrative Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
