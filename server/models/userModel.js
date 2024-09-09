import mongoose from "mongoose";
import { schemaOptions } from "./modelOptions.js";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  schemaOptions
);

const User = mongoose.model("User", userSchema);
export default User;
