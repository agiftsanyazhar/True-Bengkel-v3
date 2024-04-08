import Sequelize from "sequelize";
import db from "../config/database.js";
import Kendaraan from "./KendaraanModel.js";
import Order from "./OrderModel.js";

const DataTypes = Sequelize;

const Pelanggan = db.define(
  "pelanggans",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
  }
);

export { Pelanggan };

Pelanggan.hasMany(Kendaraan, { foreignKey: "pelanggan_id" });
Pelanggan.hasMany(Order, { foreignKey: "pelanggan_id" });

export default Pelanggan;

import { User } from "./UserModel.js";

(async () => {
  await db.sync();

  Pelanggan.belongsTo(User, { foreignKey: "user_id" });
})();
