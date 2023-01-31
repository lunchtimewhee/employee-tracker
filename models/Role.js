const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Role extends Model {}

Role.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.VARCHAR(30),
            allowNull: false,
        },
        salary:{
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        department_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'department',
                key:'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'role',
    }
);

module.exports = Role;

