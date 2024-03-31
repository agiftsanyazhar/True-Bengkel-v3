"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tipe_motors", [
      {
        name: "Scooter",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sport Bike",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Naked Bike",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sport Touring",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dirt Bike",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dual Bike",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cruiser",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Motocross",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Scrambler",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ATV",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tipe_motors", null);
  },
};
