'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        username: 'chief',
        password: '@password',
        firstName: 'Victor',
        lastName: 'Izu-Akiti',
        email: 'corpershangout14@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'tobbs',
        password: '@password',
        firstName: 'Tobi',
        lastName: 'Idowu',
        email: 'corpershangout1@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
