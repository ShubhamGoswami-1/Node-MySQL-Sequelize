const Log = require('./../models/logModel');
const User = require('./../models/userModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.createLog = catchAsync(async (action, description, userId) => {
    await Log.create({ action, description, userId });
});

exports.getAllLogs = catchAsync(async (req, res, next) => {
    const logs = await Log.findAll({
        include: {
            model: User,
            attributes: ['id', 'name', 'email']
        }
    });

    res.status(200).json({
        status: 'success',
        data: {
            logs
        }
    });
});

exports.getLogsByUserId = catchAsync(async (req, res, next) => {
    const userId = req.params.userId;

    const logs = await Log.findAll({
        where: { userId },
        include: {
            model: User,
            attributes: ['id', 'name', 'email']
        }
    });

    if (!logs.length) {
        return next(new AppError(`No logs found for user with ID ${userId}`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            logs
        }
    });
});
