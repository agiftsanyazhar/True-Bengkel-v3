"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("pelanggans", [
      {
        name: "Pelanggan 1",
        email: "pelanggan1@gmail.com",
        phone: "085655472761",
        address: "Sioarjo 1",
        user_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pelanggan 2",
        email: "pelanggan2@gmail.com",
        phone: "085655472761",
        address: "Sioarjo 2",
        user_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pelanggan 3",
        email: "pelanggan3@gmail.com",
        phone: "085655472761",
        address: "Sioarjo 3",
        user_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pelanggans", null);
  },
};
