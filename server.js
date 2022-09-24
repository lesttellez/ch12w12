var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table")

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,
  user: "root",
  password: "Bamboom22!",
  database: "employeeTracker_DB"
});

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  start();
});

// start function for application
function start() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices:
        [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "EXIT"
        ]
      })
      .then(function(answer) {
        if (answer.action === "View all Departments") {
          viewDepts();
        }
        else if(answer.action === "View all Roles") {
          viewRoles();
        }
        else if(answer.action === "View all Employees") {
          viewEmps();
        }
        else if(answer.action === "Add Department") {
          addDept();
        }
        else if(answer.action === "Add Role") {
          addRole();
        }
        else if(answer.action === "Add Employee") {
          addEmps();
        }
        else if(answer.action === "Update Employee Role") {
          updateEmpRole();
        }
        else if (answer.action === "EXIT") {
          connection.end();
        }
      });
  }

  // view departments in console
function viewDepts() {
    connection.query("SELECT employee.first_name AS FirstName, employee.last_name AS LastName, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    (err, answer) => {
        if (err) throw err;
        console.log("\n");
        console.table(answer);
        start();
      });
    }

  // view roles in console
function viewRoles() {
    connection.query("SELECT employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Role FROM employee JOIN role ON employee.role_id = role.id;",
    (err, answer) => {
        if (err) throw err;
        console.log("\n");
        console.table(answer);
        start();
        });
    }

  // view employees in console
function viewEmps() {
    connection.query("SELECT employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Role, department.name AS Department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee e on employee.manager_id = e.id;",
    (err, answer) => {
        if (err) throw err;
        console.log("\n");
        console.table(answer);
        start();
        });
     }

  // add department in sql
function addDept() {
  connection.query(
    "SELECT department.name FROM department", (err, data) => {
      if (err) throw err;
    inquirer
        .prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the name of the Department?"
        }
        ])
        .then((answer) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
            name: answer.deptName
            },
            (err) => {
            if (err) throw err;
            console.log("\n The department was added successfully! \n");
            start();
            }
        );
    });
})
}

// add role in sql
function addRole() {
  connection.query(
    "SELECT role.title AS Title, role.salary AS Salary FROM role", (err, data) => {
      if (err) throw err;
    inquirer
        .prompt([
        {
            name: "roleTitle",
            type: "input",
            message: "What is the title of the role?"
        },
        {
            name: "roleSalary",
            type: "input",
            message: "What is the salary of the role?"
        }
        ])
        .then((answers) => {
        connection.query(
            "INSERT INTO role SET ?",
            {
            title: answers.roleTitle,
            salary: answers.roleSalary,
            },
            (err) => {
            if (err) throw err;
            console.log("\n The role was added successfully! \n");

            start();
            }
        );
    });
})
}

// functions for adding employees
currentRoles = [];
currentManagers = [];

function empRole() {
    connection.query("SELECT * FROM role",
    (err, answer) => {
        if (err) throw err;
        for (var i = 0; i < answer.length; i++) {
            currentRoles.push(answer[i].title);
          }
    })
    return currentRoles;
}

function empManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    (err, answer) => {
        if (err) throw err;
        for (var i = 0; i < answer.length; i++) {
            currentManagers.push(`${answer[i].first_name} ${answer[i].last_name}`);
          }
    })
    return currentManagers;
}

// update roles in sql
function updateEmpRole() {
  connection.query("SELECT * FROM employee", function(err, empData) {
      if (err) throw err;
  connection.query("SELECT * FROM role", function(err, roleData) {
      if (err) throw err;
          inquirer.prompt([
              {
                  name: "empName",
                  type: "rawlist",
                  message: "Which employee are you updating?",
                  choices: empData.map(function(data) {
                      return `${data.first_name} ${data.last_name}`
                  })
              },
              {
                  name: "empRole",
                  type: "rawlist",
                  message: "What is their new role?",
                  choices: roleData.map(function(data) {
                      return data.title
                  })
              }
          ])
          .then (answers => {
              connection.query(
                  "UPDATE employee SET ? WHERE ?",
                  [
                      {
                          role_id: empData.find(function(data) {
                              return data.title === answers.empRole
                          })
                      },
                      {
                          id: roleData.find(function(data) {
                              return `${data.first_name} ${data.last_name}` === answers.empName
                          })
                      }
                  ],
                  function(err) {
                      if (err) throw err;
                      console.log("\n Employee role updated! \n");
                      start();
                  }
              )
          })
      })
  })
}

// add employees in sql
function addEmps() {
  inquirer.prompt([
  {
      type: "string",
      name: "firstName",
      message: "What is this employee's first name?",
  },
  {
      type: "string",
      name: "lastName",
      message: "What is this employee's last name?",
  },
  {
      type: "rawlist",
      name: "role",
      message: "What is this employee's role?",
      choices: empRole()
  },
  {
      type: "rawlist",
      name: "manager",
      message: "Who is this employee's manager?",
      choices: empManager()
  }

  ]).then((answers) => {
      const roleID = empRole().indexOf(answers.role) + 1
      const managerID = empManager().indexOf(answers.manager) + 1
      connection.query("INSERT INTO employee SET ?", 
    {
        first_name: answers.firstName,
        last_name: answers.lastName,
        manager_id: managerID,
        role_id: roleID
    }, (err) => {
      if (err) throw err;
      console.table(answers)
      start();
    })
  });
}