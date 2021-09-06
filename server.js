

// Import and require express
const express = require('express');

// Import and require mysql2
const mysql = require('mysql2');

// set port or get default of 3001
const PORT = process.env.PORT || 3001;


// Express middleware
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'XXX_db'
    },
    console.log(`Connected to the XXX_db database.`)
  );

  // do we need this???


// Query database
db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

  