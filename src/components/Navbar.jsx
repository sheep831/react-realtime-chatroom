import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img
          src="https://images.pexels.com/photos/18269839/pexels-photo-18269839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="avatar"
        />
        <span className="username">John</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
}
