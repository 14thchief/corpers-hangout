const { Strategy, ExtractJwt } = require('passport-jwt');
const { config, underscoreId } = require('./config');
const { User } = require('../database/models');

const applyPassportStrategy = (passport, req) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()
  options.secretOrKey = config.passport.secret;
  passport.use(
    new Strategy(options, async (payload, done) => {
      const { userID } = payload;
      
      const user = await User.findOne({ 
        where: { id: userID } 
      })

      if (!user ) return done({status: 401, msg: 'Unauthroized access'}, false);
      if (user) {
        return done(null, {
          id: user.id,
        });
      }

      return done(null, false);
    })
  );
};

module.exports = {
  applyPassportStrategy,
}