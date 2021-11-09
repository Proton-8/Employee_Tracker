// MAIN CODE ---------------------


// FIGfont special in JavaScript
const {
  default: chalk
} = require("chalk");
const figlet = require("figlet");

// Import and require inquirer
const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");

// set port or get default of 3001
const PORT = process.env.PORT || 3001;

// Import and require console table for data layout
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  //  MySQL password here using 'dotenv'
  password: process.env.DB_PASSWORD,
  database: "employee_tracker_db",
},
  console.log("Connected to the employee_tracker_db database.")

);

console.log(" ");

// main program ----------------

function tracker() {
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
      console.log(" "),
    ])

    // To review  -----------
    .then((entry) => {
        switch (entry.select) {
      case "View All Departments":
        // View All Departments function  
        ViewAllDepartments();
        break;
      case "View All Roles":
        ViewRoles();
        break;
      case "View All Employees":
        // call 'view all employees' function
        ViewEmployees();
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

      case "Quit":
        quit();
        break;
    }
  });


  function ViewAllDepartments() {
    // Read all Dept and display
    // const sql = `SELECT department.id AS Dept ID, department.name AS Dept FROM department;`;
    db.query('SELECT * FROM department', function (err, dept) {
      // console.log(dept);
    console.log(" ");
    console.table(department);
  })
}


  }

function ViewRoles() {


}
// view all employees

function ViewEmployees() {
  const sql = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;`;
  db.query(sql, function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}


function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the Department you would like to add?",
      },
    ])
    .then(function (res) {
      let query = db.query(
        "INSERT INTO department SET ?",
        {
          name: res.name,
        },
        (err) => {
          if (err) throw err;
          console.log(`Added the ${res.name} Department!`);
          runPrompt();
        }
      );
    });

}
function addRole() {
  let departments = ["No Department"];
  // First get the list of departments    
  db.query("SELECT * FROM department",
      function (err, res) {
          if (err) console.log(err);
          for (let i = 0; i < res.length; i++) {
              if (res[i].name) {
                  departments.push(res[i].name);
              }
          }

          // Get role details
          let questions = [
              "What is the role you would like to add?",
              "What is the role salary?",
              "What is the role department?"];
          inquirer.prompt([
              {
                  name: "title",
                  type: "input",
                  message: questions[0]
              },
              {
                  name: "salary",
                  type: "number",
                  message: questions[1]
              },
              {
                  name: "department",
                  type: "list",
                  message: questions[2],
                  choices: departments
              }
          ]).then((data) => {
              // get the department to tie to 
              let departmentId = null;
              for (let i = 0; i < res.length; i++) {
                  if (res[i].name === data.department) {
                      departmentId = res[i].id;
                      break;
                  }
              }
              role.insertRole(data.title, data.salary, departmentId);
              start();
          });

      }
  );
};


// arrow function version of addEmployee() {

  const addEmployee = () => {
    inquirer
        .prompt([{
                type: 'input',
                name: 'employeeFirstName',
                message: 'Enter Employee first name',
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: 'Enter employee last name',
            },
            {
                type: 'input',
                name: 'role',
                message: 'Enter the role for this employee',
            },
            {
                type: 'input',
                name: 'managerFirstName',
                message: 'Enter manager first name. Leave blank if no manager.',
            },
            {
                type: 'input',
                name: 'managerLastName',
                message: 'Enter manager last name. Leave blank if no manager.',
            },
        ])
        .then((employeeInfo) => {
            if (!(employeeInfo.employeeFirstName && employeeInfo.employeeLastName && employeeInfo.role)) {
                console.info(`Employee first name, last name, or role can not be blank`);
                return;
            }
            employeeTrackerDatabase.AddEmployee(employeeInfo.employeeFirstName, employeeInfo.employeeLastName,
                    employeeInfo.role, employeeInfo.managerFirstName, employeeInfo.managerLastName)
                .then((results) => {
                    console.log(`Employee ${employeeInfo.employeeFirstName} ${employeeInfo.employeeLastName} added successfully`)
                })
                .catch((err) => console.error(err.message));
        });
}



function updateEmployeeRole() {

}

function quit() {
  console.log('OK, BYE');
  process.exit();
}




// extra / add on to the main title ----
figlet(
  'EMPLOYEE TRACKER',

  {
    font: "Big Money-nw",
    horizontalLayout: "Half",
    verticalLayout: "Half",
    width: 100,
    whitespaceBreak: true
  },

  function (err, data) {
    if (err) {
      console.log("Error found in Figlet...");
      console.dir(err);
      return;
    }
    console.log(data);
  }

)
// added timer delay to have the wording on top and run tracker function
setTimeout(tracker, 1000);

