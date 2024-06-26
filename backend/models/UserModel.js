import Sequelize from "sequelize";
import db from "../config/database.js";
import Admin from "./AdminModel.js";
import Pegawai from "./PegawaiModel.js";
import Pelanggan from "./PelangganModel.js";

const DataTypes = Sequelize;

const User = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
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

export { User };

User.hasMany(Admin, { foreignKey: "user_id" });
User.hasMany(Pegawai, { foreignKey: "user_id" });
User.hasMany(Pelanggan, { foreignKey: "user_id" });

export default User;

import { Role } from "./RoleModel.js";

(async () => {
  await db.sync();

  User.belongsTo(Role, { foreignKey: "role_id" });
})();
