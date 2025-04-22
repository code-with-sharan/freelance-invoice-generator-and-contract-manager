import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Invoice from "./invoice.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("FREELANCER", "CLIENT"),
      allowNull: true,
    },
    isGSTRegistered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    gstNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    schemeType: {
      type: DataTypes.ENUM("regular", "COMPOSITION"),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {
        isNumeric: true, // will only allow Numbers
        len: {
          args: [10, 10],
          msg: "Phone number should be 10 digit",
        },
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userName"],
        name: "unique_username_user",
      },
      {
        unique: true,
        fields: ["email"],
        name: "unique_email_user",
      },
    ],
  }
);

User.hasMany(Invoice, {
    foreignKey: "userId"
})

Invoice.belongsTo(User, {
    foreignKey: "userId"
})

export default User;
//