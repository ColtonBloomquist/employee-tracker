const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
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

const startEmployeeTracker = () => {
  inquirer
    .prompt([
      {
        name: "option",
        type: "list",
        message: "Please choose from the following options.",
        choices: [
          "View all employees",
          "View by role",
          "View by department",
          "Add employee",
          "Add role",
          "Add department",
          "Update employee role",
        ],
      },
    ])
    .then((answer) => {
      console.log(answer);
      switch (answer.option) {
        case "View all employees":
          viewAllEmployees();
          break;
        case "View by role":
          viewAllByRoles();
          break;
        case "View by department":
          viewAllByDepartment();
          break;
        case "View by manager":
          viewAllByManager();
          break;
        case "Add employee":
          AddEmployee();
          break;
        case "Add role":
          addRole();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
      }
    });
};

const viewAllEmployees = () => {
  console.log("asdfsdf");
  let sql =
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;";
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startEmployeeTracker();
  });
};

const viewAllByRoles = () => {
  let sql = `SELECT * FROM role RIGHT JOIN department ON role.department_id = department.id`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startEmployeeTracker();
  });
};

const viewAllByDepartment = () => {
  let sql = `SELECT * FROM department`;

  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startEmployeeTracker();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department_name",
        type: "input",
        message: "What is the name of your new department?",
      },
    ])
    .then((answer) => {
      let sql = `INSERT INTO department (name) VALUES (?)`;
      const params = [answer.department_name];
      connection.query(sql, params, (err, res) => {
        if (err) throw err;
        startEmployeeTracker();
      });
    });
};

const addRole = () => {
  let Sql = `SELECT * FROM department`;
  connection.query(Sql, (err, res) => {
    if (err) throw err;
    var departmentNames = res.map((x) => x.name);

    inquirer
      .prompt([
        {
          name: "role_title",
          type: "input",
          message: "What is the name of your new role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for your new role?",
        },
        {
          name: "department",
          type: "list",
          choices: departmentNames,
        },
      ])
      .then((answer) => {
        let departmentId;
        console.log(res);
        console.log(answer);
        for (let i = 0; i < res.length; i++) {
          if (answer.department == res[i].name) {
            departmentId = res[i].id;
          }
        }
        console.log(departmentId);
        let sql = `INSERT INTO role(title, salary, department_id) VALUES ("${answer.role_title}", ${answer.salary}, ${departmentId})`;

        connection.query(sql, (err, res) => {
          if (err) throw err;
          startEmployeeTracker();
        });
      });
  });
};

const AddEmployee = () => {
  let Sql = "SELECT * FROM role";

  connection.query(Sql, (err, res) => {
    if (err) throw err;
    var roleTitles = res.map((x) => x.title);

    console.log(roleTitles);
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "role",
          type: "list",
          choices: roleTitles,
        },
        {
          name: "manager_id",
          type: "input",
          message: "What is the manager's id for this employee?",
        },
      ])
      .then((answer) => {
        let roleId;
        console.log(res);
        console.log(answer);
        for (let i = 0; i < res.length; i++) {
          if (answer.role == res[i].title) {
            roleId = res[i].id;
          }
        }
        let sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", ${roleId}, ${answer.manager_id} )`;
        connection.query(sql, (err, res) => {
          if (err) throw err;
          startEmployeeTracker();
        });
      });
  });
};

const updateEmployeeRole = () => {
  let roleSql = "SELECT * FROM role";
  let employeesql = "SELECT * FROM employee";
  connection.query(roleSql, (err, res) => {
    if (err) throw err;
    var roleTitles = res.map((x) => x.title);
    console.log(roleTitles);
    connection.query(employeesql, (err, eresult) => {
      if (err) throw err;
      var employeeNames = eresult.map((x) => `${x.first_name} ${x.last_name}`);
      console.log(employeeNames);
      inquirer
        .prompt([
          {
            name: "employeeName",
            type: "list",
            choices: employeeNames,
          },
          {
            name: "newRole",
            type: "list",
            choices: roleTitles,
          },
        ])
        .then((answer) => {
          let roleId;
          let employeeId;
          for (let i = 0; i < res.length; i++) {
            if (answer.newRole == res[i].title) {
              roleId = res[i].id;
            }
          }
          for (let i = 0; i < eresult.length; i++) {
            if (
              answer.employeeName ==
              `${eresult[i].first_name} ${eresult[i].last_name}`
            ) {
              employeeId = eresult[i].id;
            }
          }
          const sql = `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`;
          connection.query(sql, (err, res) => {
            if (err) throw err;
            startEmployeeTracker();
          });
        });
    });
  });
};
