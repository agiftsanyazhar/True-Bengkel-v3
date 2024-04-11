"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("order_details", [
      {
        order_id: 1,
        spare_part_id: 1,
        qty: 2,
        harga_satuan: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 1,
        spare_part_id: 2,
        qty: 3,
        harga_satuan: 195000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 2,
        spare_part_id: 3,
        qty: 4,
        harga_satuan: 48000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 2,
        spare_part_id: 4,
        qty: 5,
        harga_satuan: 30000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 3,
        spare_part_id: 5,
        qty: 6,
        harga_satuan: 33000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 3,
        spare_part_id: 6,
        qty: 7,
        harga_satuan: 30000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("order_details", null);
  },
};
