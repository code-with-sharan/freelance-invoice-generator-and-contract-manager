import { create } from "../config/autuCRUD.js";
import User from "../models/user.js";

const createUser = async (req, res) => {
  console.log(req)
  create(User, req, res);
};

export { createUser };
