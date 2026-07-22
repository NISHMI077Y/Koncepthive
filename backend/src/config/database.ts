import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not defined in .env file!');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test connection
pool.query('SELECT NOW()', (err: Error | null, res: any) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
    console.error('📝 Check your DATABASE_URL in .env file');
    console.error('📝 Make sure PostgreSQL is running');
    console.error('📝 Make sure database "taskmanagement" exists');
  } else {
    console.log('✅ Database connected successfully');
    console.log('📅 Server time:', res.rows[0].now);
  }
});

pool.on('error', (err: Error) => {
  console.error('❌ Unexpected database error:', err);
});

export default pool;