import React, { useRef, useState, useEffect } from "react";
import Iframe from "react-iframe";

const quickAndDirtyStyle = {
  width: "606px",
  height: "406px",
  border: "1px solid black",
  backgroundColor: "#F4F4F4",
};

const LexisModal = (props) => {
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef();

  // Monitor changes to position state and update DOM
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [position]);

  // Update the current position if mouse is down
  const onMouseMove = (event) => {
    if (pressed) {
      setPosition({
        x: position.x + event.movementX,
        y: position.y + event.movementY,
      });
    }
  };

  return (
    <div
      ref={ref}
      style={quickAndDirtyStyle}
      onMouseMove={onMouseMove}
      onMouseDown={() => setPressed(true)}
      onMouseLeave={() => setPressed(false)}
      onClick={() => setPressed(false)}>
      <button
        onClick={props.toggleVisibility}
        onMouseDown={() => setPressed(false)}
        style={{ position: "absolute", zIndex: "9999999999" }}>
        X
      </button>
      <Iframe
        width='599px'
        height='399px'
        url='https://advance.lexis.com'
        display='initial'
        onMouseEnter={() => setPressed(false)}
      />
    </div>
  );
};

export default LexisModal;
