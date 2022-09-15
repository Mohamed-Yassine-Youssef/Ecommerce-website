import express from "express";
const router = express.Router();
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleWare.js";
router.get("/top", getTopProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", protect, admin, deleteProduct);
router.put("/:id", protect, admin, updateProduct);
router.post("/", protect, admin, createProduct);
router.post("/:id/reviews", protect, createProductReview);

export default router;
