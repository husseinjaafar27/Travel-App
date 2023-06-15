import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const User = sequelize.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

export default User;
