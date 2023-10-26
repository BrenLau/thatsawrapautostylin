import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import OpenModalButton from "../open-modal-button";
import LoginFormModal from "../login-modal";
import SignupFormModal from "../signup-form-modal";

const MenuButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const [transitioning, setTransitioning] = useState(false)
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null)

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
      setUser(null)
    }
  }

  const dropdownClassname = "menu-dropdown-div" + (showMenu ? "" : "-hidden")

  return (
    <div id="menu-button-div" ref={ulRef}>
      <i id="menu-button" className="fa-solid fa-bars" onClick={toggleMenu} ></i>
      {!user ? (
        <div id={dropdownClassname}>
          {transitioning || !showMenu ? null : <Link to='/booking'className="menu-dropdown-button">Book Now</Link>}
          {transitioning || !showMenu ? null : <OpenModalButton modalComponent={<LoginFormModal updateUser={updateUserState} />} buttonText={"Login"}/>}
          {transitioning || !showMenu ? null : <OpenModalButton modalComponent={<SignupFormModal />} buttonText={"Sign Up"}/> }
        </div>
      ) : (
        <div id={dropdownClassname}>
          {transitioning || !showMenu ? null : <p className="menu-dropdown-button">{user.email}</p>}
          {transitioning || !showMenu ? null : <Link to='/booking'className="menu-dropdown-button">Book Now</Link>}
          {transitioning || !showMenu ? null : <p className="menu-dropdown-button" onClick={logout}>Log Out</p>}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
