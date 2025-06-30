import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import TimePicker from 'react-time-picker';

const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE_URL_PROD
  : 'http://localhost:8080';

//array for dynamically rendering buttons for days of the week
const days = [
    { value: "M", id: "0", label: "Monday" },
    { value: "T", id: "1", label: "Tuesday" },
    { value: "W", id: "2", label: "Wednesday" },
    { value: "R", id: "3", label: "Thursday" },
    { value: "F", id: "4", label: "Friday" }
];

export default function SearchByTime({ 
    setSearchingByCourse, 
    setNotFound, 
    setCourseFound,
    setDuplicate
}) {
   
    const [res, setRes] = useState({}); // response from query

    //state for storing the name that a user gives the exam when searching by meeting time
    const [examName, setExamName] = useState('');

    //state for storing the class start time
    const [startTime, setStartTime] = useState('08:00');

     //state for storing the class end time
    const [endTime, setEndTime] = useState('08:50');

    // state variable used to store the selected days for search by time functionality
    const [selectedDays, setSelectedDays] = useState([]);

    // state varaible for holding the name of duplicate exams to inform user what is conflicting
    const [duplicateExam, setDuplicateExam] = useState('');

    //handle add to calendar
    async function handleSubmit(e) {
        e.preventDefault();
        
        if(!examName) {
            alert("Please name the exam")
            return;
        }

        let meetingDays = '';
        selectedDays.sort((a, b) => parseInt(a.id) - parseInt(b.id)); // sort selected days 
        for(let day in selectedDays) {
            meetingDays += selectedDays[day].value; 
        }

        const url = `${API_BASE_URL}/${meetingDays}/${startTime}/${endTime}`; //populate url with provided information

        try {

            const response = await axios.get(url);
            let data = response.data;
            data = {
                ...data,
                Name: examName,
                exam_date: data.exam_date.split('T')[0]
            }; // format the exam date gotten from the response and add the exam name

            const existingExams = JSON.parse(sessionStorage.getItem("Exams")) || []; // fetch existing exams from local storage if any
            let updatedExams = [...existingExams]; 
            
            let isDuplicate = false; //duplicate exam checker

            //look if exam is already added
            for(let exam of existingExams) {
                if(JSON.stringify(data.exam_date) === JSON.stringify(exam.exam_date) && 
                   JSON.stringify(data.exam_start_time) === JSON.stringify(exam.exam_start_time)) {
                    setDuplicateExam(exam.Name);
                    isDuplicate = true;
                    setDuplicate(true);
                    break;
                }
            }

            //if exam isnt already stored, add it to the update exams array before sending that to session storage
            if(!isDuplicate) {
                updatedExams = [...existingExams, data];
                setCourseFound(true);
            }

            // pass updated exams to session storage
            sessionStorage.setItem("Exams", JSON.stringify(updatedExams));
            
            // Reset form
            setSelectedDays([]);
            setEndTime('08:50');
            setStartTime('08:00');
            setExamName('');

        } catch (error) {
            console.error('Error fetching data:', error);
            if(error.response?.status === 404) {
                setNotFound(true);
            }
        }
    }

    // handles the selection logic of days
    function handleDaySelect(e) {
        
        //if a day is clicked again after it is selected, remove it from selected days(unselect)
        if(selectedDays.some(d => d.id === e.target.id)) {
            setSelectedDays(selectedDays.filter(day => day.id !== e.target.id));
            return;
        }
        
        //else add it to selected days
        setSelectedDays([...selectedDays, {id: e.target.id, value: e.target.value}]);
    }

    //set time states according to which is changed
    function handleTimeChange(time, pickerType) {
        pickerType === 'startPicker' 
            ? setStartTime(`${time}:00`) 
            : setEndTime(`${time}:00`);
    }

    return (
        <div className="search-by-time">
            <div className="search-by-time-container">
                <h1 className="search-form-header">SEARCH BY MEETING TIME</h1>
                
                <p className="search-form-instructions">
                    Find standard exam times based on your class schedule. Click "Add to Calendar"
                    when done. Your Calendar tab will show all exams ready for export!
                </p>
        
                <div className="name-input-div">
                    <p className="time-input-label">Name this class:</p>
                    <input 
                        className="search-by-time-name-input" 
                        type="text" 
                        required 
                        value={examName}
                        placeholder="STATS 4710, Piano Class, etc." 
                        onChange={(e) => setExamName(e.target.value)}
                    />
                </div>
                
                <div>
                    <p className="time-input-label">What days do you have this class?</p>
                    
                    <div style={{marginBottom: '15px'}}>
                        {days.map((day) => (
                            <button
                                key={day.id} 
                                id={day.id}
                                onClick={handleDaySelect}
                                value={day.value}
                                className={selectedDays.some(d => d.value === day.value) ? 'selected' : 'search-by-time-btn'}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="time-input-label">When does your class start?</p>
                    <TimePicker 
                        className="time-input"
                        onChange={(time) => handleTimeChange(time, 'startPicker')}
                        clearIcon={null}
                        value={startTime}
                        disableClock={true}
                        format="h:mm a"
                    />
                </div>

                <div>
                    <p className="time-input-label">When does your class end?</p>
                    <TimePicker 
                        className="time-input"
                        onChange={(time) => handleTimeChange(time, 'endPicker')}
                        clearIcon={null}
                        value={endTime}
                        disableClock={true}
                        format="h:mm a"
                    />
                </div>

                <Button 
                    sx={{ backgroundColor: 'black', color: 'white' }} 
                    className='search-form-submit' 
                    variant="contained"
                    onClick={handleSubmit}
                >
                    ADD TO CALENDAR
                </Button>   

                <div className="search-alt-text-container">
                    <Link to="/calendar" className="search-alt-text">
                        <p>View Calendar</p>
                    </Link>

                    <p 
                        onClick={() => {
                            setSearchingByCourse(true);
                            setNotFound(false);
                            setCourseFound(false);
                            setDuplicate(false)
                        }}
                        className="search-alt-text"
                    >
                        Search by course
                    </p>
                </div>
            </div>
        </div>
    );
}