import pool from './database/db.js'

//function used to get exam date by course
export const getExamByCourse = async (req, res)=>{
   
    let {course, number: courseNum} = req.params // get course name and number from params
    course = course.toLowerCase()

    try{
        // query to get the exam ID of the request class
        const examIdResult = await pool.query('SELECT exam_id FROM course_or_meeting_time WHERE LOWER(course_name) = $1 AND course_num = $2',
        [course, courseNum])
      
        const examNum = examIdResult.rows[0].exam_id //store that exam ID

        //using stored exam ID to find the exam information
        try {
            const examDateResult = await pool.query('SELECT exam_date, exam_start_time, exam_end_time FROM exam WHERE id = $1', [examNum])
            console.log(examDateResult.rows[0]) 
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
           
    }
    catch(error){
        console.error(error)
            res.status(500).send(error)//error
    } 
}

//function used to get exam date by course
export const getExamByMeeting =  async(req, res) =>{
    let {meetingDays,startTime,endTime} = req.params
        meetingDays = meetingDays.toLowerCase()
        console.log(meetingDays)

        // query to get the exam ID of the request class by using the meeting days and times
    try{
       const examIdResult=  await pool.query('SELECT exam_id FROM meeting_time WHERE LOWER(meeting_days) = $1 AND meeting_start_time = $2 AND meeting_end_time = $3',
        [meetingDays, startTime, endTime])

        const examNum = examIdResult.rows[0].exam_id //store that exam ID
        console.log(examNum)
        
        //using stored exam ID to find the exam information
        try {
            const examDateResult= await pool.query('SELECT exam_date, exam_start_time, exam_end_time FROM exam where id = $1', [examNum])
            console.log(examDateResult.rows[0])
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    }
    catch(error){
        console.error(error)
            res.status(500).send(error)
    }
}