import express from "express";
import {
  getComment,
  createComment,
  updateComment,
  deleteComent,
} from "../controller/ReviewProduct.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/products/review/:id",verifyUser , getComment)
router.post("/products/review/:id",verifyUser, createComment);
router.patch("/products/review/:id", verifyUser, updateComment);
router.delete("/products/review/:id", verifyUser, deleteComent);

export default router;
