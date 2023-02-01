require('dotenv').config();
const inquirer = require('inquirer');
const { Department, Employee, Role } = require('./models');
const sequelize = require('./config/connection');
const { create } = require('./models/Department');



// Question Arrays ----------------------------------------------------------------------------

// Array for main menu
const mainMenuQuestions = [
    {
        type: 'list',
        message: 'What would you like to do? ',
        choices: ['View All Employees','Add Employees','Update Employee Role','View All Roles','Add Role', 'View All Departments', 'Add Department', 'Quit'],
        name: 'mainMenuChoice'
    },
    {
        type: 'input',
        message: 'Enter new department name: ',
        when: (answers) => { 
            return answers.mainMenuChoice === 'Add Department'
        },
        name: 'departmentName'
    }

];


// Function to ask inquirer questions and call functions based on the answers given
const askQuestions = async function () {
    const answers = await inquirer.prompt(mainMenuQuestions);

    // If menu choice was Quit, exit the program
    if (answers.mainMenuChoice === 'Quit') {
        return ;
    } 

    // Go through each choice and run the appropriate function
    else {
        
        switch(answers.mainMenuChoice){
            case 'View All Employees':
                await getEmployee();
                break;
            case 'View All Roles':
                await getRole();
                break;
            case 'View All Departments':
                await getDepartment();
                break;
            case 'Add Department':
                await createDepartment(answers.departmentName);
                break;
            case 'View All Employees':
                await getEmployee();
                break;
            case 'View All Employees':
                await getEmployee();
                break;
            case 'View All Employees':
                await getEmployee();
                break;

        };
        
        return await askQuestions();
    };
};



// Array for base Employee questions
const employeeQuestions = [
    {
        type: 'input',
        message: 'Name: ',
        name: 'name',
        // Check if valid name
        validate: function(input) {
            const done = this.async();

            if(/^[0-9]+$/.test(input)) {
                done('Please provide a valid name', false);
                return;
            };

            done(null, true);
        }       
    },
    {
        type: 'input',
        message: 'Email: ',
        name: 'email',       
        // Check if valid email
        validate: function(input) {
            const done = this.async();

            if(!input.trim().length || !input.includes('@')) {
                done('Please provide a valid email');
                return;
            };

            done(null, true);
        }
    },
    {
        type:'list',
        message: 'Employee Role: ',
        choices: ['Engineer','Intern','Manager'],
        name: 'employeeRole'
    },  
];

// Sync tables
const syncTables = async function() {
    await sequelize.sync();
}

const getDepartment = async function() {
    const departmentList = await Department.findAll({
        raw: true,
    });

    console.table(departmentList);
}

const createDepartment = async function(newName) {
    const newDepartment = await Department.create({
        name: newName,
    })
}

const createRole = async function() {
    const newRole = await Role.create({
        title: 'engineer',
        salary: 100000,
        department_id: 1
    })
}

const getRole = async function() {
    const roleList = await Role.findAll({
        raw: true,
    });

    console.table(roleList);
}

const createEmployee = async function() {
    const newRole = await Employee.create({
        first_name: 'bob',
        last_name: 'bill',
        role_id: 1,

    })
}

const createManager = async function() {
    const newRole = await Employee.create({
        first_name: 'sally',
        last_name: 'bill',
        role_id: 1,
        manager_id: 3
    })
}

const getEmployee = async function() {
    const employeeList = await Employee.findAll({
        raw:true
    });

    console.table(employeeList);
}

//syncTables();
const seedData = async function() {
    /*await createDepartment();
    await getDepartment();
    await createRole();
    await getRole();
    await createEmployee();
    await createEmployee();
    await createManager();*/
    await getEmployee();
}

//seedData();
askQuestions();