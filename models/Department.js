const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Department extends Model {}

Department.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.VARCHAR(30),
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'department',
    }
);

module.exports = Department;

