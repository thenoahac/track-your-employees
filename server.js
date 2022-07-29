//Packages required
const mysql = require('mysql2')
const inquirer = require('inquirer');
const express = require('express');
const consoleTable = require('console.table');

const PORT = process.env.PORT = 3001;

const userConnect = mysql.createConnection(
    {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "employee_db"
    }
);

userConnect.connect((err) => {
    if(err){
        console.log("Please connect to the database: employee_db");
        return;
    }
})

module.exports = userConnect;

const employeeMenu = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'Choice',
            message: 'Please select an option below',
            choices: [
                "View Departments",
                "View Employees",
                "Add Role",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Exit"
            ]
        })
     .then((selections) => {
    const {choice} = selections; 

    if (choice === 'View Departments') {
      db.query('SELECT * FROM department', (err,rows) => {
        console.log('Here are all the departments.');
        console.table(rows)
    })};

    if (choice === 'View Employees') {
      db.query('SELECT * FROM employee', (err,rows) => {
        console.log('Here are all employees.');
        console.table(rows)
    })};

    if (choice === 'Add Role') {
        addRole();
    };

    if (choice === 'Add Employee') {
      addEmployee();
    };

    if (choice === 'Remove Employee') {
      removeEmployee();
    };

    if (choice === ' Update Employee Role') {
      updateEmployeeRole();
    }
  })};

addRole = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'addRoleTitle',
          message: "Please enter the title of this role."
        },
        {
          type: 'input',
          name: 'addRoleSalary',
          message: "Please enter the salary for the designated role."
        },
        {
          type: 'input',
          name: 'addRoleDepartment',
          message: "Please enter the relative number to the employees role."
        }
    ])
    .then(selections => {
      db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [selections.addRoleTile, selections.addRoleSalary, selections.addRoleDepartment], (err, rows)=> {
        console.log('Here is an updated list of roles!');
        db.query('SELECT * FROM role', (err,rows) => {
          console.table(rows)})
      })
      employeeMenu();
    })};

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Please enter the employees first name."
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Please enter the employees last name."
      },
      {
        type: 'input',
        name: 'role',
        message: "Please provide a role."
      },
      {
        type: 'input',
        name: 'manager',
        message: "Please provide the name of their manager and manager id number."
      }
      ])
    .then(selections => {
      db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [selections.first_name, selections.last_name, selections.role_id, selections.manager_id], (err, rows)=> {
        console.log('Here is an updated list your employees.');
        db.query('SELECT * FROM employee', (err,rows) => {
          console.table(rows)})
      })
      employeeMenu();
})};