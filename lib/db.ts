import { Pool } from 'pg'; // Importa el tipo Pool de 'pg'
import dotenv from 'dotenv';

dotenv.config();


if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not defined in the environment variables.');
}

const pool: Pool = new Pool({
  
  connectionString: process.env.POSTGRES_URL,
  // ssl: {
  //   rejectUnauthorized: false
  // }
});

export default pool;
