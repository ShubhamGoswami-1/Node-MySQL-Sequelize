import catchAsync from './../utils/catchAsync.js';
import logService from './../services/logService.js';

const createLog = catchAsync(async (action, description, userId) => {
    await logService.createLog(action, description, userId);
});

const getAllLogs = catchAsync(async (req, res, next) => {
    const logs = await logService.getAllLogs();
    res.status(200).json({
        status: 'success',
        data: {
            logs
        }
    });
});

const getLogsByUserId = catchAsync(async (req, res, next) => {
    const userId = req.params.userId;
    const logs = await logService.getLogsByUserId(userId);
    res.status(200).json({
        status: 'success',
        data: {
            logs
        }
    });
});

export default { createLog, getAllLogs, getLogsByUserId };
