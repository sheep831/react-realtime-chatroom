import React from "react";

export default function Search() {
  return (
    <div className="search">
      <div className="search-form">
        <input type="text" placeholder="Find a user" />
      </div>
      <div className="user-chat">
        <img
          src="https://images.pexels.com/photos/18269839/pexels-photo-18269839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <div className="user-chat-info">
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
}
