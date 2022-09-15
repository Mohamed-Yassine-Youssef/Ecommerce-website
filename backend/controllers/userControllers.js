import express from "express";
import asyncHandler from "express-async-handler";
import user from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// auth user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const User = await user.findOne({ email });
  if (User && (await User.matchPassword(password))) {
    res.json({
      _id: User._id,
      name: User.name,
      email: User.email,
      isAdmin: User.isAdmin,
      token: generateToken(User._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await user.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  const User = await user.create({
    name,
    email,
    password,
  });
  if (User) {
    res.status(201).json({
      _id: User._id,
      name: User.name,
      email: User.email,
      isAdmin: User.isAdmin,
      token: generateToken(User._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});
//get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const User = await user.findById(req.User._id);

  if (User) {
    res.json({
      _id: User._id,
      name: User.name,
      email: User.email,
      isAdmin: User.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const User = await user.findById(req.User._id);

  if (User) {
    User.name = req.body.name || User.name;
    User.email = req.body.email || User.email;

    if (req.body.password) {
      User.password = req.body.password;
    }
    const updatedUser = await User.save();
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//get all users
const getUsers = asyncHandler(async (req, res) => {
  const Users = await user.find({});
  res.json(Users);
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  const User = await user.findById(req.params.id);
  if (User) {
    await User.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//get user by id
const getUserbyId = asyncHandler(async (req, res) => {
  const User = await user.findById(req.params.id).select("-password"); //dont fetch the password
  if (User) {
    res.json(User);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//update user
const updateUser = asyncHandler(async (req, res) => {
  const User = await user.findById(req.params.id);

  if (User) {
    User.name = req.body.name || User.name;
    User.email = req.body.email || User.email;
    User.isAdmin = req.body.isAdmin;
    const updatedUser = await User.save();
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserbyId,
};
