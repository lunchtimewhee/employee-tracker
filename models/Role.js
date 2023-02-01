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
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        salary:{
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        department_id:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references:{
                model:'department',
                key:'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName:true,
        modelName: 'role',
    }
    
);

module.exports = Role;

