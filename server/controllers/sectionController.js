import Section from "../models/sectionModel.js";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

const getSections = async (req, res) => {
  try {
    const { userId } = req.params;
    const initialSections = [
      { title: "To Do", tasks: [], userId: userId },
      { title: "In Progress", tasks: [], userId: userId },
      { title: "Done", tasks: [], userId: userId },
    ];

    const sectionCount = await Section.countDocuments({ userId });
    if (sectionCount === 0) {
      const insertedSections = await Section.insertMany(initialSections);
      return res.status(201).json(insertedSections);
    }
    const sections = await Section.find({ userId });
    for (let section of sections) {
      const tasks = await Task.find({ section: section._id }).sort("-position");
      section._doc.tasks = tasks; 
    }
    const users=await User.find()
    return res.status(200).json({sections,users});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const createSection = async (req, res) => {
  try {
    const { title, user } = req.body;
    const section = await Section.create({
      userId: user.id,
      title: title,
      tasks: [],
    });
    section._doc.tasks = [];
    return res.status(201).json(section);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteSection = async (req, res) => {
  const { sectionId } = req.params;
  try {
    await Task.deleteMany({ section: sectionId });
    await Section.deleteOne({ _id: sectionId });
    res.status(200).json("deleted");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const editSection = async (req, res) => {
  try {
    const { _id, title } = req.body;
    if (!_id || !title) {
      return res.status(400).json({ message: "Section ID and title are required." });
    }

    const updateSection = await Section.findByIdAndUpdate(
      _id,
      { $set: { title } },
      { new: true } 
    );

    if (!updateSection) {
      return res.status(404).json({ message: "Section not found." });
    }

    res.status(200).json({ message: "Section updated successfully!", section: updateSection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update section." });
  }
};


export { createSection, getSections, deleteSection,editSection };
