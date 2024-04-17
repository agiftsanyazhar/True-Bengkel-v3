import Sequelize from "sequelize";
import db from "../config/database.js";
import OrderDetail from "./OrderDetailModel.js";

const DataTypes = Sequelize;

const SparePart = db.define(
  "spare_parts",
  {
    spare_part_code: {
      type: DataTypes.STRING,
      allowNull: false,
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export { SparePart };

SparePart.hasMany(OrderDetail, { foreignKey: "spare_part_id" });

export default SparePart;

import { TipeMotor } from "./TipeMotorModel.js";

(async () => {
  await db.sync();

  SparePart.belongsTo(TipeMotor, { foreignKey: "tipe_motor_id" });
})();
