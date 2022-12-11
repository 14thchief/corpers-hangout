'use strict';
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User',{
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: DataTypes.STRING,
    singleToken: DataTypes.STRING,
  });

  User.associate = (models)=> {
    // define association here
    User.hasMany(models.User_detail, {
      foreignKey: 'userID',
      as: 'details',
      onDelete: 'CASCADE',
    });
  }


  User.getUser = async (userID) => {
    let user = await User.findOne({
      where: {
        id: userID,
      }
    });

    if (!user) {
      user = await User.findOne({
        where: {
          username: userID
        }
      }); 
    }

    return user;
  }

  User.createUser = async (user) => {
    try{
      const newUser = await User.create({...user});
      if (!newUser) {
        return false;
      }
      return newUser.dataValues.id;
    } catch (e) {
      console.log({error: e})
    }
  }

  // User.sync({ force: true});
  return User;
};