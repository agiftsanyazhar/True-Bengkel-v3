"use strict";

function generateRandomString(length) {
  const numbers = "0123456789";
  let randomString = "";
  randomString += Math.random().toString(36).toUpperCase().substring(2, 4);
  for (let i = 0; i < length; i++) {
    randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  randomString += Math.random().toString(36).toUpperCase().substring(2, 5);
  return randomString;
}

function generateWarna() {
  const dataWarna = ["Putih", "Hitam", "Merah", "Biru", "Silver"];
  const randomIndex = Math.floor(Math.random() * dataWarna.length);
  const randomWarna = dataWarna[randomIndex];
  return randomWarna;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [];

    for (let i = 0; i < 10; i++) {
      data.push({
        stnk: generateRandomString(4),
        pelanggan_id: Math.floor(Math.random() * 3) + 1,
        tipe_motor_id: Math.floor(Math.random() * 10) + 1,
        no_mesin: generateRandomString(7),
        no_rangka: generateRandomString(8),
        tahun: Math.floor(Math.random() * (2023 - 2000 + 1)) + 2000,
        warna: generateWarna(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("kendaraans", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("kendaraans", null);
  },
};
