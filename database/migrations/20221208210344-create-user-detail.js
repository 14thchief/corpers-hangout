'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
      },
      startDate: {
        type: Sequelize.STRING,
      },
      batch: {
        type: Sequelize.STRING
      },
      school: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      community: {
        type: Sequelize.STRING,
      },
      platoon: {
        type: Sequelize.STRING
      },
      lga: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_details');
  }
};