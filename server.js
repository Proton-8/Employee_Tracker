// code starts here ....

// Import and require inquirer
const inquirer = require("inquirer")
// Import and require mysql2
const mysql = require("mysql2");

// set port or get default of 3001
const PORT = process.env.PORT || 3001;

// FIGfont spec in JavaScript
const figlet = require('figlet');


// Connect to database
const db = mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    //  MySQL password here
    password: process.env.DB_PASSWORD,
    database: "employee_tracker_db",
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

console.log(" ")

//  EXTRA FLUFF --  Later

// figlet('EMPLOYEE                                MANAGER', 

// {
//   font: "Standard",
//   horizontalLayout: "half",
//   verticalLayout: "full",
// },

// function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data)
// });








function tracker() {
  inquirer
    .prompt([{
      type: "list",
      message: "Please enter your selection....",
      name: "choices",
      choices: [
        " View All Departments ",
        " View All Roles ",
        " View All Employees ",
        " Add Department ",
        " Add A Role ",
        " Add An Employee ",
        " Update An Employee Role ",
        " Quit ",
      ],
    }, ])


    // To review  -----------
    
    .then((inquiringMinds) => {
      getAnswerTo(inquiringMinds.wantToKnow)
    });

  const getAnswerTo = (whatChaWantToDo) => {
    switch (whatChaWantToDo) {
      case 'view all departments':
        employeeTrackerDatabase.ViewAllDepartments()
          .then((results) => console.table(results))
          .catch((err) => console.error(err));
        break;
      case 'view all roles':
        employeeTrackerDatabase.GetAllRoles()
          .then((results) => console.table(results))
          .catch((err) => console.error(err));
        break;
      case 'view all employees':
        employeeTrackerDatabase.GetAllEmployees()
          .then((results) => console.table(results))
          .catch((err) => console.error(err));
        break;
      default:
        break;
    }
  }


  // to review 1  ---------------


  class EmployeeDatabase {
    constructor(connectionString) {
      this.connectionString = connectionString;
      this.db = mysql.createConnection(this.connectionString);
    }


    ViewAllDepartments() {
      const queryString = `SELECT * FROM department`;

      return this.ExecuteQuery(queryString, [])
    }
 



    // do we need this???

    // Query database
    // db.query("SELECT * FROM students", function (err, results) {
    //   console.log(results);
    // });

    // Default response for any other request (Not Found)
    // app.use((req, res) => {
    //   res.status(404).end();
    // });

    // app.listen(PORT, () => {
    //   console.log(`Server running on port ${PORT}`);
    // }); 

 }
    tracker()
  };  