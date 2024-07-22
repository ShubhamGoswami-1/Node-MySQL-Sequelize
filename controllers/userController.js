import catchAsync from './../utils/catchAsync.js';
import userService from './../services/userService.js';

// const createUser = catchAsync(async (req, res, next) => {
//     const userObj = { ...req.body };
//     const newUser = await userService.createUser(userObj);
//     res.status(201).json({
//         status: "success",
//         data: {
//             newUser
//         }
//     });
// });

const getMe = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const user = await userService.getUserById(userId);
    res.status(200).json({
        status: "success",
        data: {
            user
        }
    });
});

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await userService.getAllUsers();
    res.status(200).json({
        status: "success",
        data: {
            users
        }
    });
});

const getUserById = catchAsync(async (req, res, next) => {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    res.status(200).json({
        status: "success",
        data: {
            user
        }
    });
});

const updateUserById = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    const userObj = req.body;
    await userService.updateUserById(userId, userObj);
    res.status(200).json({
        status: "success",
        message: "User details updated successfully!!!"
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const userId = req.params.userId;
    await userService.deleteUserById(userId);
    res.status(204).json({
        status: 'success',
        data: null
    });
});

const checkNameLength = catchAsync(async (req, res, next) => {
    const { len } = req.body;
    const users = await userService.getUsersByNameLength(len);
    res.status(200).json({
        status: 'success',
        users
    });
});

export default { 
    // createUser,
    getMe, 
    getAllUsers, 
    getUserById, 
    updateUserById, 
    deleteUser, 
    checkNameLength 
};