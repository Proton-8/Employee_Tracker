
// do we need this????

// Import and require express
const express = require('express');

// Import and require mysql2
const mysql = require('mysql2');

// set port or get default of 3001
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// from class   ....  ???

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'movies_db'
    },
    console.log(`Connected to the movies_db database.`)
  );
  