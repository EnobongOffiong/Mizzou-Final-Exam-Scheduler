import React from "react";
import { useState} from "react";
import SearchByCourse from "./SearchByCourse";
import SearchByTime from "./SearchByTime";

export default function Search(){
// State for tracking if no exams were found in the search
const [notFound, setNotFound] = useState(false);

// State for tracking if an exam was successfully added to the calendar
const [courseFound, setCourseFound] = useState(false);

// State for tracking if a duplicate exam was found in session storage
const [duplicate, setDuplicate] = useState(false);

// State for storing the name of the duplicate exam (if any)
const [duplicateExam, setDuplicateExam] = useState('');

    //state variable to set whether the user is searching for exam  date by course or not(by time)
     const [searchingByCourse,setSearchingByCourse] = useState(true) 

    return(
        <>
            {searchingByCourse ? (
                <SearchByCourse 
                    setSearchingByCourse={setSearchingByCourse}
                    setNotFound={setNotFound}
                    setCourseFound={setCourseFound}
                    setDuplicate={setDuplicate}
                    setDuplicateExam={setDuplicateExam}
                />
            ) : (
                <SearchByTime 
                    setSearchingByCourse={setSearchingByCourse}
                    setNotFound={setNotFound}
                    setCourseFound={setCourseFound}
                    setDuplicate={setDuplicate}
                    setDuplicateExam={setDuplicateExam}
                />
                
            )}
            
            {notFound && <p className="not-found-message">Course not found. Please try again</p>}
            {courseFound && <p className="found-message">Exam added to calendar!</p>}
            {duplicate && <p className="duplicate-message">Conflicting exam time already in calendar: {duplicateExam}</p>}
        </>
    )
}

