"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "jabatans",
      [
        {
          name: "Kepala Bengkel",
          gaji_pokok: 10000000,
          tunjangan: 5000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Teknisi",
          gaji_pokok: 9000000,
          tunjangan: 4500000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Administrasi",
          gaji_pokok: 8000000,
          tunjangan: 4000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Karyawan Umum",
          gaji_pokok: 7000000,
          tunjangan: 3500000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pemilik Usaha",
          gaji_pokok: 6000000,
          tunjangan: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("jabatans", null, {});
  },
};
