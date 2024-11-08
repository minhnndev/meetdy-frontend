import React from "react";
import "./style.css";

const ColorPicker = ({ colors, handleClickColor }) => {
  return (
    <div className="list-color">
      {colors?.map((ele, index) => (
        <div
          key={index}
          onClick={() => handleClickColor(ele)}
          className="popup-color-item"
          style={{ background: ele.code }}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
