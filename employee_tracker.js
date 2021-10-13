const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = require("./connection");

connection.connect((err) => {
  if (err) throw err;
  console.log("***********************************");
  console.log("*                                 *");
  console.log("*        EMPLOYEE MANAGER         *");
  console.log("*                                 *");
  console.log("***********************************");
  startEmployeeTracker();
});

function startEmployeeTracker() {
  inquirer
    .prompt({
      name: "option",
      type: "list",
      choices: [
        "View employees",
        "View by role",
        "View by department",
        "View by manager",
        "Add employee",
        "Add role",
        "Add department",
        "Update employee role",
        "Update employee department",
      ],
    })
    .then((answer) => {
      console.log(answer);
      switch (answer.option) {
        case "View employees":
          return viewAllEmployees();

        case "View by role":
          return viewAllByRoles();

        case "View by department":
          return viewAllByDepartment();

        case "View by manager":
          return viewAllByManager();

        case "Add employee":
          return AddEmployee();

        case "Add role":
          return addRole();

        case "Add department":
          return addDepartment();

        case "Update employee role":
          return updateEmployeeRole();

        case "Update employee department":
          return updateEmployeeDepartment();
      }
    });
}
