
import mongoose from "mongoose";
import { schemaOptions } from "./modelOptions.js";

const sectionSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
    default: ''
  }
},schemaOptions)

const Section = mongoose.model("Section", sectionSchema);
export default Section;
