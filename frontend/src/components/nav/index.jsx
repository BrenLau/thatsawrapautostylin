import MenuButton from './menu-button';
import img from '../../assets/TAW-logo.jpg';
// import { useHistory } from 'react-router-dom'
import './nav.css';

const Nav = () => {

// const history = useHistory()

  return (
    <div id="nav">
      <div id='nav-logo-div'>
        <img id='nav-logo' src={img}/>
      </div>
      <div id='nav-title-div'>
          <h2 id='nav-title'>thatsawrapautostylin'</h2>
      </div>
      <div id="nav-menu-div">
        <MenuButton />
      </div>
    </div>
  )
}

export default Nav;
