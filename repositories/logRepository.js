import Log from './../models/logModel.js';
import User from './../models/userModel.js';

const createLog = async (action, description, userId) => {
    return await Log.create({ action, description, userId });
};

const getAllLogs = async () => {
    return await Log.findAll({
        include: {
            model: User,
            attributes: ['id', 'name', 'email']
        }
    });
};

const getLogsByUserId = async (userId) => {
    return await Log.findAll({
        where: { userId },
        include: {
            model: User,
            attributes: ['id', 'name', 'email']
        }
    });
};

export default {
    createLog,
    getAllLogs,
    getLogsByUserId
};
