import React, { useState } from "react";
import { Modal, useModal } from "../../context/modal";

import "./signup-modal.css";

const validateSignup = (name, password, confirmPassword, phoneNumber, instagram) => {
  let errs = {}
  if (password !== confirmPassword) {
    errs.password = "Passwords must match"
  }
  if (name.length < 2 || name.length >= 20) {
    errs.name = (name.length < 2 ? "Name must be at least 2 characters long" : "Name must be less than 20 characters")
  }
  if (isNaN(Number(phoneNumber)) || phoneNumber.length !== 10) {
    errs.phoneNumber = "Phone number must be a 10 character number"
  }
  if (instagram.length && instagram.length > 30) {
    errs.instagram = "Instagram username cannot be longer than 30 characters"
  }

  console.log(errs)

  if (Object.keys(errs).length) {
    return {"errors": errs}
  }

  return true
}

const SignupFormModal = ({ updateUser }) => {
  // console.log(updateUser)
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [instagram, setInstagram] = useState("")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    console.log("validating")

    const isValidated = validateSignup(name, password, confirmPassword, phoneNumber, instagram)

    console.log("validated", isValidated)

    if (isValidated.errors) {
      console.log('hello')
      setErrors(isValidated.errors)
      return
    }

    console.log("fetching...")
    const res = await fetch("/api/auth/signup", {
      method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			email,
			password,
      name,
      phone_number: phoneNumber,
      instagram
		  })
	  });
    let data = await res.json()
    console.log(data)
    if (data.errors) {
      setErrors(data.errors);
    } else {
      sessionStorage.setItem("user", JSON.stringify(data))
      updateUser(data)
      closeModal();
    }
  };

  return (
    <div id="signup-form-modal">
      <div id="signup-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {errors.name && <p className="errors">{errors.name}</p>}
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </label>
          {errors.phoneNumber && <p className="errors">{errors.phoneNumber}</p>}
          <label>
            Phone Number
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              />
          </label>
          {errors.instagram && <p className="errors">{errors.instagram}</p>}
          <label>
            Instagram
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              />
          </label>
          {errors.password && <p className="errors">{errors.password}</p>}
          <label>
            Password
            <input
              minLength={8}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.  value)}
              required
              />
          </label>
          <label>
            Confirm Password
            <input
              minLength={8}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.  value)}
              required
              />
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default SignupFormModal;