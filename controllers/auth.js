const { User, User_detail } =  require('../database/models/index');
const { findUserInRecord, hashPassword, comparePassword, updateUserRecord } = require('../util');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../auth/config');


// VALIDATE ALL PROTECTED ROUTES REQUEST MIDDLEWARE
const validateUser = async (req, res, next)=> {
  try {
      
      const tokenBearer = req.headers.authorization;
      if (tokenBearer && tokenBearer.length){
          const token = tokenBearer.split(" ")[1];
          
          // decrypt the token for user ID
          const { userID } = jwt.decode(token);
          
          // find the user and validate the token
          const user = await User.findOne({
              where: {
                  id: userID,
                  singleToken: token,
              },
              attributes: {
                  exclude: ['singleToken', 'password']
              }
          });

          if (!user) {
              return next({status: 401, msg: 'User not authorized'});
          }

          req.token = token;
          req.user = user.dataValues;

          next();
      } else {
          next({status: 401, msg: 'No token provided'});
      }
  } 
  catch (err) {
      console.log({err});
      next({status: 500, msg: 'server error'});
  }
  
}

// REGISTER USER AND GENERATE JWT: todo- abstract validation functions
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

      const usernameExists = await findUserInRecord("username", username, User);
      const emailExists = await findUserInRecord("email", email, User);

      if (usernameExists){
          // console.log(findUserInRecord("username", username, User))
          return next({status: 400, msg: "Username has been taken, try another one"});
      }
      if (emailExists){
          return next({status: 400, msg: "Email has been used by an existing user"});
      }

      // hash password
      const securePass = await hashPassword(password);

      // sequelize model create user- todo: validate ALL info before creation
      const userID = await User.createUser({
          username,
          password: securePass,
          firstName, 
          lastName, 
          email, 
      });

      // if creation error
      if (!userID) {
          return next({status: 400, msg: "Invalid user details"});
      }

      // create/append user details
      const userDetail = await User_detail.createUserDetails({
          userID,
          phone,
          startDate,
          school,
          batch,
          state,
          community,
          platoon,
          lga
      })

      // if creation error
      if (!userDetail) {
          return next({status: 400, msg: "Invalid user details"});
      }

      // sign token
      const token = jwt.sign({ userID }, config.passport.secret, {
          expiresIn: config.passport.expiresIn || 10000000
      });

      // return created user
      const userInfo = {
          token,
          id: userID,
          firstName,
          lastName,
          email,
          username,
          phone,
          startDate,
          school,
          batch,
          state,
          community,
          platoon,
          lga
      };

      res.status(201)
      .header({
          "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
          "Content-Security-Policy": `script-src 'self'`,
          "X-Frame-Options": "DENY",
      })
      .json(userInfo);
  }
  catch (e) {
      console.log({error: e})
      next({status: 500, msg: "Something went wrong"});
  }

}

// LOGIN USER AND GENERATE JWT: todo- abstract validation functions
const loginUser = async (req, res, next) => {
  try {
      // extract the request body
      const {
          email,
          username,
          password,
      } = req.body;

      /** START VALIDATION */ 

      if (!username && !email) {
          return next({status: 400, msg: "Provide username or email"});
      }

      const user = username? await findUserInRecord("username", username, User) : await findUserInRecord("email", email, User);
      if (!user) {
          return next({status: 400, msg: "User does not exist"});
      }

      const validPassword = await comparePassword(password, user.password);
      if(!validPassword) {
          return next({status: 401, msg: "Invalid password"});
      }

      /**END OF VALIDATION */


      // Sign the user with token
      const token = jwt.sign({ userID: user.id }, config.passport.secret, {
          expiresIn: config.passport.expiresIn || 10000000
      });

      const isUpdated = await updateUserRecord('singleToken', token, user.id, User);

      // get User details
      const { dataValues: userDetail } = await User_detail.findOne({
          where: { userID: user.id },
          attributes: {
              exclude: ['id', 'userID'],
          },
      })

      const userInfo = { token, ...user, ...userDetail };
      delete userInfo.password;

      res.status(200).json(userInfo);

  } catch(e){
      console.log({error: e})
  }
}


module.exports = {
  validateUser,
  registerUser,
  loginUser,
}