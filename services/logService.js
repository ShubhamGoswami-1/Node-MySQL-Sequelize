import logRepository from './../repositories/logRepository.js';
import AppError from '../utils/appError.js';

const createLog = async (action, description, userId) => {
    return await logRepository.createLog(action, description, userId);
};

const getAllLogs = async () => {
    return await logRepository.getAllLogs();
};

const getLogsByUserId = async (userId) => {
    const logs = await logRepository.getLogsByUserId(userId);
    if (!logs.length) {
        throw new AppError(`No logs found for user with ID ${userId}`, 404);
    }
    return logs;
};

export default {
    createLog,
    getAllLogs,
    getLogsByUserId
};
