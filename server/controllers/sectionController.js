import Section from "../models/sectionModel.js";
import Task from "../models/taskModel.js";

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
    return res.status(200).json(sections);
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

export { createSection, getSections, deleteSection };
