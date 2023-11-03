import AboutMe from '../about-me';
import './home-page.css';
import Services from '../services';

const HomePage = () => {
  return (
    <>
      {!user?.errors?<button onClick={() => navigate('/add_review')}>Create A Review</button> : null}
      < AllReviews />
      <AboutMe />
      <Services />


    </>
  )
}

export default HomePage
