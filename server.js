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
            name: 'choice',
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
        .then(response => {
            if (response.choice === "View All Employees") {
                app.get('/api/employees', (req, res) => {
                    const sql = `SELECT id, first_name AS name FROM employees`;

                    db.query(sql, (err, rows) => {
                        if (err) {
                            res.status(500).json({ error: err.message });
                            return;
                        }
                        res.json({
                            message: 'success',
                            data: rows
                        });
                    });
                });
            }
        })

}

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


start();