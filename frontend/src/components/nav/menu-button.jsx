import { useState, useEffect, useRef } from "react";

const MenuButton = () => {
  const [user, setUser] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu])

  return (
    <div id="menu-button-div">
      <i class="fa-solid fa-bars" onClick={() => setShowMenu(!showMenu)} ref={ulRef}></i>
      {showMenu ? (
        <div id="menu-dropdown-div">
          <p>Book Now</p>
          <p>Log In</p>
          <p>Sign Up</p>
        </div>
      ) : (
        <div id="menu-dropdown-div-hidden">
        </div>
      )}
    </div>
  );
};

export default MenuButton;