import { userModel } from "../models/user.model.js";
import { isValidObjectId } from "mongoose";
async function createUser(req, res) {
  const { username, email, role, status } = req.body;

  // check if name or email is not coming
  if (!username || !email) {
    return res
      .status(400)
      .json({ message: "Creating a user, name and email is required!" });
  }

  // check if user already exists
  const isUserAlreadyExists = await userModel.findOne({ email: email });

  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await userModel.create({
    username: username,
    email: email,
    role,
    status,
  });

  return res.status(201).json({ message: "User created successfully", user });
}
async function updateUser(req, res) {
  const { role, status } = req.body;
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  if (!role && !status) {
    return res
      .status(400)
      .json({ message: "Role or status is required for updating the user" });
  }

  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  if (role) {
    if (role !== "admin" && role !== "viewer" && role !== "analyst") {
      return res.status(400).json({
        message: "Invalid Role. Role must be either admin,viewer or analyst",
      });
    }
    user.role = role;
  }
  if (status) {
    if (status !== "ACTIVE" && status !== "INACTIVE") {
      return res.status(400).json({
        message: "Invalid Status. Status must be either ACTIVE or INACTIVE",
      });
    }
    user.status = status;
  }
  await user.save();
  return res.status(200).json({ message: "User updated successfully", user });
}
async function getAllUsers(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const users = await userModel
    .find()
    .skip(Number(page - 1) * limit)
    .limit(Number(limit));

  return res
    .status(200)
    .json({ message: "All Users fetched successfully", users });
}

export { createUser, updateUser, getAllUsers };
