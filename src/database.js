import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
export const connection = new Pool({
  connectionString: process.env.DATABASE_URL
});


// CREATE TABLE shortUrls(
//   id SERIAL PRIMARY KEY,
//   "shortUrl" TEXT NOT NULL UNIQUE,
//   "url" TEXT NOT NULL,
//   "userId" INTEGER NOT NULL REFERENCES users(id)
//   "visitCount" INTEGER NOT NULL DEFAULT 0  
// );

// CREATE TABLE urls (
//   id SERIAL PRIMARY KEY, 
//   url TEXT NOT NULL, 
//   shortUrlId INTEGER NOT NULL REFERENCES shortUrls(id) 
// );

