import React from "react";
import img from "../img/img.png";
import attach from "../img/attach.png";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something..." />
      <div className="send">
        <img src={attach} alt="" />
        <input type="file" id="file" />
        <label htmlFor="file">
          <img src={img} alt="" />
          <span></span>
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
