import React from "react";
import NavBar from "./Nav";
import Select from 'react-select'
import { Button, Typography } from '@mui/material';

function Home(){
    const courseNameOptions = [{
        value: 'economics', label: 'Economics'
    }]

    const courseNumOptions = [{
        value: 3229, label: '3229'
    }]
    return(
        <>
            <NavBar />
            <div>
                {/* <h3 className="dropdown-header">Select your course from the dropdowns</h3> */}
                
                <form onSubmit={handleSubmit}>
                    <label>Select your course from the dropdowns below</label>
                    <Select options={courseNameOptions} />
                    <Select options={courseNumOptions} />

                    <button type="submit" >Get Exam</button>
      <Button variant="contained" color="primary" type="submit">
        Click Me
      </Button>
                </form>
                

            </div>
        </>
    )
}
const handleSubmit = (e) =>{
    e.preventDefault()

    alert("From submitted")
}

export default Home