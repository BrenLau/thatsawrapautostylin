import MenuButton from './menu-button';
import img from '../../assets/TAW-logo.jpg';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'
import { UserContext } from '../../main';
import { useContext } from 'react';
import './nav.css';

const Nav = () => {
  
  return (
    <div id="nav">
      <div id='nav-logo-div'>
        <Link to='/'><img id='nav-logo' src={img}/></Link>
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