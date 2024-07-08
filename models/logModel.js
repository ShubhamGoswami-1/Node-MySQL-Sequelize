// models/logModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./../database');

const User = require('./userModel');

const Log = sequelize.define('Log', {
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'Logs'
});

User.hasMany(Log, { foreignKey: 'userId' });
Log.belongsTo(User, { foreignKey: 'userId' });

module.exports = Log;
