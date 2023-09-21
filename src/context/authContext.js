// useContext => 令components共享資料, sth like redux, use for small application

import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // the onAuthStateChanged() returns a function that can unsub from the observer
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // for real-time application you need clean-up function or memory may leak
    // the clean-up function executed when component unmount
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
