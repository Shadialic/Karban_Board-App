import mongoose from "mongoose";
import { schemaOptions } from "./modelOptions.js";

const taskSchema = new mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    owner:{
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      default: "",
    },
    duration_date: {
      type: Number,
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
