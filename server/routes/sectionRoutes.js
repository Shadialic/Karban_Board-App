import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createSection,
  deleteSection,
  getSections,
  editSection,
} from "../controllers/sectionController.js";

const router = Router();

router.get("/:userId", authMiddleware, getSections);
router.post("/", authMiddleware, createSection);
router.put("/edit-section", authMiddleware, editSection);
router.delete("/:sectionId", authMiddleware, deleteSection);

export default router;
