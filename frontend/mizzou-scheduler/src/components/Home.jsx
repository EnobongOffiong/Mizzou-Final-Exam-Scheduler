import React from "react";
import examSchedule from '../assets/exam-schedule.png'
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

function Home(){
    
    return(
        <>
           
            <div className="home">
                <div className="welcome">
                   <h1 className="welcome-header">Welcome to Mizzou Exam Scheduler!</h1>
                   <br></br>
                   <p className="welcome-text">Find your exam date by searching with the course name or class time.<br></br>
                    Then, export it to your personal calendar with ease!
                   </p>
                   <br></br>

                   <Button 
                        sx={{ backgroundColor: 'black', color: 'white' }}
                        variant="contained" className="welcome-btn" 
                        component={Link} to="/search">Get Started</Button>
                </div>

                <img className='home-welcome-img'src = {examSchedule}  alt='Boy looking at exam calendar'/>


            </div>
        </>
    )
}


export default Home