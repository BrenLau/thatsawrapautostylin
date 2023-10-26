import React, { useState } from "react";
import { Modal, useModal } from "../../context/modal";

import "./login-modal.css";

const LoginFormModal = ({ updateUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

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
      let user = await res.json()
      sessionStorage.setItem("user", JSON.stringify(user))
      updateUser(user)
      closeModal();
    }
  };

  return (
    <div id="login-form-modal">
      <div id="login-form">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
              ))}
          </ul>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.  value)}
              required
              />
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default LoginFormModal;