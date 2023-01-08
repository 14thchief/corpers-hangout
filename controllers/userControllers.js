const { User, User_detail } =  require('../database/models/index');

// GET USER PROFILE
const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            attributes: {
                exclude: ['password', 'singleToken'],
            },
        })
        if (!user) {
            return next({status: 404, msg: 'User not found'});
        }

        const details = await User_detail.findOne({
            where: { userID: user.dataValues.id },
        })

        const result = { ...user.dataValues, ...details.dataValues };
        res.status(200).json(result);
    } catch(e) {
        console.log({error: e});
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.findAll({
            attributes: {
                exclude: ['password', 'singleToken'],
            },
        });
        res.status(200).json(allUsers);
    } catch(e) {
        console.log({error: e});
    }
}

const getUserInfo = async (req, res, next) => {
    const username = req.params.username;
    const user = await User.getUser(username);
    if (!user) {
        return next({status: 404, msg: "User not found" })
    }

    const userDetails = await User_detail.getUserInfo(user.id);
    if (!userDetails) {
        return next({status: 404, msg: "User details not found" })
    }

    const userInfo = {...user.dataValues, ...userDetails.dataValues}

    res.status(200).json(userInfo);
}

module.exports = {
    getUserInfo,
    getUserProfile,
    getAllUsers,
    
}