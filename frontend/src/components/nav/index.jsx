import MenuButton from './menu-button';
import img from '../../assets/TAW-logo.jpg';
import './nav.css';

const Nav = () => {


  return (
    <div id="nav">
      <div id='nav-logo-div'>
        <img id='nav-logo' src={img} />
      </div>
      <div id='nav-title-div'>
          <h2 id='nav-title'>thatsawrapautostylin&apos;</h2>
      </div>
      <div id="nav-menu-div">
        <MenuButton />
      </div>
    </div>
  )
}

export default Nav;
