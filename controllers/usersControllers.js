const { User, User_detail } =  require('../database/models/index');

const registerUser = async (req, res, next)=> {
    try {
        // extract the request body
        const {
            firstName,
            lastName,
            email,
            username,
            password,
            phone,
            startDate,
            school,
            batch,
            state,
            community,
            platoon,
            lga
        } = req.body;

        /** Run controller functions on the request data to update database 
             through ORM and return a response on success or faillure*/
        
        // const userID = await User.createUser({
        //     username,
        //     password,
        //     firstName, 
        //     lastName, 
        //     email, 
        // });

        // if (!userID) {
        //     return next({status: 400, message: "Invalid user"});
        // }

        // const userDetail = await User_detail.createUserDetails({
        //     userID,
        //     phone,
        //     startDate,
        //     school,
        //     batch,
        //     state,
        //     community,
        //     platoon,
        //     lga
        // })

        // if (!userDetail) {
        //     return next({status: 400, message: "Invalid user details"});
        // }

        const allUsers = await User.findAll();

        // return created user
        // const userInfo = {
        //     id: userID,
        //     firstName,
        //     lastName,
        //     email,
        //     username,
        //     password,
        //     phone,
        //     startDate,
        //     school,
        //     batch,
        //     state,
        //     community,
        //     platoon,
        //     lga
        // };

        res.status(201)
        .header({
            "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
            "Content-Security-Policy": `script-src 'self'`,
            "X-Frame-Options": "DENY",
        })
        .json(allUsers);
    }
    catch (e) {
        console.log({error: e})
    }

}

const getUserInfo = async (req, res, next) => {
    const username = req.params.username;
    const user = await User.getUser(username);
    if (!user) {
        return next({status: 404, message: "User not found" })
    }

    const userDetails = await User_detail.getUserInfo(user.id);
    if (!userDetails) {
        return next({status: 404, message: "User details not found" })
    }

    const userInfo = {...user.dataValues, ...userDetails.dataValues}

    res.status(200).json(userInfo);
}

module.exports = {
    registerUser,
    getUserInfo,
    
}