import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"

const Invoice = sequelize.define(
  "Invoice",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    services: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    taxAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("paid", "unpaid", "overdue"),
      defaultValue: "unpaid",
    },
    isTaxInvoice: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: { // foreign key
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["invoiceNumber"],
        name: "unique_invNo_invoice",
      },
    ],
  }
);

export default Invoice;
