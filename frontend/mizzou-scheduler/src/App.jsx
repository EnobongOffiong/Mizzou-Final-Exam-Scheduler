// import { useState, useEffect } from 'react'
// import { NavLink ,Link} from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Home from './components/Home.jsx'
import Search from './components/Search.jsx'
import Calendar from './components/Calendar.jsx'
import Footer from './components/Marquee.jsx'
import { Analytics } from '@vercel/analytics/react';

function App() {
  
  
  return (
    <div className='App'>
      <Footer/>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/search' element={<Search  /> }></Route>
        <Route path='/calendar' element={<Calendar />}></Route>
      </Routes>
      <Analytics />
    </div>
  )
}

export default App