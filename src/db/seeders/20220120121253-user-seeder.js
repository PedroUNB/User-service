'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'user',
      [
        {
          id: 'd6527379-f12c-4c90-90d4-f62faebedc8b'
        },
        {
          id: 'ffbe568f-bed8-46f4-b2fb-d2ec4167d647'
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
