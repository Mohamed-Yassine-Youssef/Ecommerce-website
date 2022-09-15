import express from "express";
const router = express.Router();

import {
  authUser,
  deleteUser,
  getUserbyId,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { admin, protect } from "../middleware/authMiddleWare.js";
router.post("/", registerUser);
router.get("/getUsers", protect, admin, getUsers);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/:id", protect, admin, deleteUser);
router.get("/:id", protect, admin, getUserbyId);
router.put("/:id", protect, admin, updateUser);
export default router;
