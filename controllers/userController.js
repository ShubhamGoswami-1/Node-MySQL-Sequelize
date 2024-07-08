const User = require('./../models/userModel');

const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

const LogController = require('./logController');

exports.createUser = catchAsync( async (req, res, next) => {
    const userObj = { ...req.body };

    const newUser = await User.create(userObj);

    await LogController.createLog('Create User', 'User created successfully', newUser.id);

    res.status(201).json({
        status: "success",
        data: {
            newUser
        }
    });
})

exports.getMe = catchAsync(async(req, res, next) => {

    const userId = req.user.id;

    const user = await User.findOne({ where: { id: userId } });

    if(!user){
        return next(new AppError(`No user found with user id:${userId}`, 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    });
});

exports.getAllUsers = catchAsync(async(req, res, next) => {
    const users = await User.findAll();

    res.status(200).json({
        status: "success",
        data: {
            users
        }
    });
});



exports.getUserById = catchAsync(async(req, res, next) => {

    const userId = req.params.userId;

    const user = await User.findOne({ where: { id: userId } });

    if(!user){
        return next(new AppError(`No user found with user id:${userId}`, 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    });
});

exports.updateUserById = catchAsync(async (req, res, next) => {
    
    const userId = req.params.userId;
    const userObj = req.body;

    const [updated] = await User.update(userObj, { where: { id: userId } });

    if(!updated) {
        return next(new AppError(`No ser updated!!!`, 400));
    }

    await LogController.createLog('Update User', `User with ID ${userId} updated`, userId);

    res.status(200).json({
        status: "success",
        message: "User details updated Successfully!!!"
    });
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    const userId = req.params.userId;

    const user = await User.destroy({
        where: { id: userId }
    });

    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    await LogController.createLog('Delete User', `User with ID ${userId} deleted`, userId);

    res.status(204).json({
        status: 'success',
        data: null
    });
});