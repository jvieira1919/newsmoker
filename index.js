const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            type: "list",
            message: "Locations",
            name: "user_choice",
            choices: ["Department", "Roles", "Employees", "Add-Department", "Add-Role", "Add-Employee", "Update-Role","EXIT"]
        })
        .then(function (answer) {
            if (answer.user_choice === "Department") {
                postDepartment();
            } else if (answer.user_choice === "Roles") {
                postRoles();
            } else if (answer.user_choice === "Employees") {
                postEmployees();
            } else if(answer.user_choice === "Add-Department"){
                addDepartment();
            } else if (answer.user_choice === "Add-Role"){
                addRole();
            } else if (answer.user_choice === "Add-Employee"){
                addEmployee();
            } else if (answer.user_choice === "Update-Role"){
                updateRole();
            }else (answer.user_choice === "Exit")
            connection.end();
        })
}

function postDepartment() {
    connection.query(" select * from department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function postRoles() {
    connection.query(`select title, salary, name from roles
     inner join department on roles.department_id=department.id`, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function postEmployees() {
    connection.query(`select first_name, last_name, title, salary, name from employees 
    inner join role on employees.role_id=roles.id 
    inner join department on roles.department_id=department.id`, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function printResults (err, result) {
    if (err) throw err;
    console.log(result);
    start();
}

async function addDepartment () {
    const department = await inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the department"
        }
    ])
    connection.query (`insert into department (name) values ('${department.name}')`, printResults )
}

function addRole() {
    connection.query ("select * from department", async function(err, results) {
        const departments = results.map ( (result) => ({
            name:result.name, 
            value:result.id
        }) )
        const roleInfo = await inquirer.prompt([
            {
                name: "title",
                message: "What is the title for the position"
            },
            {
                name: "salary",
                message: "What is the salary for the position"
            },
            {
                type: "list",
                name: "department_id",
                message: "Which Department does the role belong to?",
                choices:departments 
            }
        ])
        connection.query (`insert into roles (title, salary, department_id) values('${roleInfo.title}','${roleInfo.salary}','${roleInfo.department_id}' )`, printResults)
    })
}

function addEmployee() {
    connection.query ("select * from roles", async function(err, results) {
        const roles = results.map ( (result) => ({
            name:result.title, 
            value:result.id
        }) )
        const employeeInfo = await inquirer.prompt([
            {
                name: "first_name",
                message: "What is the first name of the employee"
            },
            {
                name: "last_name",
                message: "What is the last name of the employee"
            },
            {
                type: "list",
                name: "role_id",
                message: "What is the employee's role?",
                choices:roles 
            }
        ])
        connection.query (`insert into employee (first_name, last_name, role_id) values('${employeeInfo.first_name}','${employeeInfo.last_name}','${employeeInfo.role_id}' )`, printResults)
    })
}

async function updateRole(){
    connection.query ("select * from role", async function(err, results) {
        const employee = results.map ( (result) => ({
            name:result.first_name + result.last_name, 
            value:result.id
        }) )
        const employeeInfo = await inquirer.prompt([
            {
                type: "list",
                name: "employee_id",
                message: "Which employee ID would you like to update?",
                choices:employee
            },
            {
                type: "list",
                name: "role_id",
                message: "Which employee ID would you like to update?",
                choices:employee
            }
        ])
    })
}
