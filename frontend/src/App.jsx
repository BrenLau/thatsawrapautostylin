import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Footer from './components/footer';
import Nav from './components/nav';
import CreateReviews from './components/reviews/createReview';
import AboutMe from './components/about-me'
import LoginFormModal from './components/login-modal';
// import Booking from './components/booking';
import HomePage from './components/home-page';

import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function authenticate() {
      const response = await fetch("/api/auth", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoaded(true)
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        if (data.errors) {
          return
        }
        setUser(data);
        sessionStorage.setItem("user", JSON.stringify(data))
      }
    }
    authenticate()

  }, [])

  console.log(isLoaded)

  return (
    <>
      <Nav user={user} />
      {isLoaded && (
        <Routes>
          <Route exact path="/" element={<HomePage />}>
          </Route>
          <Route path="/login" element={<LoginFormModal />}>
          </Route>
          {/* <Route exact path='/booking' element={<Booking />}>
          </Route> */}
        </Routes>)}
      {/* <Footer /> */}
      {/* <Nav /> */}
      <AboutMe />
      <Routes>
        {/* <Route exact path="/" element={<HomePage />}>
        </Route> */}
        {/* <Route exact path="/login" element={<LoginFormModal />}>
        </Route> */}

        <Route exact path='/add_review' element={ <CreateReviews />}>
        </Route>

        {/* <Route exact path='/booking' element={<Booking />}>
        </Route>
        <Route exact path='/booking' element={<Booking />}>
        </Route> */}
      </Routes>
      <Footer/>
    </>
  )
}

export default App
