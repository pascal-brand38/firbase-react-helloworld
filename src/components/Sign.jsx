// Copyright (c) Pascal Brand
// MIT License

import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import './Sign.css'


function OneSign(isSignUp) {
  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setMessage(`Wrong Input`)
    } else {
      const auth = getAuth();
      if (isSignUp) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            setMessage(user.email)
            const user = userCredential.user;
            console.log('USER: ', user)
            // ...
          })
          .catch((error) => {
            console.log('ERROR:', error)
            setMessage(`Signup FAILED`)
          });
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('USER: ', user)
            setMessage(user.email)
          })
          .catch((error) => {
            setMessage(`Signin FAILED`)
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      }
    }
  };


  return (
    <div className="one-sign">
      <div>
        {(isSignUp) ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
      </div>

      {/* Calling to the methods */}
      <div className="message">
        { message }
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          type="email"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

const Signup = () => OneSign(true)
const Signin = () => OneSign(false)

function Sign() {
  return (
    <div className='sign'>
      <Signup />
      <Signin />
    </div>
  )
}

export { Sign, Signup, Signin }
