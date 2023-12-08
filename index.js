//Add your require statements here
const inquirer = require('inquirer');

//Create your sql connection here
const connection = require('./db/connection.js')


//start your promps here
function startApp() {
    //create prompt
    inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    })
    .then((answer) => {
      // Use a switch statement or if-else blocks to handle different actions
      console.log(answer.action)
      switch (answer.action) {
        case 'View all departments':
          // Implement logic to view all departments
          viewDepartments();
          break;
        case 'View all roles':
            viewRoles();
          // Implement logic to view all roles
          break;
        case 'View all employees':
              viewEmployees();
          // Implement logic to view all employees
          break;
        case 'Add a department':
            addDepartment();
          // Implement logic to add a department
          break;
        case 'Add a role':
            addRole();
          // Implement logic to add a role
          break;
        case 'Add an employee':
            addEmployee();
          // Implement logic to add an employee
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          // Implement logic to update an employee role
          break;
        case 'Exit':
          connection.end(); // Close the connection before exiting
          console.log('Goodbye!');
          break;
        default:
          console.log('Invalid action');
          break;
      }
    });
}

function viewDepartments() {
    const query = 'SELECT id, name FROM department';
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    });
  }
  
  function viewRoles() {
    const query = `
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      INNER JOIN department ON role.department_id = department.id
    `;
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    });
  }
  
  function viewEmployees() {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
    `;
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    });
  }
  
  function addDepartment() {
    inquirer
      .prompt({
        name: 'departmentName',
        type: 'input',
        message: 'Enter the name of the new department:'
      })
      .then((answer) => {
        const query = 'INSERT INTO department SET ?';
        connection.query(query, { name: answer.departmentName }, (err, res) => {
          if (err) throw err;
          console.log(`Added department ${answer.departmentName} successfully!`);
          startApp();
        });
      });
  }
  
  function addRole() {
    inquirer
      .prompt([
        {
          name: 'roleTitle',
          type: 'input',
          message: 'Enter the title of the new role:'
        },
        {
          name: 'roleSalary',
          type: 'input',
          message: 'Enter the salary for this role:'
        },
        {
          name: 'departmentId',
          type: 'input',
          message: 'Enter the department ID for this role:'
        }
      ])
      .then((answer) => {
        const query = 'INSERT INTO role SET ?';
        connection.query(
          query,
          {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: answer.departmentId
          },
          (err, res) => {
            if (err) throw err;
            console.log(`Added role ${answer.roleTitle} successfully!`);
            startApp();
          }
        );
      });
  }
  
  function addEmployee() {
    inquirer
      .prompt([
        {
          name: 'firstName',
          type: 'input',
          message: 'Enter the first name of the employee:'
        },
        {
          name: 'lastName',
          type: 'input',
          message: 'Enter the last name of the employee:'
        },
        {
          name: 'roleId',
          type: 'input',
          message: 'Enter the role ID for this employee:'
        },
        {
          name: 'managerId',
          type: 'input',
          message: 'Enter the manager ID for this employee (if applicable):'
        }
      ])
      .then((answer) => {
        const query = 'INSERT INTO employee SET ?';
        connection.query(
          query,
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
            manager_id: answer.managerId || null
          },
          (err, res) => {
            if (err) throw err;
            console.log(`Added employee ${answer.firstName} ${answer.lastName} successfully!`);
            startApp();
          }
        );
      });
  }
  
  function updateEmployeeRole() {
    const query = `
      SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name, role.id AS role_id, role.title AS role_title
      FROM employee
      INNER JOIN role ON employee.role_id = role.id
    `;
    connection.query(query, (err, employees) => {
      if (err) throw err;
  
      const employeeChoices = employees.map((employee) => ({
        name: `${employee.employee_name} - ${employee.role_title}`,
        value: employee.id
      }));
  
      inquirer
        .prompt([
          {
            name: 'employeeId',
            type: 'list',
            message: 'Select the employee whose role you want to update:',
            choices: employeeChoices
          },
          {
            name: 'newRoleId',
            type: 'input',
            message: 'Enter the new role ID for this employee:'
          }
        ])
        .then((answer) => {
          const updateQuery = 'UPDATE employee SET ? WHERE ?';
          connection.query(
            updateQuery,
            [
              { role_id: answer.newRoleId },
              { id: answer.employeeId }
            ],
            (err, res) => {
              if (err) throw err;
              console.log(`Updated employee's role successfully!`);
              startApp();
            }
          );
        });
    });
  }

  startApp();