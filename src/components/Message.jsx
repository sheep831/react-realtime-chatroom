import React from "react";

const Message = () => {
  return (
    <div className="message owner">
      <div className="message-info">
        <img
          src="https://images.pexels.com/photos/18269839/pexels-photo-18269839.jpeg"
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="message-content">
        <p>hello</p>
        <img
          src="https://images.pexels.com/photos/18269839/pexels-photo-18269839.jpeg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Message;
