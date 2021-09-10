// MAIN CODE ---------------------

// Import and require inquirer
const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");

// set port or get default of 3001
const PORT = process.env.PORT || 3001;

// Import and require console table for data layout
const cTable = require('console.table');

// FIGfont spec in JavaScript
const figlet = require("figlet");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    //  MySQL password here using 'dotenv'
    password: process.env.DB_PASSWORD,
    database: "employee_tracker_db",
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

console.log(" ");

//  EXTRA FLUFF --
figlet.text(
  "EMPLOYEE    TRACKER",
  {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 100,
    whitespaceBreak: true,
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


// main program ----------------

const tracker = () => {
  inquirer
    // present choices for database entry
    .prompt([
      {
        type: "list",
        message: "Please enter your selection....",
        name: "select",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add A Role",
          "Add An Employee",
          "Update An Employee Role",
          "Quit",
        ],
      },
    ])

    // To review  -----------
    .then((entry) => {
      getAnswerTo(entry.select);
      // console.log(entry.select);
    });
};

// reply = entry.select
const getAnswerTo = async (reply) => {
  switch (reply) {
    case "View All Departments":
     
      await ViewAllDepartments();
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
    case "Add Department":
      // call 'add dept' function
      await addDepartment();
      break;

    case "Add A Role":
      // call 'add a role' function
      addRole();
      break;

    case "Add An Employee":
      //  call 'add an employee' function
      addEmployee();
      break;

    case "Update An Employee Role.":
      // call 'update an employee role' function
      updateEmployeeRole();
      break;

    case "Quit":
      quit();
      break;
  }
};

// //    add each function  =============

// // }

const ViewAllDepartments = async () => {
  // Read all Dept and display
  db.query("SELECT * FROM department", function (err, results) {
    // console.log(results);
    console.log(" ");
    console.table(results);
  });
};

const addDepartment = async () => {
  await inquirer
    // present choices for database entry
    .prompt([
      {
        type: "input",
        message: "Please enter the dept name",
        name: "departmentName",
      },
    ])

    // To review  -----------
    .then((entry) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [entry.departmentName],
        function (err, results) {
          // console.log(results);
          console.log(" ");
          console.table(`Department ${entry.departmentName} added sucessfully`);
        }
      );
    });
};

// function ViewRoles() {}
// function ViewEmployees() {}
// function addDepartment() {}

// function addRole() {}
// function addEmployee() {}
// function updateEmployeeRole() {}

function quit() {
  console.log(" ");
  console.log(" OK, BYE");
  console.log(" ");
  process.quit();
}
setTimeout(tracker, 1000);
