// Import and require express
// const express = require("express");
const inquirer = require("inquirer")
// Import and require mysql2
const mysql = require("mysql2");

// set port or get default of 3001
const PORT = process.env.PORT || 3001;

// FIGfont spec in JavaScript
const figlet = require('figlet');

// Express middleware
// const app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: process.env.DB_PASSWORD,
    database: "employee_tracker_db",
  },
  console.log(`Connected to the XXX_db database.`)
);

console.log(" ")

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







// Create an employee ??
// app.post("/api/new-movie", ({ body }, res) => {
//   const sql = `INSERT INTO movies (movie_name)
//     VALUES (?)`;
//   const params = [body.movie_name];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: body,
//     });
//   });
// });

function tracker() {
  inquirer
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
    .then(function (val) {
      switch (val.choices) {
        case "View All Departments.":
          viewAllDepartments();
          break;

        case "View All Roles.":
          viewAllRoles();
          break;
      }
    });
}

// -- Insert/add version by inserting row into produce table --
// INSERT INTO produce (id, name)
//   VALUES (1, "apple");

// ---update version
// UPDATE fiction
// SET name = "Candide"
// WHERE id = 2;


// delete version
// DELETE FROM produce
// WHERE id = 2;


// to review 1  ---------------

// function viewAllDepartments() {
//   db.query("SELECT department.name AS Department, department.id AS 'Department #' FROM department;", 
//   function(err, res) {
//     if (err) throw err
//     console.table(res)
//     runPrompt()
//   })
// }




//   to review 2 -----------------

// function addAnEmployee() {
//   inquirer.prompt([
//       {
//           name: 'firstname',
//           type: 'list',
//           message: "What is the employee's first name?"
//       },
//       {
//           name: 'lastname',
//           type: 'list',
//           message: "What is the employee's last name?"
//       },
//       {
//           name: 'role',
//           type: 'list',
//           message: "What is the employee's position?",
//           choices: selectRole()
//       },
//       {
//           name: 'manager',
//           type: 'list',
//           message: "Who is the employee's manager?",
//           choices: selectManager()
//       }
//   ]).then((val) => {
//       var roleid = selectRole().indexOf(val.role) + 1
//       var managerid = selectManager().indexOf(val.manager) + 1
//       console.log(val.role)
//       console.log(val.manager)
//       db.query(
//           "INSERT INTO employee SET ?",
//           {
//               first_name: val.firstname,
//               last_name: val.lastname,
//               manager_id: managerid,
//               roles_id: roleid
//           },(err) => {
//               if (err) throw err
//               console.table(val)
//               runPrompt()
//           }
//       )
//   })
// }













tracker();

// do we need this???

// Query database
db.query("SELECT * FROM students", function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



