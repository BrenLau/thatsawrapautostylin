import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import OpenModalButton from "../open-modal-button";
import LoginFormModal from "../login-modal";
import SignupFormModal from "../signup-form-modal";
import { UserContext, CalendarContext } from '../../main';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

const MenuButton = () => {
  const { user, setUser } = useContext(UserContext)
  const apiCalendar = useContext(CalendarContext);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const [transitioning, setTransitioning] = useState(false)
  const [userState, setUserState] = useState(user || null)
  const navigate = useNavigate()

  const updateUserState = (user) => {
    setUser(user)
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const toggleMenu = () => {
    setShowMenu(!showMenu)

    if (!showMenu) {
      setTransitioning(true)
      setTimeout(setTransitioning, 200, false)
    }
  };

  const logout = async () => {
    const response = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      sessionStorage.removeItem("user")
      // await apiCalendar.handleSignOutClick();
      setUser(null)
      navigate('/')
    }
  }

  const dropdownClassname = "menu-dropdown-div" + (showMenu ? "" : "-hidden")

  return (
    <div id="menu-button-div" ref={ulRef}>
      <i id="menu-button" className="fa-solid fa-bars" onClick={toggleMenu} ></i>
      {!user ? (
        <div id={dropdownClassname}>
          {transitioning || !showMenu ? null : <Link to='/booking'className="menu-dropdown-button">Book Now</Link>}
          {transitioning || !showMenu ? null : <OpenModalButton modalComponent={<LoginFormModal />} buttonText={"Login"} buttonClassName={"menu-dropdown-button"}/>}
          {transitioning || !showMenu ? null : <OpenModalButton modalComponent={<SignupFormModal />} buttonText={"Sign Up"} buttonClassName={"menu-dropdown-button"}/> }
        </div>
      ) : (
        <div id={dropdownClassname}>
          {transitioning || !showMenu ? null : <p className="menu-dropdown-button">{user.email}</p>}
          {/* {transitioning || !showMenu ? null : <Link to='/booking'className="menu-dropdown-button">Book Now</Link>} */}
          {transitioning || !showMenu ? null : <Link to="manage-bookings" className="menu-dropdown-button">Manage Bookings</Link>}
          {transitioning || !showMenu ? null : <p className="menu-dropdown-button" onClick={logout}>Log Out</p>}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
