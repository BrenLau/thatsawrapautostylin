import React, { useState, useContext, useEffect, SyntheticEvent } from "react";
import { Modal, useModal } from "../../context/modal";
import { UserContext } from "../../main";
import { CalendarContext } from "../../main";
// import { gapiLoaded, initializeGapiClient, gisLoaded, handleAuthClick, listUpcomingEvents } from "./google_auth";

import "./signup-modal.css";

const validateSignup = (name, password, confirmPassword, phoneNumber, instagram) => {
  let errs = {}
  if (password !== confirmPassword) {
    errs.password = "Passwords must match"
  };
  if (name.length < 2 || name.length >= 20) {
    errs.name = (name.length < 2 ? "Name must be at least 2 characters long" : "Name must be less than 20 characters")
  };
  if (isNaN(Number(phoneNumber)) || phoneNumber.length !== 10) {
    errs.phoneNumber = "Phone number must be a 10 character number"
  }
  if (instagram.length && instagram.length > 30) {
    errs.instagram = "Instagram username cannot be longer than 30 characters"
  }

  if (Object.keys(errs).length) {
    return {"errors": errs}
  }

  return true
}

// const CLIENT_ID = "762633836570-vpbro17viheb27tl43n2v7qq76aljd8b.apps.googleusercontent.com";
// const API_KEY = "AIzaSyC1UIZ4AhrqAxk_7mc3R2RUjlwoJvZaKbI";

// const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;

const SignupFormModal = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [instagram, setInstagram] = useState("")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const { setUser } = useContext(UserContext);
  const {apiCalendar} = useContext(CalendarContext)
  // console.log("*** signup calendar ***", apiCalendar.handleAuthClick)

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
      await apiCalendar.handleAuthClick()

      sessionStorage.setItem("user", JSON.stringify(data))
      apiCalendar.listUpcomingEvents(10).then(({ result }) => {
        console.log(result.items)
      });
      setUser(data);
      closeModal();
    }
  };

  useEffect(() => {
    // gapiLoaded();
    // gisLoaded();
  })

  return (
    <div id="signup-form-modal">
      <div id="signup-form-div">
        <h1>Sign Up</h1>
        <form id="signup-form" onSubmit={handleSubmit}>
          {errors.name && <p className="errors">{errors.name}</p>}
          <label className="signup-label">
            Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              />
          <label className="signup-label">
            Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          {errors.phoneNumber && <p className="errors">{errors.phoneNumber}</p>}
          <label className="signup-label">
            Phone Number:
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              />
          {errors.instagram && <p className="errors">{errors.instagram}</p>}
          <label className="signup-label">
            Instagram:
            </label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              />
          {errors.password && <p className="errors">{errors.password}</p>}
          <label className="signup-label">
            Password:
            </label>
            <input
              minLength={8}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.  value)}
              required
              />
          <label className="signup-label">
            Confirm Password:
            </label>
            <input
              minLength={8}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.  value)}
              required
              />
          <button id="signup-button" type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default SignupFormModal;