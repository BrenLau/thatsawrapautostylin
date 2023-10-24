import { useState } from 'react'
import Footer from './components/footer'
import './App.css'
import Nav from './components/nav'
import AboutMe from './components/about-me'

function App() {
  return (
    <>
      <Nav />
      <AboutMe />
      <Footer/>
    </>
  )
}

export default App
