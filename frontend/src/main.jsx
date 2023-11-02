import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import { ModalProvider, Modal } from './context/modal.jsx';
import './index.css'

export const UserContext = createContext();

import ApiCalendar from "react-google-calendar-api";

const config = {
	clientId: "762633836570-vpbro17viheb27tl43n2v7qq76aljd8b.apps.googleusercontent.com",
  apiKey: "AIzaSyC1UIZ4AhrqAxk_7mc3R2RUjlwoJvZaKbI",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
		"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(config);
export const CalendarContext = createContext();

function Root() {
	const [user, setUser] = useState(null);
	const userState = { user, setUser }
	console.log(apiCalendar)


	return (
		<ModalProvider>
			<UserContext.Provider value={userState}>
				<CalendarContext.Provider value={apiCalendar}>
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
