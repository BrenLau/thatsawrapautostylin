
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Nav from './components/nav';
import LoginFormModal from './components/login-modal';
import Booking from './components/booking';
import HomePage from './components/home-page';

import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function authenticate() {
      const response = await fetch("/api/auth", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
      }
    }

    setIsLoaded(true)
  }, [])

  return (
    <>
      <Nav />
      <Routes>
        <Route exact path="/" element={<HomePage />}>
        </Route>
        <Route exact path="/login" element={<LoginFormModal />}>
        </Route>
        <Route exact path='/booking' element={<Booking />}>
        </Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
