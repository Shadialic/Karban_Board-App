import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { createTask } from "../../api/TaskApis";
import toast, { Toaster } from "react-hot-toast";

function TaskModal({
  data,
  setData,
  selectedSection,
  openTaskDialog,
  setOpenTaskDialog,
}) {
  const [task, setTask] = useState({
    taskTitle: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const addTaskToSection = async () => {
    if (task.taskTitle.trim() === "") {
      toast.error("Task title can't be empty!");
      return;
    } else if (task.description.trim() === "") {
      toast.error("Description can't be empty!");
      return;
    } else {
      const response = await createTask(task, selectedSection.id);
      const newData = [...data];
      const index = newData.findIndex((e) => e.id === selectedSection.id);
      newData[index].tasks.unshift(response);
      setData(newData);

      setTask({
        taskTitle: "",
        description: "",
      });
      setOpenTaskDialog(false);
      toast.success("Task added successfully!");
    }
  };
  return (
    <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="taskTitle"
          label="Task Title"
          fullWidth
          variant="outlined"
          name="taskTitle"
          value={task.taskTitle}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          fullWidth
          variant="outlined"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          style={{ color: "#000000" }}
          onClick={() => setOpenTaskDialog(false)}
        >
          Cancel
        </Button>
        <Button style={{ color: "#000000" }} onClick={addTaskToSection}>
          Add Task
        </Button>
      </DialogActions>
      <Toaster />
    </Dialog>
  );
}

export default TaskModal;
