import React, { useState, useContext } from "react";
import { Modal, useModal } from "../../context/modal";
import { UserContext, CalendarContext } from "../../main";

import "./login-modal.css";

const LoginFormModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const { user, setUser } = useContext(UserContext);
  const { apiCalendar } = useContext(CalendarContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			email,
			password,
		  })
	  });
    if (!res.ok) {
      let data = await res.json()
      setErrors(data.errors);
    } else {
      let data = await res.json()
      sessionStorage.setItem("user", JSON.stringify(data))
      // apiCalendar.handleAuthClick()
      // .then(() => {
        setUser(data)
        closeModal();
    // })
    }
  };

  return (
    <div id="login-form-modal">
      <div id="login-form-div">
        <h1>Log In</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
              ))}
          </ul>
          <label className="signup-label">
            Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          <label className="signup-label">
            Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.  value)}
              required
              />
          <button id="login-button" type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default LoginFormModal;