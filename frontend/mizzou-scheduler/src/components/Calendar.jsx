import React,{ useState, useEffect} from "react";
import { DateTime } from "luxon";
import { AddToCalendarButton } from "add-to-calendar-button-react";


export default function Calendar() {

    const [examsArray, setExamsArray] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    
    useEffect(() => {
        const storedExams = JSON.parse(sessionStorage.getItem("Exams")) || []
        setExamsArray(storedExams)
        setTimeout(() => setIsLoaded(true), 50)
    }, []);

    function convert(input) {
        return DateTime.fromFormat(input, 'HH:mm:ss').toFormat('h:mm ')
    }

    function removeExam(index){

        let updatedExams = JSON.parse(sessionStorage.getItem("Exams")) || []
       
        updatedExams.splice(index, 1)

        sessionStorage.setItem("Exams", JSON.stringify(updatedExams));
        setExamsArray(updatedExams);
        
    }

    const dates = examsArray.map(exam => ({
        name : `${exam.Name} Final`,
        startTime: exam.exam_start_time,
        startDate: exam.exam_date,
        endTime: exam.exam_end_time
    }))

    return (
        <div className={`calendar ${isLoaded ? 'loaded' : ''}`}>
            <h1 className="calendar-header">CALENDAR</h1>
            <div className="added-exam-container">
                {examsArray.map((exam, index) => {
                    const isStartPm = exam.exam_start_time.split(":")[0] >= 12;
                    const isEndPm = exam.exam_end_time.split(":")[0] >= 12;

                    return (
                        <div 
                            className="added-exam"
                            key={index}
                            style={{
                                transitionDelay: `${index * 0.1}s`
                            }}
                        >
                            
                            <button className='delete-button ' onClick ={()=>removeExam(index)}>{'\u2715'}</button>
                            
                            <p>📝 Name: {exam.Name} final </p>
                            <p>📅 Exam date: {exam.exam_date}</p>
                            <p>🕒 From: {convert(exam.exam_start_time)} {isStartPm ? "pm" : "am"}</p>
                            <p>🕒 To: {convert(exam.exam_end_time)} {isEndPm ? "pm" : "am"}</p>
                        </div>
                    );
                })}
            </div>
            
            {dates.length > 0 ? (
                <AddToCalendarButton
                    name="My Exam Schedule"
                    dates={dates}
                    options={['Apple', 'Google', 'iCal']}
                    timeZone="America/Chicago"
                    buttonStyle="round"
                    label="Hit me to save!"
                />
            ) : (
                <p>No exams scheduled :)</p>
            )}
        </div>
    );
}