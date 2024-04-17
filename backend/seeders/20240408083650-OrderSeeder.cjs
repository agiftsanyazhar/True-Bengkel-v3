"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("orders", [
      {
        order_code: "ODR-27112023201348",
        pelanggan_id: 3,
        is_paid: 0,
        total_shopping: 601000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_code: "ODR-28112023201348",
        pelanggan_id: 2,
        is_paid: 0,
        total_shopping: 342000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_code: "ODR-29112023201348",
        pelanggan_id: 3,
        is_paid: 0,
        total_shopping: 408000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orders", null);
  },
};
