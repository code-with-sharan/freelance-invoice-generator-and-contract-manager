import { create } from "../config/autuCRUD.js";
import User from "../models/user.js";

const createUser = async (req, res) => {
  create(User, req, res);
};

export { createUser };
