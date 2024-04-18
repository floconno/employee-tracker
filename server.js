const express = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

function start() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'directory',
            message: 'What would you like to do?',
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "view All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit"
            ]
        },
    ])


}

start();