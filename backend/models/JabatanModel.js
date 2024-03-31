import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const Jabatan = db.define(
  "jabatans",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gaji_pokok: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tunjangan: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
