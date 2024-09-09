import mongoose from "mongoose";
import { schemaOptions } from "./modelOptions.js";

const taskSchema = new mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    position: {
      type: Number,
    },
  },
  schemaOptions
);
const Task = mongoose.model("Task", taskSchema);
export default Task;
