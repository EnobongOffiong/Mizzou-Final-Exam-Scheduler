// import axios from "axios";
// import { describe, it, expect, expectTypeOf, beforeAll, afterAll} from "vitest";
// import { app } from '../server.js';
// import { createServer } from 'http';

// vi.mock('../database/db.js', () => {
//     const mockPool = {
//       query: vi.fn(),
//       end: vi.fn()
//     };
//     return { default: mockPool }; 
//   });
  
  
//   // 2. Import the mocked pool after setting up the mock
//   const { default: pool } = await import('../database/db.js');
//   // console.log(pool)
  
//   let server;
//   let baseURL;

// describe('GET /:course/:number' , () => {
//     beforeAll(async () => {
//         server = createServer(app);
//         console.log(server)
//         await new Promise((resolve) => server.listen(0, resolve));
//         baseURL = `http://localhost:${server.address().port}`;
//       });
    
//       afterAll(async () => {
//         server.close();
//       });
    
//       afterEach(() => {
//         vi.clearAllMocks();
//       });
    
//     it('should return 200 status code if course is found', async() => {
//         const response = await axios.get("http://localhost:8080/economics/3229")
        
//         expect(response.status).toBe(200)

//         expectTypeOf(response.data.exam_date).toBeString()
//         expectTypeOf(response.data.exam_start_time).toBeString()
//         expectTypeOf(response.data.exam_end_time).toBeString()
//     })

//     it('should return 404 status code if any missing parameters', async() => {
//         await expect(axios.get("http://localhost:8080//")).rejects.toMatchObject({
//             response: {
//               status: 404,
//             },
//           });
       
//     })

//     it('should return 500 status code for invalid course', async() => {
//       await expect(axios.get("http://localhost:8080/invalid/999")).rejects.toMatchObject({
//         response:{
//             status: 500,
//         }
//       })
     
//     })
// })


// describe('GET /:meetingDays/:startTime/:endTime', () => {
//     beforeAll(async () => {
//         server = createServer(app);
//         console.log(server)
//         await new Promise((resolve) => server.listen(0, resolve));
//         baseURL = `http://localhost:${server.address().port}`;
//       });
    
//       afterAll(async () => {
//         server.close();
//       });
    
//       afterEach(() => {
//         vi.clearAllMocks();
//       });
    
//     it('should return 200 status code if course is found', async() => {
//         const response = await axios.get("http://localhost:8080/MWF/08:00:00/08:50:00")
//         expect(response.status).toBe(200)

//         expectTypeOf(response.data.exam_date).toBeString()
//         expectTypeOf(response.data.exam_start_time).toBeString()
//         expectTypeOf(response.data.exam_end_time).toBeString()
//     })

//     it('should return 404 status code if missing parameters', async() => {
//         await expect(axios.get("http://localhost:8080/TR//21:00:00")).rejects.toMatchObject({
//             response: {
//                 status: 404,
//             }
//         })

//     })

//     it('should return 500 status code for invalid time format', async() => {

//         await expect(axios.get("http://localhost:8080/mw/8am/8:50pm")).rejects.toMatchObject({
//             response:{
//                 status: 500,
//             }
//           })
//     })

//     it('should return 404 status code for non-existent meeting pattern', async() => {
//         await expect(axios.get("http://localhost:8080/x x/00:00/00:00")).rejects.toMatchObject({
//             response:{
//                 status: 404
//             }
//         })
      
//     })

// })

import axios from "axios";
import { describe, it, expect, expectTypeOf, vi, beforeAll, afterAll } from "vitest";
import { app } from '../server.js';
import { createServer } from 'http';

// 1. Properly mock the db.js module
vi.mock('../database/db.js', () => {
  const mockPool = {
    query: vi.fn(),
    end: vi.fn()
  };
  return { default: mockPool }; // This matches the "import pool from './db.js'" syntax
});

// 2. Import the mocked pool after setting up the mock
const { default: pool } = await import('../database/db.js');

let server;
let baseURL;

describe('API Endpoints with DB Mocking', () => {
  beforeAll(async () => {
    server = createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    baseURL = `http://localhost:${server.address().port}`;
  });

  afterAll(async () => {
    server.close();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /:course/:number', () => {
    it('should return 200 with exam details for valid course', async () => {
      // Mock the database responses
      pool.query
        .mockResolvedValueOnce({ rows: [{ exam_id: 5 }] }) // First query
        .mockResolvedValueOnce({ rows: [{ // Second query
            
                exam_date: '2025-05-12',
                exam_start_time: '17:30:00',
                exam_end_time: '19:30:00'

            }] });

      const response = await axios.get(`${baseURL}/economics/3229`);
      
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        exam_date: '2025-05-12',
        exam_start_time: '17:30:00',
        exam_end_time: '19:30:00'

    });

      // Verify database was called correctly
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT exam_id FROM course_or_meeting_time WHERE LOWER(course_name) = $1 AND course_num = $2',
        ['economics', '3229']
      );
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT exam_date, exam_start_time, exam_end_time FROM exam WHERE id = $1',
        [5]
      );
    });
  })
  
  describe('GET /:meetingDays/:startTime/:endTime',  () => {
    it('should return 200 for exams details for valid meeting time', async() => {
        
        pool.query.mockResolvedValueOnce({rows:[{exam_id: 2}] })
        pool.query.mockResolvedValueOnce({rows:
        [
            {
                exam_date: '2025-05-12',
                exam_start_time: '10:00:00',
                exam_end_time: '12:00:00'

            }
        ]})

        const response = await axios.get(`${baseURL}/tr/11:00:00/11:50:00`)

        

        expect(response.status).toBe(200);
      expect(response.data).toEqual({
        exam_date: '2025-05-12',
        exam_start_time: '10:00:00',
        exam_end_time: '12:00:00'
      })

      expect(pool.query).toHaveBeenCalledWith('SELECT exam_id FROM meeting_time WHERE LOWER(meeting_days) = $1 AND meeting_start_time = $2 AND meeting_end_time = $3',
        ['tr', '11:00:00', '11:50:00'])

        expect(pool.query).toHaveBeenCalledWith('SELECT exam_date, exam_start_time, exam_end_time FROM exam where id = $1', [2])
    })
  })
  ;
});
