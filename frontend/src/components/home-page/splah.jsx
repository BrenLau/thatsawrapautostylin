
import "./home-page.css";

import splashImg from "../../assets/car-splash.jpg"

function Splash() {

  return (
    <div id="splash-wrapper">
        <img id="splash-image" src={splashImg} alt="car" />
        <div id="splash-text-wrapper">
          <p id="splash-header">ThatsAWrap</p>
          <p id="splash-body">autostylin'</p>
          <p id="book-button">BOOK NOW</p>
        </div>
    </div>
  )
}

export default Splash;