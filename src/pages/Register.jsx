import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // use in callback function

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // call the firebase function to create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // use username as image file name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      //call the firebase storage function to upload image
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // if everything is alright, update the user with the displayName and the image link of downloadURL
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            // 開一個user-chat嘅table for之後佢開始同人吹水
            await setDoc(doc(db, "user-chat", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setError(true);
          }
        });
      });
    } catch (error) {
      setErrorCode(error.code);
      setErrorMessage(error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email already in use");
        setErrorCode("403");
      }
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">React Chatroom</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {error && (
            <span className="error">{`${errorCode} : ${errorMessage}`}</span>
          )}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
