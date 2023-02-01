require('dotenv').config();
const inquirer = require('inquirer');
const { Department, Employee, Role } = require('./models');
const sequelize = require('./config/connection');
const { create } = require('./models/Department');
const { json } = require('body-parser');

let activeDepartmentList = [];
let activeRoleList = [];
let activeEmployeeList = [];
let display = true;




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
            case 'Add Role':
                await createRole(answers.roleName, answers.roleSalary, answers.roleDepartment);
                break;
            case 'Add Employee':
                await createEmployee(answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager);
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
};

// Return a list of all departments
const getDepartment = async function() {
    const departmentList = await Department.findAll({
        raw: true,
    });

    if(display){
        console.table(departmentList);
    }

    // Set a value for each department = to its id. Inquirer will use this value as the answer. 
    departmentList.forEach((dep) => {
        dep.value = dep.id;
    });

    activeDepartmentList = departmentList;
    
};

// Create a new department and add it to the database
const createDepartment = async function(newName) {
    const newDepartment = await Department.create({
        name: newName,
    })

    console.log(`\nAdded ${newName} to the database. \n`)
};


// Return a list of all roles
const getRole = async function() {
    const roleList = await Role.findAll({
        raw: true,
    });

    if(display){
        console.table(roleList);
    }
    

    // Set a value for each role = to its id. Inquirer will use this value as the answer. 
    roleList.forEach((role) => {
        role.value = role.id;
        role.name = role.title;
    });

    activeRoleList = roleList;
    
};


// Create a new Role and add it to the database
const createRole = async function(newTitle, newSalary, newDepartmentId) {
    const newRole = await Role.create({
        title: newTitle,
        salary: newSalary,
        department_id: newDepartmentId
    })

    console.log(`\nAdded ${newTitle} to the database. \n`)
};

// Return a list of all employees
const getEmployee = async function() {
    const employeeList = await Employee.findAll({
        raw:true
    });

    if(display){
        console.table(employeeList);
    }
    
     // Set a value for each Employee = to its id. Inquirer will use this value as the answer. 
     employeeList.forEach((e) => {
        e.value = e.id;
        e.name = `${e.first_name} ${e.last_name}`;
    });

    activeEmployeeList = employeeList;

};


// Create a new Employee and add it to the database
const createEmployee = async function(newFirstName, newLastName, newRoleId, newManagerId) {
    const newRole = await Employee.create({
        first_name: newFirstName,
        last_name: newLastName,
        role_id: newRoleId,
        manager_id: newManagerId

    })
}




// Question Arrays ----------------------------------------------------------------------------

// Array for main menu
const mainMenuQuestions = [
    {
        type: 'list',
        message: 'What would you like to do? ',
        choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role', 'View All Departments', 'Add Department', 'Quit'],
        name: 'mainMenuChoice'
    },
    {
        type: 'input',
        message: 'Enter new department name: ',
        when: (answers) => { 
            return answers.mainMenuChoice === 'Add Department'
        },
        name: 'departmentName'
    },
    {
        type: 'input',
        message: 'Enter new role name: ',
        when: (answers) => { 
            return answers.mainMenuChoice === 'Add Role'
        },
        name: 'roleName'
    },
    {
        type: 'input',
        message: 'Enter new role salary amount: ',
        when: (answers) => { 
            return answers.mainMenuChoice === 'Add Role'
        },
        name: 'roleSalary',
        validate: function(input) {
            const done = this.async();

            if(!/^[0-9].+$/.test(input)) {
                done('Please provide a valid office number', false);
                return;
            };

            done(null, true);
        }   
    },
    {
        type: 'list',
        message: 'Select the department that the role will belong to: ',
        choices: async () => {
            display = false; 
            await getDepartment(); 
            display = true; 
            return activeDepartmentList
        },
        when: (answers) => { 
            return answers.mainMenuChoice === 'Add Role'
        },
        name: 'roleDepartment'
        
    },
    {
        type: 'input',
        message: 'Enter new Employee first name: ',
        when: (answers) => { 
            return answers.mainMenuChoice === 'Add Employee'
        },
        name: 'employeeFirstName'
    },
    {
        type: 'input',
        message: 'Enter new Employee last name: ',
        when: (answers) => { 
            return answers.mainMenuChoice === 'Add Employee'
        },
        name: 'employeeLastName'
    },
    {
        type: 'list',
        message: `Select the new employee's role: `,
        choices: async () => {
            display = false; 
            await getRole(); 
            display = true;
            return activeRoleList
        },
        when: (answers) => { 
            return answers.mainMenuChoice === 'Add Employee'
        },
        name: 'employeeRole'
        
    },
    {
        type: 'list',
        message: `Select the new employee's manager: `,
        choices: async () => {
            display = false;
            await getEmployee(); 
            display = true;
            return activeEmployeeList
        },
        when: (answers) => { 
            return answers.mainMenuChoice === 'Add Employee'
        },
        name: 'employeeManager'
        
    },

];


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
const init = async function() {
    syncTables();
    await askQuestions();
}

//const test = async ()=>{await getDepartment();console.log(activeDepartmentList);};
//test();




