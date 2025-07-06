import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { getExamByCourse, getExamByMeeting } from './routes.js'

export const app = express()

const router = express.Router()
const PORT = 8080
app.use(express.json())
app.use(cors({
    origin: [
      'http://localhost:5173', // Dev
      'https://mizzou-scheduler.vercel.app' // Prod frontend
    ],
    methods: ['GET']
  }));

// endpoint to get an exam date by given course and course number
router.get('/:course/:number', getExamByCourse)
//endpoint to get an exam date by given meeting days and times
router.get('/:meetingDays/:startTime/:endTime', getExamByMeeting)

app.use('/api', router)

app.listen(PORT, ()=> console.log("Server running"))
export default app