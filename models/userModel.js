const { DataTypes } = require('sequelize');
const { sequelize } = require('./../database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[0-9]{10,12}$/,
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, Infinity],
            notEmpty: true
        }
    },
    confirmPassword: {
        type: DataTypes.VIRTUAL, // Use VIRTUAL data type to exclude this field from being saved to the database
        allowNull: false,
        validate: {
            isValidPassword(value) {
                if (value !== this.password) {
                    throw new Error('Passwords do not match!');
                }
            }
        }
    },
    passwordChangedAt: {
        type: DataTypes.DATE,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    tableName: 'Users',
    defaultScope: {
        attributes: { exclude: ['password', 'role', 'passwordChangedAt'] }
    },
    hooks: {
        beforeSave: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 12);

                if (!user.isNewRecord) {
                    user.passwordChangedAt = Date.now() - 1000;
                }
            }
        }
    },
});

// Method to compare passwords
User.prototype.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = User;
