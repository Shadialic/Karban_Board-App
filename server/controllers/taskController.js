import Section from "../models/sectionModel.js";
import Task from "../models/taskModel.js";

const taskCreate = async (req, res) => {
  const { sectionId } = req.params;
  const { taskTitle, description } = req.body;
  try {
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    const tasksCount = await Task.find({ section: sectionId }).countDocuments();
    const task = new Task({
      section: sectionId,
      title: taskTitle,
      description: description,
      position: tasksCount,
    });
    await task.save();
    task._doc.section = section;
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const currentTask = await Task.findById(taskId);
    await Task.deleteOne({ _id: taskId });
    const tasks = await Task.find({ section: currentTask.section }).sort(
      "postition"
    );
    for (const key in tasks) {
      await Task.findByIdAndUpdate(tasks[key].id, { $set: { position: key } });
    }
    res.status(200).json("deleted");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updatePosition = async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceSectionId,
    destinationSectionId,
  } = req.body;

  const resourceListReverse = resourceList.reverse();
  const destinationListReverse = destinationList.reverse();
  try {
    if (resourceSectionId !== destinationSectionId) {
      for (const key in resourceListReverse) {
        await Task.findByIdAndUpdate(resourceListReverse[key].id, {
          $set: {
            section: resourceSectionId,
            position: key,
          },
        });
      }
    }
    for (const key in destinationListReverse) {
      await Task.findByIdAndUpdate(destinationListReverse[key].id, {
        $set: {
          section: destinationSectionId,
          position: key,
        },
      });
    }
    res.status(200).json("updated");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const editTask = async (req, res) => {
  try {
    console.log(req.body, "req.body");

    const { id, taskTitle, description } = req.body;

    if (!id || !taskTitle || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        $set: {
          title: taskTitle,
          description: description,
        },
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    console.log(updatedTask, "updatedTask");

    return res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export { taskCreate, deleteTask, updatePosition, editTask };
