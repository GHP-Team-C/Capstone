import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {authenticateSignUp } from '../../app/store';
import { useNavigate } from 'react-router-dom';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(authenticateSignUp({ firstName, lastName, username, email, password, method: "signup" }));
    navigate('/')
    alert(`You've successfully signed-up ${firstName}`)
  };



  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
      <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firstName"
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}/>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}/>

          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text"
                 value={username}
                 onChange={(event) =>
                   setUserName(event.target.value)
                 } />

          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text"
                 value={email}
                 onChange={(event) =>
                   setEmail(event.target.value)
                 }  />

          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }/>
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
