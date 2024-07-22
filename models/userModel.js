import { DataTypes } from 'sequelize';
import { sequelize } from './../database.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
        type: DataTypes.VIRTUAL,
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
    paranoid: true, // Enable soft deletes
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

// Method to check if password was changed after token was issued
User.prototype.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

// Method to create a password reset token
User.prototype.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    return resetToken;
};

export default User;
