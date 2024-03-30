import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const Jabatan = db.define(
  "jabatans",
  {
    name: {
      type: DataTypes.STRING,
    },
    gaji_pokok: {
      type: DataTypes.INTEGER,
    },
    tunjangan: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Jabatan;

(async () => {
  await db.sync();
})();
