import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import logo from '../assets/mizzou-logo.png'
function Nav(){

    const registrarWebsiteURL = 'https://registrar.missouri.edu/academic-calendar/final-exam-schedule/'
    return (
        <>
            <div className='navbar-container'>

                <nav className='navbar'>
                    <Link to='/' className='logo'>
                        <img className='logo-img'src = {logo}  alt='Mizzou Logo'/>
                    </Link>

                    <NavLink className= "navbar-item" activeClassName="active" to='/'>
                       
                       <p className='nav-text'>Home</p>
                    </NavLink>

                    <NavLink className= "navbar-item" activeClassName="active" to='/search'>
                   
                        <p>Search</p>
                    </NavLink>

                    <NavLink className= "navbar-item" activeClassName="active" to='/calendar'>
                        Calendar
                    </NavLink>

                    {/* <NavLink className= "navbar-item" activeClassName="active" to='/contact'>
                        Contact
                    </NavLink> */}

                    <Button sx={{ backgroundColor: '#FFFFFF', color: 'black' }} className= 'navbar-btn'variant='contained' href={registrarWebsiteURL} target='_blank' >
                    View Exam Schedules</Button>
                    
                </nav>
            </div>
        </>
    )
}

export default Nav