import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const User = db.define(
  "users",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
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
