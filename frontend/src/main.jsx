import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import { ModalProvider, Modal } from './context/modal.jsx';
import './index.css'

function Root() {
	return (
		<ModalProvider>
				<BrowserRouter>
					<App />
					<Modal />
				</BrowserRouter>
		</ModalProvider>
	);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Root />
  </React.StrictMode>,
)
