import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import Select from 'react-select'
import axios from "axios";
function Search(){

    const [formData, setFormData] = useState({
        courseName: "",
        courseNumber: ""
    })

    
    const courseNameOptions = [{
        value: 'economics', label: 'ECON'
    }]

    async function handleSubmit(e){
        e.preventDefault()

        let {courseName, courseNumber} = formData
        console.log(formData)
        const url = `http://localhost:8080/${courseName}/${courseNumber}`
    
        try {
            const response = await axios.get(url);
            const data =  response.data;
            console.log('Received data:', data);
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
    }

    function handleChange(selctedOption, meta){

        console.log(meta)
        setFormData({
            ...formData,
            [meta.name] : selctedOption.value
        })
        console.log(selctedOption)
        
    }

    const courseNumOptions = [{
        value: 3229, label: '3229'
    }]

    const [searchingByCourse,setSearchingByCourse] = useState(true)
    return(
        <>
            <form className='search-form' onSubmit={handleSubmit}>
                    <label>Select your course from the dropdowns below</label>
                    <Select className="search-form-select" name="courseName" options={courseNameOptions} onChange={handleChange} 
                    placeholder="Select a course"/>
                    <Select className="search-form-select" name ="courseNumber" options={courseNumOptions} onChange={handleChange}
                    placeholder="Select a course number"  />

                    {/* <button type="submit" >Get Exam</button> */}
                    <Button className='search-form-submit'variant="contained" color="primary" type="submit">
                        Get Course
                    </Button>
                </form>
        </>
    )
}

export default Search