import Sequelize from "sequelize";
import db from "../config/database.js";
import SparePart from "./SparePartModel.js";

const DataTypes = Sequelize;

const TipeMotor = db.define(
  "tipe_motors",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export { TipeMotor };

TipeMotor.hasMany(SparePart, { foreignKey: "tipe_motor_id" });

export default TipeMotor;

(async () => {
  const Kendaraan = (await import("./KendaraanModel.js")).default;

  await db.sync();

  TipeMotor.hasMany(Kendaraan, { foreignKey: "tipe_motor_id" });
})();
