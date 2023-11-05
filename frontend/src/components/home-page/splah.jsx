import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../main";
import "./home-page.css";

import splashImg from "../../assets/car-splash.jpg"
import LoginFormModal from "../login-modal";

function Splash() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function bookRedirect() {
    if (!user) {
      navigate("/login")
      return
    }

    navigate("/booking")
  };

  return (
    <div id="splash-wrapper">
        <img id="splash-image" src={splashImg} alt="car" />
        <div id="splash-text-wrapper">
          <div id="splash-text-background"></div>
          <div id="splash-text-foreground">
            <p id="splash-header">ThatsAWrap</p>
            <p id="splash-body">autostylin'</p>
            <p id="book-button" onClick={bookRedirect}>BOOK NOW</p>
          </div>
        </div>
    </div>
  )
}

export default Splash;