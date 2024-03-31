import Sequelize from "sequelize";
import db from "../config/database.js";
import TipeMotor from "./TipeMotorModel.js";

const DataTypes = Sequelize;

const Kendaraan = db.define(
  "kendaraans",
  {
    stnk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pelanggan_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "pelanggans",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    tipe_motor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "tipe_motors",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    no_mesin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_rangka: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tahun: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    warna: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Kendaraan;

import { Pelanggan } from "./PelangganModel.js";

(async () => {
  await db.sync();

  Kendaraan.belongsTo(Pelanggan, { foreignKey: "pelanggan_id" });
  Kendaraan.belongsTo(TipeMotor, { foreignKey: "tipe_motor_id" });
})();
