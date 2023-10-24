import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const MenuButton = ({ user }) => {
  // const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const [transitioning, setTransitioning] = useState(false)

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

  const dropdownClassname = "menu-dropdown-div" + (showMenu ? "" : "-hidden")

  return (
    <div id="menu-button-div" ref={ulRef}>
      <i id="menu-button" className="fa-solid fa-bars" onClick={toggleMenu} ></i>
      {!user ? (
        <div id={dropdownClassname}>
          {transitioning || !showMenu ? null : <Link to='/booking'className="menu-dropdown-button">Book Now</Link>}
          {transitioning || !showMenu ? null : <Link to="/login" className="menu-dropdown-button" >Log In</Link> }
          {transitioning || !showMenu ? null : <Link className="menu-dropdown-button">Sign Up</Link> }
        </div>
      ) : (
        <div id={dropdownClassname}>
          {transitioning || !showMenu ? null : <p className="menu-dropdown-button">{user.email}</p>}
          {transitioning || !showMenu ? null : <p className="menu-dropdown-button">Book Now</p>}
          {transitioning || !showMenu ? null : <p className="menu-dropdown-button">Log Out</p>}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
