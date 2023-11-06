import { useContext } from 'react';
import AboutMe from '../about-me';
import Services from '../services';
import AllReviews from '../reviews/allReviews';
import Splash from './splah';
import { UserContext } from '../../main';

import './home-page.css';

const HomePage = () => {
  const {user,setUser} = useContext(UserContext)
  return (
    <>
      <Splash />
      {/* {!user?.errors?<button onClick={() => navigate('/add_review')}>Create A Review</button> : null} */}
      <AllReviews />
      <Services />
      <AboutMe />


    </>
  )
}

export default HomePage
