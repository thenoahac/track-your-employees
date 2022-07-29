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
}