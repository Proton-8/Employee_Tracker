// MAIN CODE ---------------------

// FIGfont special in JavaScript
const { default: chalk } = require("chalk");
const figlet = require("figlet");

// Import and require inquirer
const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");

// set port or get default of 3001
const PORT = process.env.PORT || 3001;

// Import and require console table for data layout
const cTable = require("console.table");

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
  console.log("Connected to the employee_tracker_db database."),
console.log(" ")
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
          updateRole();
          break;

        case "Quit":
          quit();
          break;
      }
    });

  // main code --------------------------------

  // function to view all departments
  function ViewAllDepartments() {
    db.query("SELECT * FROM department", function (err, dept) {
      console.log("");
      console.table(dept);
      tracker();
    });
  }
}
// function to view all roles
function ViewRoles() {
  db.query("SELECT * FROM roles", function (err, roles) {
    console.log("");
    console.table(roles);
    tracker();
  });
}
// function to view all employees
function ViewEmployees() {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    tracker();
  });
}
// function to add a new dept
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the Department you would like to add?",
      },
    ])
    .then((newDept) => {
      if (!newDept.name) {
        console.info("Sorry, the Department Name can not be blank");
        setTimeout(tracker, 5000);
        return;
      } else
        db.query(`INSERT INTO department SET ?`, {
          dept: newDept.name,
        });
      console.log("Added department");
      tracker();
    });
}

// function to add an employee
function addEmployee() {
  // this is a challenging one.....
  let managers = ["No Manager"];
  let roles = ["No Role"];
  // First get the list of roles
  db.query("SELECT * FROM roles ", function (err, roleRes) {
    if (err) console.log(err);
    for (let i = 0; i < roleRes.length; i++) {
      if (roleRes[i].title) {
        roles.push(roleRes[i].title);
      }
    }

    // Next get list of possible managers
    db.query("SELECT * from employee ", function (err, res) {
      if (err) console.log(err);
      for (let i = 0; i < res.length; i++) {
        if (res[i].first_name) {
          managers.push(res[i].first_name + " " + res[i].last_name);
        }
      }

      // Get the new employee details
      let questions = [
        "What is the last name?",
        "What is the first name?",
        "What is the employee role?",
        "Who is the employee manager?",
      ];
      inquirer
        .prompt([
          {
            name: "lastName",
            type: "input",
            message: questions[0],
          },
          {
            name: "firstName",
            type: "input",
            message: questions[1],
          },
          {
            name: "role",
            type: "list",
            message: questions[2],
            choices: roles,
          },
          {
            name: "manager",
            type: "list",
            message: questions[3],
            choices: managers,
          },
        ])
        .then((data) => {
          // get the role
          let roleId = null;
          for (let i = 0; i < roleRes.length; i++) {
            if (roleRes[i].title === data.role) {
              roleId = roleRes[i].id;
              theId = i + 1;
              break;
            }
          }
          // Get the manager
          let manager_id = null;
          for (let i = 0; i < res.length; i++) {
            if (res[i].first_name + " " + res[i].last_name === data.manager) {
              manager_id = res[i].id;
              break;
            }
          }
          // data check  ----------------
          console.log(data);
          console.log("made it to 238");
          console.log("ID", manager_id);
          console.log(data.firstName);
          console.log("Role", theId);

          db.query(
            "INSERT INTO employee SET ?",
            {
              first_name: data.firstName,
              last_name: data.lastName,
              roles_id: theId,
              manager_id: manager_id,
            },

            (err) => {
              if (err) throw err;
              console.log("");
              console.log("OK, added new employee!");
              console.log("");
              console.table(data);

              tracker();
            }
          );
        });
    });
  });
}

// add employee role
function addRole() {
  db.query(
    "SELECT roles.title AS Title, roles.salary AS Salary FROM roles",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "Role",
            type: "input",
            message: "What is the new Role?",
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?",
          },
          {
            name: "DeptId",
            type: "input",
            message: "What is the Dept Id?",
          },
        ])
        .then(function (res) {
          db.query(
            "INSERT INTO roles SET ?",
            {
              title: res.Role,
              salary: res.Salary,
              department_id: res.DeptId,
            },
            console.log(""),
            console.log("OK, the new role has been added"),
            console.log(""),
            console.table(res)
            // console.log(title,salary, department_id),
            // console.log("line 287"),
            // function (err) {
            //   if (err) throw err,
            // console.table(res);
            // }
          );
          tracker();
        });
    }
  );
}

// update the Employee Role
const updateRole = () => {
  // first, create roleArray via selectRole()
  var roleArray = [];
  function selectRole() {
    db.query(`SELECT roles.title FROM roles`, (err, res) => {
      if (err) {
        console.log(err);
      }
      for (var i = 0; i < res.length; i++) {
        roleArray.push(res[i].title);
      }
    });
    return roleArray;
  }
  // then, start query
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee 
          JOIN roles ON employee.roles_id = roles.id`,
    (err, res) => {
      const employeeChoices = res.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
      inquirer
        .prompt([
          {
            name: "nameChoice",
            type: "list",
            message: "Please choose Employee:",
            choices: employeeChoices,
          },
          {
            name: "role",
            type: "list",
            message: "Now enter Employee's new role:",
            choices: selectRole(),
          },
        ])
        .then((res) => {
          let roleId = selectRole().indexOf(res.role) + 1;
          db.query(
            `UPDATE employee SET roles_id = ${roleId} WHERE id = ${res.nameChoice}`,
            (err, res) => {
              if (err) console.log(err);

              console.log(
                `OK,the employee role has been updated to role Id: ${roleId}`
              );

              console.log("");
              // console.log(res.first_name);
              tracker();
            }
          );
        });
    }
  );
};

// To end the list
function quit() {
  console.log("OK, BYE");
  console.log("");
  setTimeout(process.exit, 1000);
}

// extra / add on to the main title ----
figlet(
  "EMPLOYEE TRACKER",

  {
    font: "Big Money-nw",
    horizontalLayout: "Half",
    verticalLayout: "Half",
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
// Added this feature to have the wording on top and run tracker function
setTimeout(tracker, 2000);
