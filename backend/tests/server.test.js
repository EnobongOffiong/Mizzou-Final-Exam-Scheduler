import axios from "axios";
import { describe, it, expect, expectTypeOf} from "vitest";

describe('GET /:course/:number' , () => {

    it('should return 200 status code if course is found', async() => {
        const response = await axios.get("http://localhost:8080/economics/3229")
        
        expect(response.status).toBe(200)

        expectTypeOf(response.data.exam_date).toBeString()
        expectTypeOf(response.data.exam_start_time).toBeString()
        expectTypeOf(response.data.exam_end_time).toBeString()
    })

    it('should return 404 status code if any missing parameters', async() => {
        await expect(axios.get("http://localhost:8080//")).rejects.toMatchObject({
            response: {
              status: 404,
            },
          });
       
    })

    it('should return 500 status code for invalid course', async() => {
      await expect(axios.get("http://localhost:8080/invalid/999")).rejects.toMatchObject({
        response:{
            status: 500,
        }
      })
     
    })
})


describe('GET /:meetingDays/:startTime/:endTime', () => {
    it('should return 200 status code if course is found', async() => {
        const response = await axios.get("http://localhost:8080/MWF/08:00:00/08:50:00")
        expect(response.status).toBe(200)

        expectTypeOf(response.data.exam_date).toBeString()
        expectTypeOf(response.data.exam_start_time).toBeString()
        expectTypeOf(response.data.exam_end_time).toBeString()
    })

    it('should return 404 status code if missing parameters', async() => {
        await expect(axios.get("http://localhost:8080/TR//21:00:00")).rejects.toMatchObject({
            response: {
                status: 404,
            }
        })

    })

    it('should return 500 status code for invalid time format', async() => {

        await expect(axios.get("http://localhost:8080/mw/8am/8:50pm")).rejects.toMatchObject({
            response:{
                status: 500,
            }
          })
    })

    it('should return 404 status code for non-existent meeting pattern', async() => {
        await expect(axios.get("http://localhost:8080/x x/00:00/00:00")).rejects.toMatchObject({
            response:{
                status: 404
            }
        })
      
    })

})

