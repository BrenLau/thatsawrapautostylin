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

async function initCalendar() {
	const res = await fetch("api/calendar", {
		method: "GET"
	});
	const envVar = await res.json();
	console.log("initiating... ", envVar)

	const cal = new ApiCalendar(envVar.config, envVar.calendar) 

	return cal;
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
