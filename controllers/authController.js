const User = require('./../models/userModel');

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");


exports.login = catchAsync( async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({
        where: { email },
        attributes: ['id', 'name', 'email', 'password', 'role']
    });
    
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    req.user = user;
    
    next();
})

exports.restrictTo = (role) => {
    return (req, res, next) => {
        if (role !== req.user.role) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }
        next();
    };
};

exports.logout = catchAsync(async (req, res, next) => {
    if(!req.user){
        return next(new AppError('First login to be logout !!!', 401));
    }

    req.user = null;

    next();
});