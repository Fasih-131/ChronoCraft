const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://postgres.ertvypefpuyxvybuxzbq:%26%2F%402vpH5b9%3FThCn@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres';
const sqlFilePath = 'C:\\Users\\ZESTRO\\.gemini\\antigravity-ide\\brain\\3001f194-3e2d-4f64-b0eb-ccb3155ccb65\\supabase_seed.sql';

async function seed() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Supabase...');
    await client.connect();

    console.log('Reading SQL file...');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('Executing SQL...');
    await client.query(sql);
    
    console.log('Database successfully seeded with ChronoCraft components!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await client.end();
  }
}

seed();
