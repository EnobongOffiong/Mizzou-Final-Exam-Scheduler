import React from "react";
import { useState } from "react";
import { Button, selectClasses } from "@mui/material";
import Select from 'react-select'
import axios from "axios";
import { AddToCalendarButton } from "add-to-calendar-button-react";

function displayExam(data, formData){
    // console.log(`Your ${formData.courseName} ${formData.courseNumber} final is on ${data.exam_date} from 
    // ${data.exam_start_time} to ${data.exam_end_time}`)

    console.log("Your exam has been added to your calendar")
}
function Search(){
    const days = [
        { value: "M", id: "0", label: "Monday" },
        { value: "T", id: "1", label: "Tuesday" },
        { value: "W", id: "2", label: "Wednesday" },
        { value: "R", id: "3", label: "Thursday" },
        { value: "F", id: "4", label: "Friday" }
      ];
    // state variable used to store form data from the search-by-course form
    const [formData, setFormData] = useState({
        courseName: "",
        courseNumber: ""
    })

    const [startTime, setStartTime] = useState('08:00') // state variable used to store the start time for search by time functionality

    const [endTime, setEndTime] = useState('08:50') // state variable used to store the end time for search by time functionality

    let [selectedDays, setSelectedDays] = useState([]) // state variable used to store the selected days for search by time functionality

    const [res, setRes] = useState({})
    //array of course name options displayed to user when searching by course
    const courseNameOptions = [{
        value: 'economics', label: 'ECON'
    }]

    //array of course number options displayed to user when searching by course
    const courseNumOptions = [{
        value: 3229, label: '3229'
    }]

    //state variable to set whether the user is searching for exam  date by course or not(by time)
     const [searchingByCourse,setSearchingByCourse] = useState(true) 
   
    //asynchronous function that handles the submission of data by the user and fetches the data requested
    async function handleSubmit(e){
        e.preventDefault() //prevent errors
        
        let {courseName, courseNumber} = formData
        console.log(formData)
        if(searchingByCourse){
        const url = `http://localhost:8080/${courseName}/${courseNumber}` //set url for searching by course
    
        
        try {

            const response = await axios.get(url);
            let data =  response.data;
            console.log('Received data:', data);
            data = {
                ...data,
                exam_date: data.exam_date.split('T')[0]
            }
            setRes(data)
            displayExam(data, formData)
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
        }
        else{
            let meetingDays=''
            for(let day in selectedDays){
                meetingDays += selectedDays[day].value
            }
            const url = `http://localhost:8080/${meetingDays}/${startTime}/${endTime}` //set url for searching by time

            try {
                const response = await axios.get(url);
                
                let data =  response.data;
                data = {
                    ...data,
                    exam_date: data.exam_date.split('T')[0]
                }
                setRes(data)
                displayExam(data, formData)

                console.log('Received data:', data);
              } catch (error) {
                console.error('Error fetching data:', error);
              } 

              setSelectedDays([])
              setEndTime('08:50')
              setStartTime('08:00')
        }
       
       console.log(selectedDays)
    }

    // function that stores days in the selected days array when clicked
    function handleDaySelect(e){

        if(selectedDays.some(d=>d.id === e.target.id)){
            setSelectedDays(selectedDays.filter(day=> day.id !== e.target.id))
            return
        }

        setSelectedDays([...selectedDays,{id: e.target.id , value: e.target.value}])

        selectedDays.sort((a,b)=> parseInt(a.id) - parseInt(b.id) // sort the array by each entries id when a new entry is added

        
   )
   console.log(selectedDays)
   console.log(res)
    }

    //function that handles the any change in time selection and updates the required state accordingly
    function handleTimeChange(e){
        e.target.ariaLabel == 'startTime'?
            setStartTime(`${e.target.value}:00`) : setEndTime(`${e.target.value}:00`) // set start time or end time 

    };

    //function that handles changes in the select dropdown when searching by course
    function handleSelectChange(selctedOption, meta){

        console.log(meta)

        setFormData({
            ...formData,
            [meta.name] : selctedOption.value
        })
        console.log(selctedOption)
        
    }

    

    return(
        <>
        {
            // display one or the other div based on whether user is searching by course or by time
        searchingByCourse ?

        <div className="search-by-course">
            <form className='search-form' onSubmit={handleSubmit}>
                <h1 className="search-form-header">SEARCH BY COURSE</h1>
                <p className="search-form-instructions">Find your exam scheule by using the dropdowns below to search for your courses. If your course is not listed,
                    Click on "Course not listed"
                </p>
                <p className="search-form-instructions">To add an exam to your calendar, simply click the button. Once you are done, go to the 
                    Calendar section and export your personalized schedule!</p>
                    {/* <label className="search-form-label">
                        Select for your exam using the dropdowns below
                    </label> */}

                    <Select className="search-form-select" name="courseName"
                    options={courseNameOptions} onChange={handleSelectChange} 
                    placeholder="Select a course"  isSearchable='true'/>

                    <Select className="search-form-select" name ="courseNumber"
                    options={courseNumOptions} onChange={handleSelectChange}
                    placeholder="Select a course number"  isSearchable='true'/>

                    <Button className='search-form-submit'variant="contained"
                        color="primary" type="submit">
                            ADD TO CALENDAR
                    </Button>     

            </form>
            <div className="search-alt-text-container">
                <a href="/calendar" className="search-alt-text">
                    <p>View Calendar</p>
                    </a>
                <p onClick={()=>setSearchingByCourse(false)} className="search-alt-text">
                    Course not listed?
                </p>
            </div>
        </div>
        :
            <div className="search-by-time">
             
             <div className="search-by-time-container">
             <h1 className="search-form-header">SEARCH BY MEETING TIME</h1>
                <div className="search-by-time-btn-container">
                
                    <p className="time-input-label">What days do you have this class?</p>
                    
                    <div>
                        {days.map((day)=>{
                        return(
                            <button
                                id={day.id}
                                onClick={handleDaySelect}
                                value={day.value}
                                className={selectedDays.some(d => d.value === day.value) ? 'selected' : 'search-by-time-btn'}>{day.label}</button>
                        )})}
                    </div>


                    <p className="time-input-label">When does your class start</p>
                    <input  className="time-input"aria-label="startTime" onChange={handleTimeChange} value={startTime} type="time" />
                    

                    <p className="time-input-label">When does your class end</p>
                    <input className="time-input" aria-label="endTime" type="time" onChange={handleTimeChange} value={endTime}/>
                </div>

                

                {/* <Button sx={{ backgroundColor: 'black', color: 'white' }} className='search-form-submit' variant="contained"
                            onClick={handleSubmit}>
                                ADD TO CALENDAR
                </Button>    */}

                <AddToCalendarButton

                    name="Test-Event"
                    startDate={res.exam_date}
                    endDate={res.exam_date}
                    startTime={res.exam_start_time}
                    endTime={res.exam_end_time}
                    options={['Apple','Google','Yahoo','iCal']}
                    timeZone="America/Chicago"
                    ></AddToCalendarButton>
                </div>
            </div>
}
        </>
    )
}

export default Search