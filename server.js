//Packages required
const env = require("dotenv").config();
const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
const consoleTable = require('console.table');

const PORT = process.env.PORT | 3001;

const userConnect = mysql.createConnection(
    {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
    }
);

userConnect.connect((err) => {
    if(err){
        console.log(err);
        return;
    }
})

module.exports = userConnect;

const employeeMenu = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'choice',
            message: 'Please select an option below',
            choices: [
                "View Departments",
                "View Employees",
                "Add Role",
                "Add Employee",
                "Add Department",
                "Exit"
            ]
        })
     .then((selections) => {
    const {choice} = selections; 
      console.log(choice, typeof choice)
    if (choice === 'View Departments') {
      userConnect.query('SELECT * FROM department', (err,rows) => {
        console.log('Here are all the departments.');
        console.table(rows)
        employeeMenu();
    })};

    if (choice === 'View Employees') {
      userConnect.query('SELECT * FROM employee', (err,rows) => {
        console.log('Here are all employees.');
        console.table(rows)
        employeeMenu();
    })};

    if (choice === 'Add Role') {
        addRole();
    };

    if (choice === 'Add Employee') {
      addEmployee();
    };

    if (choice === 'View Employees') {
      allEmployees();
    };

    if (choice === 'Update Employee Role') {
      updateEmployeeRole();
    }

    if (choice === 'Add Department') {
      addDepartment();
    }
  })};

addRole = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: "Please enter the title of this role."
        },
        {
          type: 'input',
          name: 'salary',
          message: "Please enter the salary for the designated role."
        },
        {
          type: 'input',
          name: 'department',
          message: "Please enter the relative number to the employees role."
        }
    ])
    .then(selections => {
      userConnect.query('INSERT INTO roles (role_position, salary, department_id) VALUES (?, ?, ?)', [selections.title, selections.salary, selections.department], (err, rows)=> {
        if (err) console.log(err);
        console.log('Here is an updated list of roles!');
        userConnect.query('SELECT * FROM roles', (err,rows) => {
          console.table(rows)})
      })
      employeeMenu();
    })};

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first name',
        message: "Please enter the employees first name."
      },
      {
        type: 'input',
        name: 'last name',
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
      userConnect.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [selections.first_name, selections.last_name, selections.role_id, selections.manager_id], (err, rows)=> {
        console.log('Here is an updated list your employees.');
        userConnect.query('SELECT * FROM employee', (err,rows) => {
          console.table(rows)})
      })
      employeeMenu();
})};

  addDepartment = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'department',
          message: 'Please enter the name of the department you would like to add.',
        }
      ]).then(selections => {
        userConnect.query('INSERT INTO department (name) VALUES (?)', [selections.name], (err, rows)=> {
          console.log('Here is an updated list of your departments.');
          userConnect.query('SELECT * FROM department', (err,rows) => {
            console.table(rows)})
        })
        employeeMenu();
      })};

      // updateEmployeeRole = () => {
      //   inquirer
      //     .prompt([
      //       {
      //         type: 'input',
      //         name: 'update',
      //         message: 'Please select a role you would to move this employee to'
      //       }
      //     ])
      // }
employeeMenu();