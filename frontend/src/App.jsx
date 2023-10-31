import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Footer from './components/footer';
import Nav from './components/nav';
import LoginFormModal from './components/login-modal';
import Booking from './components/booking';
import HomePage from './components/home-page';

import './App.css';

function Calendar() {
  const getEvents = async () => {
    let res = await fetch("/api/calendar", {
      method: "GET"
    })
    let events = await res.json()
    console.log(events)
    return events;
  }
  let eventsRes = getEvents();
    return (
    <div id='calendar'>
      {eventsRes.map(event => {
        <p>{event.id}</p>
      })}
    </div>
  )
}

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

  return (
    <>
      <Nav user={user} />
      {isLoaded && (
        <Routes>
          <Route exact path="/" element={<HomePage />}>
          </Route>
          <Route path="/login" element={<LoginFormModal />}>
          </Route>
          <Route exact path='/booking' element={<Booking />}>
          </Route>
          <Route exact path='/calendar' element={<Calendar />}>
          </Route>
        </Routes>)}
      <Footer />
    </>
  )
}

export default App
