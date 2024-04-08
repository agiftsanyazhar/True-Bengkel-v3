"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("orders", [
      {
        order_code: "ODR-27112023201348",
        pelanggan_id: 3,
        is_paid: 0,
        total_shopping: 423000,
        proof_of_payment:
          "backend/assets/img/proof-of-payment/bukti-pembayaran-1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_code: "ODR-28112023201348",
        pelanggan_id: 2,
        is_paid: 0,
        total_shopping: 1650000,
        proof_of_payment:
          "backend/assets/img/proof-of-payment/bukti-pembayaran-2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_code: "ODR-29112023201348",
        pelanggan_id: 3,
        is_paid: 0,
        total_shopping: 1250000,
        proof_of_payment:
          "backend/assets/img/proof-of-payment/bukti-pembayaran-3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orders", null);
  },
};
