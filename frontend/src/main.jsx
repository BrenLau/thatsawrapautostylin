import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import { ModalProvider, Modal } from './context/modal.jsx';
import './index.css'

export const UserContext = createContext();

function Root() {
	const [user, setUser] = useState(null);
	const userState = { user, setUser }

	return (
		<ModalProvider>
			<UserContext.Provider value={userState}>
				<BrowserRouter>
					<App />
					<Modal />
				</BrowserRouter>
			</UserContext.Provider>
		</ModalProvider>
	);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Root />
  </React.StrictMode>,
)
