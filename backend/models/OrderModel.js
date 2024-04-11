import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const Order = db.define(
  "orders",
  {
    order_code: {
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
    is_paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    total_shopping: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    proof_of_payment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export { Order };

export default Order;

import { Pelanggan } from "./PelangganModel.js";

(async () => {
  const OrderDetail = (await import("./OrderDetailModel.js")).default;

  await db.sync();

  Order.belongsTo(Pelanggan, { foreignKey: "pelanggan_id" });
  Order.hasMany(OrderDetail, { foreignKey: "order_id" });
})();
