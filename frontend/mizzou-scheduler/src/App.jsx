import { useState, useEffect } from 'react'
import { NavLink ,Link} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Home from './components/Home.jsx'
import Search from './components/Search.jsx'

function App() {
  return (
    <div className='App'>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
      </Routes>
    </div>
  )
}

export default App
