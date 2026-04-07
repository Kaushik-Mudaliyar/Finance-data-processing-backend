import { userModel } from "../models/user.model.js";
import { isValidObjectId } from "mongoose";
import { apiResponse } from "../utils/apiResponse.js";
async function createUser(req, res) {
  const { username, email, role, status } = req.body;

  // check if name or email is not coming
  if (!username || !email) {
    apiResponse(res, 400, "Creating a user, name and email is required!");
  }

  // check if user already exists
  const isUserAlreadyExists = await userModel.findOne({ email: email });

  if (isUserAlreadyExists) {
    apiResponse(res, 400, "User already exists");
  }

  const user = await userModel.create({
    username: username,
    email: email,
    role,
    status,
  });

  apiResponse(res, 201, "User created successfully", user);
}
async function updateUser(req, res) {
  const { role, status } = req.body;
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  if (!role && !status) {
    apiResponse(res, 400, "Role or status is required for updating the user");
  }

  const user = await userModel.findById(userId);
  if (!user) {
    apiResponse(res, 404, "User does not exist");
  }

  if (role) {
    if (role !== "admin" && role !== "viewer" && role !== "analyst") {
      apiResponse(
        res,
        400,
        "Invalid Role. Role must be either admin,viewer or analyst",
      );
    }
    user.role = role;
  }
  if (status) {
    if (status !== "ACTIVE" && status !== "INACTIVE") {
      apiResponse(
        res,
        400,
        "Invalid Status, Status must be either ACTIVE or INACTIVE",
      );
    }
    user.status = status;
  }
  await user.save();
  apiResponse(res, 200, "User updated successfully", user);
}
async function getAllUsers(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const users = await userModel
    .find()
    .skip(Number(page - 1) * limit)
    .limit(Number(limit));

  apiResponse(res, 200, "All Users fetched successfully", users);
}

export { createUser, updateUser, getAllUsers };
