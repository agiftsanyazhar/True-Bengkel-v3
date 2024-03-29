import Sequelize from "sequelize";

const db = new Sequelize("true-bengkel-v3", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+07:00",
});

export default db;
