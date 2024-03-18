import Sequelize from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";

const DataTypes = Sequelize;

const Role = db.define(
  "roles",
  {
    name: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export { Role }; // Export Role model

Role.hasMany(User, { foreignKey: "role_id" });

export default Role;

(async () => {
  await db.sync();
})();
