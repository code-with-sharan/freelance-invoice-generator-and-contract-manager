import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
});

try {
  await sequelize.authenticate();
  console.log('DB Connected!');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;
