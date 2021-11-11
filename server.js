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

// console.log(" ");

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

    ])


    .then((entry) => {
      // console.log("made it to 61");
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
        case "Add Department":
          // call 'add dept' function
          addDepartment();
          break;

        case "Add A Role":
          // call 'add a role' function
          addRole();
          break;

        case "Add An Employee":
          //  call 'add an employee' function
          addEmployee();
          break;

        case "Update An Employee Role":
          // call 'update an employee role' function
          updateEmployeeRole();
          break;

        case "Quit":
          quit();
          break;
      }
    });


  function ViewAllDepartments() {
    db.query('SELECT * FROM department', function (err, dept) {
      console.table(dept);
      tracker();
    })
  }
}

function ViewRoles() {
  db.query('SELECT * FROM roles', function (err, roles) {
    console.table(roles)
    tracker()
  })
}
// view all employees

function ViewEmployees() {
  db.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err
    console.table(res)
    tracker()
  })
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the Department you would like to add?"
      },
    ])
    .then((newDept) => {
      if (!newDept.name) {
        console.info('Sorry, the Department Name can not be blank');
        setTimeout(tracker, 5000);
        return;
      }
      else
        db.query(`INSERT INTO department SET ?`, {
          dept: newDept.name,
        });
      console.log("Added department");
      tracker()
    })

}















// This function will handle adding an employee
function addEmployee() {

  let roles = ["No Role"];
  let managers = ["No Manager"];
  // First get the list of roles    
  db.query("SELECT * FROM roles ",
    function (err, roleRes) {
      if (err) console.log(err);
      for (let i = 0; i < roleRes.length; i++) {
        if (roleRes[i].title) {
          roles.push(roleRes[i].title);
        }
      }

      // Next get list of possible managers
      db.query("SELECT * from employee ",
        function (err, res) {
          if (err) console.log(err);
          for (let i = 0; i < res.length; i++) {
            if (res[i].first_name) {
              managers.push(res[i].first_name + " " + res[i].last_name);
            }
          }

          // Get the employee details
          let questions = [
            "What is the last name?",
            "What is the first name?",
            "What is the employee role?",
            "Who is the employee manager?"];
          inquirer
            .prompt([

              {
                name: "lastName",
                type: "input",
                message: questions[0]
              },
              {
                name: "firstName",
                type: "input",
                message: questions[1]
              },
              {
                name: "role",
                type: "list",
                message: questions[2],
                choices: roles
              },
              {
                name: "manager",
                type: "list",
                message: questions[3],
                choices: managers
              }
            ]).then((data) => {
              // get the role to tie to 
              let roleId = null;
              for (let i = 0; i < roleRes.length; i++) {
                if (roleRes[i].title === data.role) {
                  roleId = roleRes[i].id;
                  break;
                }
              }
              // Get the manager to tie to
              let manager_id = null;
              for (let i = 0; i < res.length; i++) {
                if (res[i].first_name + " " + res[i].last_name === data.manager) {
                  manager_id = res[i].id;
                  break;
                }
              }
               console.log(data);
               console.log("made it to 238");
              console.log("ID", res[i].id)
               
              db.query(`INSERT INTO employee SET ?`, {
                first_name: data.firstName,
                last_name: data.lastName,
                role_id: data.role,
                manager_id:res[i].id 
              });
              console.log("Added new employee");
             



              // employee.insertEmployee(data.firstName, data.lastName, roles_id, manager_id);
 tracker();
            });
         
        }
      );
    }
  );






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
          "What is the new role you would like to add?",
          "What is the new role salary?",
          "What is the new role department?"];
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
        ]).then((res) => {
          // get the department to tie to 
          let department_id = null;
          for (let i = 0; i < res.length; i++) {
            if (res[i].title === res.department) {
              departmentId = res[i].id;
              break;
            }
          }
          role.insertRole(res.title, res.salary, department_id);

        });
        tracker();
      }
    );
  };


  // arrow function version of addEmployee() {

  // const addEmployee = () => {
  //   inquirer
  //     .prompt([{
  //       type: 'input',
  //       name: 'employeeFirstName',
  //       message: 'Enter Employee first name',
  //     },
  //     {
  //       type: 'input',
  //       name: 'employeeLastName',
  //       message: 'Enter employee last name',
  //     },
  //     {
  //       type: 'input',
  //       name: 'role',
  //       message: 'Enter the role for this employee',
  //     },
  //     {
  //       type: 'input',
  //       name: 'managerFirstName',
  //       message: 'Enter manager first name. Leave blank if no manager.',
  //     },
  //     {
  //       type: 'input',
  //       name: 'managerLastName',
  //       message: 'Enter manager last name. Leave blank if no manager.',
  //     },
  //     ])
  //     .then((employeeInfo) => {
  //       if (!(employeeInfo.employeeFirstName && employeeInfo.employeeLastName && employeeInfo.role)) {
  //         console.info(`Employee first name, last name, or role can not be blank`);
  //         return;
  //       }
  //       employeeTrackerDatabase.AddEmployee(employeeInfo.employeeFirstName, employeeInfo.employeeLastName,
  //         employeeInfo.role, employeeInfo.managerFirstName, employeeInfo.managerLastName)
  //         .then((results) => {
  //           console.log(`Employee ${employeeInfo.employeeFirstName} ${employeeInfo.employeeLastName} added successfully`)
  //         })
  //         .catch((err) => console.error(err.message));
  //     });
  //   tracker();
}



function updateEmployeeRole() {
  console.log("UPDATE employee here");
  tracker();
}

function quit() {
  console.log('OK, BYE');
  console.log('');
  setTimeout(process.exit, 3000);

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

