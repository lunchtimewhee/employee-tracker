const Department = require('./Department');
const Employee = require('./Employee');
const Role = require('./Role');

Department.hasMany(Role, {
    foreignKey: 'department_id',
    onDelete:'CASCADE',
});

