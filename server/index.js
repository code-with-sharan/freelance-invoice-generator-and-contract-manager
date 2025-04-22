import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import registerRoutes from "./routes/index.js";
import sequelize from "./config/db.js";
import "./models/index.js"

const PORT = 9000;
const app = express();

app.use(express.json()); // whenever there is a 'get' req. from frontend to backend, that will be parsed in json.
app.use(cors());

// routes:
registerRoutes(app);

app.get("/", (req, res) => {
  res.send("API working!");
});

sequelize.sync({
  force: false, // force:true creates the table, dropping it first if it already existed
  alter: true, // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model
  logging: false, // Don't log the raw SQL queries to the console.
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
