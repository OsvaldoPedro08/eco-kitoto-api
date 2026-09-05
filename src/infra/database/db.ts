import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

const pool = new Pool({
    connectionString : process.env.DATABASE_URL!,
    ssl : {
        rejectUnauthorized : false, // permite certificados do supabase/Pooler
    }
})

export const db = drizzle({ client : pool })