import userRepository from './../repositories/userRepository.js';
import LogController from './../controllers/logController.js';
import AppError from '../utils/appError.js';

// const createUser = async (userObj) => {
//     const newUser = await userRepository.createUser(userObj);
//     await LogController.createLog('Create User', 'User created successfully', newUser.id);
//     return newUser;
// };

const getUserById = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new AppError(`No user found with user id:${userId}`, 404);
    }
    return user;
};

const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};

const updateUserById = async (userId, userObj) => {
    const [updated] = await userRepository.updateUserById(userId, userObj);
    if (!updated) {
        throw new AppError(`No user updated!!!`, 400);
    }
    await LogController.createLog('Update User', `User with ID ${userId} updated`, userId);
    return updated;
};

const deleteUserById = async (userId) => {
    const deleted = await userRepository.deleteUserById(userId);
    if (!deleted) {
        throw new AppError('No user found with that ID', 404);
    }
    await LogController.createLog('Delete User', `User with ID ${userId} deleted`, null);
    return deleted;
};

const getUsersByNameLength = async (len) => {
    return await userRepository.getUsersByNameLength(len);
};

export default {
    // createUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUsersByNameLength
};
