import { useState, useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router';
import Footer from './components/footer';
import Nav from './components/nav';
import LoginFormModal from './components/login-modal';
import Booking from './components/booking';
import HomePage from './components/home-page';
import { UserContext } from './main';

import './App.css';
import ManageBookings from './components/manage-bookings';

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
  // const [user, setUser] = useState(null)
  const { user, setUser } = useContext(UserContext);

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
        if (data.errors) {
          return
        }
        setUser(data);
        sessionStorage.setItem("user", JSON.stringify(data))
      }
    }
    authenticate()

  }, [])

<<<<<<< HEAD

=======
>>>>>>> 49a0dc9cfa33952cdd6eeece8e1b627411a8944d
  return (
    <>
      <Nav />
      {isLoaded && (
        <Routes>
          <Route exact path="/" element={<HomePage />}>
          </Route>
          {/* <Route path="/login" element={<LoginFormModal />}>
          </Route> */}
          <Route exact path='/booking' element={<Booking />}>
          </Route>
<<<<<<< HEAD
          <Route exact path='/manage_bookings' element={<ManageBookings />}>
=======
          <Route exact path='/calendar' element={<Calendar />}>
>>>>>>> 49a0dc9cfa33952cdd6eeece8e1b627411a8944d
          </Route>
        </Routes>)}
      <Footer />
    </>
  )
}

export default App
