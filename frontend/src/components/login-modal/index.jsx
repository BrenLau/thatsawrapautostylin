import React, { useState } from "react";

import "./login-modal.css";

const LoginFormModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch("/api/auth/login", {
      method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			email,
			password,
		  })
	  });
    if (data) {
      setErrors(data);
    } else {
        // closeModal()
    }
  };

  return (
    <div id="login-form-modal">
      <div id="modal-background"></div>
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