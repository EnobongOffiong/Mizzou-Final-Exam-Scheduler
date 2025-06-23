import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
function Nav(){

    const registrarWebsiteURL = 'https://registrar.missouri.edu/academic-calendar/final-exam-schedule/'
    const logoImgURL= 'https://content.sportslogos.net/logos/32/757/full/missouri_tigers_logo_secondary_19998019.png'
    return (
        <>
            <div className='navbar-container'>

                <nav className='navbar'>
                    <Link to='/' className='logo'>
                        <img className='logo-img'src = {logoImgURL}  alt='Mizzou Logo'/>
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