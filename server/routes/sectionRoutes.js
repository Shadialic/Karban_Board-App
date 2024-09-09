import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  create,
  deleteSection,
  getSections,
} from "../controllers/sectionController.js";

const router = Router();

router.get("/:userId", authMiddleware, getSections);
router.post("/", authMiddleware, create);
router.delete("/:sectionId", authMiddleware, deleteSection);

export default router;
