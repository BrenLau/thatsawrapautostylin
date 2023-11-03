import React, { createContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import { ModalProvider, Modal } from './context/modal.jsx';
import './index.css'

export const UserContext = createContext();

import ApiCalendar from "react-google-calendar-api";

// const config = {
// 	clientId: "1d07a72c3bb566bc44352f0dae44059355094ad3449898aa8b5771ec220ae862@group.calendar.google.com",
//   apiKey: "AIzaSyC1UIZ4AhrqAxk_7mc3R2RUjlwoJvZaKbI",
//   scope: "https://www.googleapis.com/auth/calendar",
//   discoveryDocs: [
// 		"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
//   ],
// };

// const apiCalendar = new ApiCalendar(config);
export const CalendarContext = createContext();

function Root() {
	const [user, setUser] = useState(null);
	const userState = { user, setUser }
	const [apiCalendar, setApiCalendar] = useState(null)
	const calendarState = {apiCalendar, setApiCalendar}

	return (
		<ModalProvider>
			<UserContext.Provider value={userState}>
				<CalendarContext.Provider value={calendarState}>
					<BrowserRouter>
						<App />
						<Modal />
					</BrowserRouter>
				</CalendarContext.Provider>
			</UserContext.Provider>
		</ModalProvider>
	);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Root />
  </React.StrictMode>,
)
