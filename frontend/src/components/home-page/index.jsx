import AboutMe from '../about-me';
import { useNavigate } from "react-router-dom";

import './home-page.css';
import Services from '../services';
import AllReviews from '../reviews/allReviews';
import { useState, useEffect } from 'react';


const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch("/api/auth/curr_user");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    }
    fetchReviews();
  }, []);

  console.log(user)


  return(
    <>
      {!user?.errors?<button onClick={() => navigate('/add_review')}>Create A Review</button> : null}
      < AllReviews />
      <AboutMe />
    </>
  )
}

export default HomePage
