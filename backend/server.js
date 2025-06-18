import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { getExamByCourse, getExamByMeeting } from './routes.js'

export const app = express()
const router = express.Router()
const PORT = 8080

app.use(cors())

// endpoint to get an exam date by given course and course number
router.get('/:course/:number', getExamByCourse)
//endpoint to get an exam date by given meeting days and times
router.get('/:meetingDays/:startTime/:endTime', getExamByMeeting)

app.use('/', router)

app.listen(PORT, ()=> console.log("Server running"))