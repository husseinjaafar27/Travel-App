import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Booking = sequelize.define(
  "bookings",
  {
    user_id: {
      type: DataTypes.INTEGER,
    },
    userEmail: {
      type: DataTypes.STRING,
    },
    tourName: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    guestSize: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    bookAt: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: true }
);

export default Booking;
