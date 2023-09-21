import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/authContext";

export default function Search() {
  const [input, setInput] = useState(""); // user打嘅input
  const [user, setUser] = useState(null); // search到的user
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", input));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (e) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // first check whether the group(chats between 2 people) exist
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      // Reads the document會return個document snapshot
      const res = await getDoc(doc(db, "chats", combinedId));

      // 如果搵唔到有chat就開啦
      if (!res.exists()) {
        // exists()係firebase function去check有定無
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "user-chat", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "user-chat", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (e) {
      setError(true);
    }

    setUser(null);
    setInput("");
  };

  return (
    <div className="search">
      <div className="search-form">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          value={input}
        />
      </div>
      {error && <span>Error occur</span>}
      {user && (
        <div className="user-chat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="user-chat-info">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
