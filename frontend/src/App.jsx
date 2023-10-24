// import { useState } from 'react'
import Footer from './components/footer'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/nav'
import Booking from './components/booking'

function App() {

  return (
    <>
      <Nav />
      <Footer />
      {/* <Switch> */}
      <Routes>
        <Route exact path='/booking'>
          <Booking />
        </Route>
      </Routes>
      {/* </Switch> */}
    </>
  )
}

export default App
