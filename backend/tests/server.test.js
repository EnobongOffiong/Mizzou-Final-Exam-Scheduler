
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

  describe('GET /api/:course/:number', () => {
    it('should return 200 with exam details for valid course', async () => {
      // Mock the database responses
      pool.query
        .mockResolvedValueOnce({ rows: [{ exam_id: 5 }] }) // First query
        .mockResolvedValueOnce({ rows: [{ // Second query
            
                exam_date: '2025-12-16',
                exam_start_time: '15:00:00',
                exam_end_time: '17:00:00'

            }] });

      const response = await axios.get(`${baseURL}/api/economics/3229`);
      
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        exam_date: '2025-12-16',
        exam_start_time: '15:00:00',
        exam_end_time: '17:00:00'

    });

      // Verify database was called correctly
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT exam_id FROM course WHERE LOWER(course_name) = $1 AND course_num = $2',
        ['economics', '3229']
      );
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT exam_date, exam_start_time, exam_end_time FROM exam WHERE id = $1',
        [5]
      );
    });
  })
  
  describe('GET /api/:meetingDays/:startTime/:endTime',  () => {
    it('should return 200 for exams details for valid meeting time', async() => {
        
        pool.query.mockResolvedValueOnce({rows:[{exam_id: 2}] })
        pool.query.mockResolvedValueOnce({rows:
        [
            {
                exam_date: '2025-12-18',
                exam_start_time: '15:00:00',
                exam_end_time: '17:00:00'

            }
        ]})

        const response = await axios.get(`${baseURL}/api/tr/11:00:00/11:50:00`)

        

        expect(response.status).toBe(200);
      expect(response.data).toEqual({
        exam_date: '2025-12-18',
        exam_start_time: '15:00:00',
        exam_end_time: '17:00:00'
      })

      expect(pool.query).toHaveBeenCalledWith('SELECT exam_id FROM meeting_time WHERE LOWER(meeting_days) = $1 AND meeting_start_time = $2 AND meeting_end_time = $3',
        ['tr', '11:00:00', '11:50:00'])

        expect(pool.query).toHaveBeenCalledWith('SELECT exam_date, exam_start_time, exam_end_time FROM exam where id = $1', [2])
    })
  })
  ;
});
