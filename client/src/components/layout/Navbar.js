import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../images/logo.png";

const Navbar = () => {
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

  return (
    <div className='navgrid' onScroll={onScroll} style={style}>
      <div className='container'>
        <p className='text-primary'>
          <a href='#' onClick={onClick}>
            <img
              src={logo}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "10px",
                opacity: "50%",
              }}
            />
          </a>
          National Tax Group
        </p>
      </div>
    </div>
  );
};

export default Navbar;
