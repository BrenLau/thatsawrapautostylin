import { useState, useEffect, useContext} from 'react';
import { Route, Routes } from 'react-router';
import Footer from './components/footer';
import Nav from './components/nav';
import LoginFormModal from './components/login-modal';
import Booking from './components/booking';
import HomePage from './components/home-page';
import { CalendarContext, UserContext } from './main';
import * as google_auth_functions from './components/signup-form-modal/google_auth.js';
import ApiCalendar from 'react-google-calendar-api';

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

  // return (
  //   <>
  //   <iframe src="https://calendar.google.com/calendar/embed?src=1d07a72c3bb566bc44352f0dae44059355094ad3449898aa8b5771ec220ae862%40group.calendar.google.com&ctz=America%2FNew_York" style={{"border": "0"}} width="800" height="600" frameBorder="0" scrolling="no"></iframe></>
  // )


const config = {
	clientId: "762633836570-vpbro17viheb27tl43n2v7qq76aljd8b.apps.googleusercontent.com",
  apiKey: "AIzaSyC1UIZ4AhrqAxk_7mc3R2RUjlwoJvZaKbI",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
		"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  // // const [user, setUser] = useState(null)
  const { user, setUser } = useContext(UserContext);
  const { apiCalendar, setApiCalendar } = useContext(CalendarContext)

  useEffect(() => {
    async function authenticate() {
      console.log("authenticating...", apiCalendar)
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
        if (data.is_admin && !apiCalendar) {
          const calFetch = await fetch("/api/calendar", {
            method: "GET"
          });
          authorize.then(listEvents).catch(console.error)
          // const calData = await calFetch.json()
          // .then((configuration) => {
          //   console.log("configuration", configuration)
          //   // setApiCalendar(new ApiCalendar(configuration))
          //   let calendar = new ApiCalendar(configuration);
          //   calendar.handleAuthClick();
          //   console.log("calendar: ", calendar)
            // setApiCalendar(calendar)
          // })
          // .then(() => {
          //   console.log(apiCalendar)
          //   apiCalendar.listUpcomingEvents(10).then(({ result }) => {
          //   console.log("items: ", result.items)
          // });
        // })
          // console.log("fetch data", calData)
          console.log("config object", config)
          // await setApiCalendar(new ApiCalendar(calData))
          // setApiCalendar(new ApiCalendar(config))

          console.log(apiCalendar)

          // await apiCalendar.handleAuthClick()
            
        }
      }
    }
    authenticate()

  }, [])

  if (apiCalendar) {
    console.log("apiCalendar is truthy: ", apiCalendar)
    apiCalendar.handleAuthClick();
    apiCalendar.listUpcomingEvents(10).then(({ result }) => {
      console.log("items: ", result.items)
    })
  }

  return (
    <>
      <Nav user={user} />
      {isLoaded && (
        <Routes>
          <Route exact path="/" element={<HomePage />}>
          </Route>
          {/* <Route path="/login" element={<LoginFormModal />}>
          </Route> */}
          <Route exact path='/booking' element={<Booking />}>
          </Route>

          <Route exact path='/manage_bookings' element={<ManageBookings />}>
          </Route>
          <Route exact path='/calendar' element={<Calendar />}>
          </Route>
        </Routes>)}
      <Footer />
    </>
  )
}

export default App
