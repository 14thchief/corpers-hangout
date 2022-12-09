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

    await queryInterface.bulkInsert('User_details', [
      {
        userID: 1,
        phone: '9018964453',
        startDate: '12/2/2023',
        batch: 'A2',
        school: 'unn',
        state: 'lagos',
        community: 'platoon',
        platoon: '10',
        lga: null,

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 2,
        phone: '2349018964453',
        startDate: '12/2/2023',
        batch: 'A2',
        school: 'unilag',
        state: 'lagos',
        community: 'platoon',
        platoon: '10',
        lga: null,

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
    await queryInterface.bulkDelete('User_details', null, {});
  }
};
