// db.js

import pg from 'pg';
const { Pool } = pg
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // For self-signed certificates
  },
});

export async function query(text:string, params:any) {
  // console.log('executing query', text,params);
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}
