const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');


Department.hasMany(Role, {
    foreignKey: 'department_id',
    onDelete:'CASCADE',
});

Role.belongsTo(Department, {
    foreignKey: 'department_id'
});

Role.hasMany(Employee, {
    foreignKey:'role_id',
});

Employee.belongsTo(Role, {
    foreignKey:'role_id'
});

Employee.hasOne(Employee, {
    as: 'manager',
    foreignKey:'manager_id',
});

Employee.belongsTo(Employee, {
    as: 'employee',
    foreignKey:'manager_id'
});

module.exports = {
    Department,
    Role,
    Employee
};