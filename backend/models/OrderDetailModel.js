import Sequelize from "sequelize";
import db from "../config/database.js";
import SparePart from "./SparePartModel.js";

const DataTypes = Sequelize;

const OrderDetail = db.define(
  "order_details",
  {
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    spare_part_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "spare_parts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    harga_satuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default OrderDetail;

import { Order } from "./OrderModel.js";

(async () => {
  await db.sync();

  OrderDetail.belongsTo(Order, { foreignKey: "order_id" });
  OrderDetail.belongsTo(SparePart, { foreignKey: "spare_part_id" });
})();
