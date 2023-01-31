const Department = require('./Department');
const Employee = require('./Employee');
const Role = require('./Role');

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
    foreignKey:'manager_id',
});

Employee.belongsTo(Employee, {
    foreignKey:'manager_id'
});

module.exports = {
    Department,
    Employee,
    Role
};