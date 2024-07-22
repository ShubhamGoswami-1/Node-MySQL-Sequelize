import User from './../models/userModel.js';
import { sequelize } from '../database.js';

// const createUser = async (userObj) => {
//     return await User.create(userObj);
// };

const getUserById = async (userId) => {
    return await User.findOne({ where: { id: userId } });
};

const getAllUsers = async () => {
    return await User.findAll();
};

const updateUserById = async (userId, userObj) => {
    return User.update(userObj, { where: { id: userId } });
};

const deleteUserById = async (userId) => {
    return await User.destroy({ where: { id: userId } });
};

const getUsersByNameLength = async (len) => {
    return await User.findAll({
        where: sequelize.where(sequelize.fn('char_length', sequelize.col('name')), len)
    });
};

export default {
    // createUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUsersByNameLength
};
