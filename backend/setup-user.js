const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

async function setupUser() {
  console.log('🔧 Setting up admin user...\n');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // 1. Generate the password hash for "123456"
    const password = '123456';
    const hash = await bcrypt.hash(password, 10);
    console.log('✅ Password hash generated');

    // 2. Delete any existing admin users
    await pool.query("DELETE FROM users WHERE email = 'admin@test.com'");
    console.log('🗑️ Old admin user removed (if any)');

    // 3. Insert the new admin user with the correct hash
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      ['Admin', 'admin@test.com', hash]
    );
    
    console.log('✅ New admin user created:');
    console.table(result.rows);

    // 4. Test if the password actually matches
    const savedUser = await pool.query("SELECT password FROM users WHERE email = 'admin@test.com'");
    const isMatch = await bcrypt.compare('123456', savedUser.rows[0].password);
    
    console.log('\n🔐 Password verification test:', isMatch ? '✅ MATCH! Login will work!' : '❌ NO MATCH');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Make sure your backend .env DATABASE_URL is correct and database is running');
  } finally {
    await pool.end();
  }
}

setupUser();