import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Nav from './components/nav';
import AboutMe from './components/about-me'
import LoginFormModal from './components/login-modal';
import Booking from './components/booking';
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
      if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          return
        }
        setUser(data);
        sessionStorage.setItem("user", JSON.stringify(data))
      }
      setIsLoaded(true)
    }
    authenticate()

  }, [])

  return (
    <>
      <Nav user={user}/>
      <Routes>
        <Route exact path="/" element={<HomePage />}>
        </Route>
        <Route exact path="/login" element={<LoginFormModal />}>
        </Route>
        <Route exact path='/booking' element={<Booking />}>
        </Route>
        <Route exact path='/booking' element={<Booking />}>
        </Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
