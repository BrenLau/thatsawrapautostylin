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
import ManageBookings from './components/manage-bookings';
import CreateReviews from './components/reviews/createReview';
import EditReview from './components/reviews/editReview';

import './App.css';
import SignupFormModal from './components/signup-form-modal';

function Calendar() {
  const getEvents = async () => {
    let res = await fetch("/api/calendar", {
      method: "GET"
    })
    let events = await res.json()
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

async function initCalendar() {
	const res = await fetch("api/calendar", {
		method: "GET"
	});
	const envVar = await res.json();
	console.log("initiating... ", envVar)

	const cal = new ApiCalendar(envVar.config, envVar.calendar) 
  console.log(cal)

	return {
    apiCalendar: cal,
    calId: envVar.calendar
  };
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { apiCalendar, setApiCalendar } = useContext(CalendarContext)

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
        
        if (data && data.is_admin) {
          initCalendar()
          .then((result) => {
            setApiCalendar(result)	
          })	
        }
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
          <Route path='/signup' element={<SignupFormModal />}>
          </Route> 
          <Route exact path='/booking' element={<Booking />}>
          </Route>
          <Route exact path='/manage-bookings' element={<ManageBookings />}>
          </Route>
          <Route exact path='/calendar' element={<Calendar />}>
          </Route>
          <Route exact path='/add_review' element={<CreateReviews />}>
          </Route>

          <Route exact path='/editReview' element={<EditReview />}>
          </Route>
        </Routes>)}
      <Footer />
    </>
  )
}

export default App
