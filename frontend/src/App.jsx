// import { useState } from 'react'
import Footer from './components/footer'
import { Route } from 'react-router-dom'
import './App.css'
import Nav from './components/nav'
import Booking from './components/booking'

function App() {

  return (
    <>
      <Nav />
      <Footer/>
      {/* <Route exact path='/booking'>
        <Booking />
      </Route> */}
    </>
  )
}

export default App
