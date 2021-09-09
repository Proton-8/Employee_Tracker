// MAIN CODE ---------------------

// Import and require inquirer
const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");

// set port or get default of 3001
const PORT = process.env.PORT || 3001;

// Import and require console table for data layout
require("console.table");

// FIGfont spec in JavaScript
const figlet = require("figlet");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    //  MySQL password here
    password: process.env.DB_PASSWORD,
    database: "employee_tracker_db",
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

console.log(" ");

//  EXTRA FLUFF --  Later

figlet(
  "EMPLOYEE         MANAGER",

  {
    font: "Standard",
    horizontalLayout: "3/4",
    verticalLayout: "Full",
  },

  function (err, data) {
    if (err) {
      console.log("Error found in Figlet...");
      console.dir(err);
      return;
    }
    console.log(data);
  }
);

// setInterval(1000);

function tracker() {
  inquirer
  // present choices for database entry
    .prompt([
      {
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
      },
    ])

    // To review  -----------

    .then((entry) => {
      getAnswerTo(entry.reply);
    });

  const getAnswerTo = (reply) => {
    switch (reply) {
      case "view All Departments":
        // call 'view all dept' function
        // employeeTrackerDatabase.ViewAllDepartments()
        //   .then((results) => console.table(results))
        //   .catch((err) => console.error(err));
        break;
      case "View All Roles":
        // call 'view all roles' function
        // employeeTrackerDatabase.GetAllRoles()
        //   .then((results) => console.table(results))
        //   .catch((err) => console.error(err));
        break;
      case "View All Employees":
        // call 'view all employees' function
        // employeeTrackerDatabase.GetAllEmployees()
        //   .then((results) => console.table(results))
        //   .catch((err) => console.error(err));
        break;

      case "Add Department.":
        // call 'add dept' function
        addDepartment();
        break;

      case "Add A Role.":
        // call 'add a role' function
        addRole();
        break;

      case "Add An Employee.":
        //  call 'add an employee' function
        addEmployee();
        break;

      case "Update An Employee Role.":
        // call 'update an employee role' function
        updateEmployeeRole();
        break;

      case "quit":
        quit();
        break;
    }
  };




//   to add each function  =============

}

function ViewAllDepartments() {

}

function ViewRoles() {

}
function ViewEmployees() {

}
function addDepartment() {

}

function addRole() {

}
function addEmployee() {

}
function updateEmployeeRole() {

}

function quit() {
  process.quit();
}

tracker();
