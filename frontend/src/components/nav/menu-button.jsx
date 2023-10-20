import { useState, useEffect, useRef } from "react";

const MenuButton = () => {
  const [user, setUser] = useState({});
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

    if (showMenu) {
      console.log(transitioning)
      setTransitioning(true)
      setTimeout(setTransitioning, 200, false)
    }
  };

  return (
    <div id="menu-button-div">
      <i class="fa-solid fa-bars" onClick={toggleMenu} ref={ulRef}></i>
      {showMenu ? (
        <div id="menu-dropdown-div">
          {transitioning ? null : <p>Book Now</p>}
          {transitioning ? null : <p>Log In</p> }
          {transitioning ? null : <p>Sign Up</p> }
        </div>
      ) : (
        <div id="menu-dropdown-div-hidden">
        </div>
      )}
    </div>
  );
};

export default MenuButton;