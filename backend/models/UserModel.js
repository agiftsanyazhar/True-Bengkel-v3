import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const User = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "roles", // This should match the name of your Role model
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default User;

import { Role } from "./RoleModel.js"; // Import Role model here

(async () => {
  await db.sync();

  // Define association after importing Role
  User.belongsTo(Role, { foreignKey: "role_id" });
})();
