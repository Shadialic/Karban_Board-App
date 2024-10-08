import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  deleteTask,
  taskCreate,
  updatePosition,
  editTask
} from "../controllers/taskController.js";
const router = Router();

router.post("/:sectionId", authMiddleware, taskCreate);
router.put("/update-position", authMiddleware, updatePosition);
router.put("/edit-task", authMiddleware, editTask);

router.delete("/:taskId", authMiddleware, deleteTask);

export default router;
