import React from "react";
import "./Switch.css";

function Switch() {
  return (
    <>
      <label className="switch" htmlFor={`switch`}>
        <input className="switch__checkbox" id={`switch`} type="checkbox" />
        <span className="switch__button"></span>
        <span className="switch__text switch__text_F">F</span>
        <span className="switch__text switch__text_C">C</span>
      </label>
    </>
  );
}

export default Switch;
