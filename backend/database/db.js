import { Pool } from "pg";

 const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: "July2005",
    database: "final_exam"
})

export default pool