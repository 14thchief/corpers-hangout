'use strict';

module.exports = (sequelize, DataTypes) => {

  const User_detail = sequelize.define('User_detail',{
    userID: DataTypes.INTEGER,
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    gender: DataTypes.STRING,
    startDate: DataTypes.STRING,
    school: DataTypes.STRING,
    batch: DataTypes.STRING,
    state: DataTypes.STRING,
    community: DataTypes.STRING,
    platoon: DataTypes.STRING,
    lga: DataTypes.STRING
  });

  User_detail.associate = (models) => {
    // define association here
    User_detail.belongsTo(models.User, {
      foreignKey: 'userID',
      as: 'user',
      onDelete: 'CASCADE',
      allowNull: false,
    })
  }

  User_detail.getUserInfo = async (userID) => {
    let user = await User_detail.findOne({
      where: {
        userID
      }
    });

    return user;
  }

  User_detail.createUserDetails = async (userDetails) => {
    const newUserDetails = await User_detail.create({...userDetails});
    if (!newUserDetails) {
      return false;
    }
    return userDetails.userID;
  }

  //User_detail.sync();
  return User_detail;
};