require('dotenv').config();
const inquirer = require('inquirer');
const { Department, Employee, Role } = require('./models');
const sequelize = require('./config/connection');
const { create } = require('./models/Department');



// Question Arrays ----------------------------------------------------------------------------

// Array for main menu
const mainMenuQuestions = [
    {
        type:'list',
        message: 'What would you like to do? ',
        choices: ['View All Employees','Add Employees','Update Employee Role','View All Roles','Add Role', 'View All Departments', 'Add Department', 'Quit'],
        name: 'mainMenuChoice'
    }
];


const askQuestions = async function () {
    const answers = await inquirer.prompt(mainMenuQuestions);

    if (answers.mainMenuChoice === 'Quit') {
        return answers;
    } else {
        
        switch(answers.mainMenuChoice){
            case 'View All Employees':
                await getEmployee();
                break;

        };

        
        return askQuestions;
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
    console.log(JSON.stringify(departmentList,null,2));
}

const createDepartment = async function() {
    const newDepartment = await Department.create({
        name: 'test',
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
    console.log(JSON.stringify(roleList,null,2));
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