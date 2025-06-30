import React, { useState } from "react"
import { Button } from "@mui/material"
import Select from 'react-select'
import axios from "axios"
import { courseNames } from "./CourseOptions/courseNames"
import { courseNums } from "./CourseOptions/courseNums"

const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE_URL_PROD
  : 'http://localhost:8080';

export default function SearchByCourse({ 
    setSearchingByCourse, 
    setNotFound, 
    setCourseFound,
    setDuplicate,
    setDuplicateExam 
}) {

    //state storing the course and cour name users select
    const [formData, setFormData] = useState({
        courseName: "",
        courseNumber: ""
    });


    const [res, setRes] = useState({}); // response from query

    const courseNameOptions = courseNames
    const courseNumOptions = courseNums

     //handle add to calendar
    async function handleSubmit(e) {
        e.preventDefault(); //prevent errors
        
        let { courseName, courseNumber } = formData; 
        console.log(formData);
        console.log(import.meta.env)
        console.log("hey")
        console.log(import.meta.env.VITE_API_BASE_URL_PROD )
        const url = `${API_BASE_URL}/${courseName}/${courseNumber}`; //populate url with provided information
        
        try {
            setNotFound(false);
            const response = await axios.get(url);
            let data = response.data;
            
            data = {
                ...data,
                Name: `${formData.courseName} ${formData.courseNumber}`,
                exam_date: data.exam_date.split('T')[0]
            };// format the exam date gotten from the response and add the exam name
            
            
           // setRes(data);

            console.log(data);
            console.log(import.meta.env)
            const existingExams = JSON.parse(sessionStorage.getItem("Exams")) || [];  // fetch existing exams from session storage if any
            let updatedExams = [...existingExams];
            
            let isDuplicate = false;//duplicate exam checker

            //look if exam is already added
            for(let exam of existingExams) {
                if(JSON.stringify(data) === JSON.stringify(exam)) {
                    isDuplicate = true;
                    setDuplicateExam(exam.Name);
                    setDuplicate(true);
                    break;
                }
            }

            //if exam isnt already stored, add it to the update exams array before sending that to session storage
            if(!isDuplicate) {
                setCourseFound(true);
                updatedExams = [...existingExams, data];
            }

              // pass updated exams to session storage
            sessionStorage.setItem("Exams", JSON.stringify(updatedExams));

        } catch (error) {
            console.error('Error fetching data:', error);
            if(error.response?.status === 404) {
                setNotFound(true);
            }
        }
    }

    // handles the selection of course name and course number
    function handleSelectChange(selectedOption, meta) {
        console.log(meta);
        setFormData({
            ...formData,
            [meta.name]: selectedOption.value
        });
        console.log(selectedOption);
    }

    return (
        <div className="search-by-course">
            <form className='search-form' onSubmit={handleSubmit}>
                <h1 className="search-form-header">SEARCH BY COURSE</h1>

                <p className="search-form-instructions">
                    Some courses have special exam dates that override normal
                    scheduling rules. Use this search if your course might be one of them. 
                </p>

                <p className="search-form-instructions">
                    Search for your course using the dropdowns below. Found it?
                    Slam that 'Add to Calendar' button! 🚀 
                </p>
                
                <p className="search-form-instructions">
                    Can't find any of your courses? Click "Course not listed" to search 
                    by class time instead. 
                </p>
                
                <Select 
                    className="search-form-select courseName" 
                    name="courseName"
                    options={courseNameOptions} 
                    onChange={handleSelectChange} 
                    placeholder="Select a course"  
                    isSearchable={true}
                />

                <Select 
                    className="search-form-select" 
                    name="courseNumber"
                    options={courseNumOptions} 
                    onChange={handleSelectChange}
                    placeholder="Select a course number"  
                    isSearchable={true}
                />

                <Button 
                    sx={{ backgroundColor: 'black', color: 'white' }} 
                    className='search-form-submit'
                    variant="contained"
                    color="primary" 
                    type="submit"
                >
                    ADD TO CALENDAR
                </Button>     

                <div className="search-alt-text-container">
                    <a href="/calendar" className="search-alt-text">
                        <p>View Calendar</p>
                    </a>

                    <p 
                        onClick={() => {
                            setSearchingByCourse(false);
                            setNotFound(false);
                            setCourseFound(false);
                            setDuplicate(false)
                        }} 
                        className="search-alt-text"
                    >
                        Course not listed?
                    </p>
                </div>

                
            </form>
        </div>
    );
}