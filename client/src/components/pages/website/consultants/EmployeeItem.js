import React, { useState } from "react";

const EmployeeItem = ({
  employee: { name, img, office, email, role, experience, expertise },
}) => {
  const [pointer, setPointer] = useState(false);

  const onMouseEnter = (e) => {
    setPointer(true);
  };

  const onMouseLeave = (e) => {
    setPointer(false);
  };

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {pointer ? (
        <div
          className='employeegrid'
          style={{ height: "200px", width: "200px" }}>
          <div
            className='image'
            style={{
              height: "200px",
              width: "200px",
              top: 0,
              left: 0,
              zIndex: "1",
            }}>
            <img
              style={{
                height: "200px",
                width: "200px",
                top: 0,
                left: 0,
                zIndex: "1",
              }}
              src={img}
              alt=''
            />
          </div>
          <div
            className='text'
            style={{
              height: "200px",
              width: "200px",
              top: 0,
              left: 0,
              opacity: "66%",
              zIndex: "1",
            }}>
            <ul
              className='all-center bg-dark'
              style={{
                height: "200px",
                width: "200px",
                top: 0,
                left: 0,
                zIndex: "1",
              }}>
              <li className='text-center'>
                <strong>{name}</strong>
              </li>
              <li className='text-center'>{role}</li>
              <li>{expertise}</li>
              <li>Experience: {experience}</li>
              <li>
                <a
                  style={{ width: "30px", height: "30px" }}
                  href={"tel:" + office}>
                  <i className='fas fa-phone-square-alt' /> Call {name}
                </a>
              </li>
              <li>
                <a
                  style={{ width: "30px", height: "30px" }}
                  href={"mailto:" + email}>
                  <i className='fas fa-envelope-square' /> E-Mail {name}
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <img style={{ height: "200px", width: "200px" }} src={img} alt='' />
          <h5 className='text-center'>{name}</h5>
        </div>
      )}
    </div>
  );
};

export default EmployeeItem;
