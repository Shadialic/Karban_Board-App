import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { createTask, EditTask } from "../../api/TaskApis";
import toast, { Toaster } from "react-hot-toast";

function TaskModal({
  data,
  setData,
  selectedSection,
  openTaskDialog,
  setOpenTaskDialog,
  editTask,
  selectTask,
  fetchSections,
  handleClose,
}) {
  const [task, setTask] = useState({
    taskTitle: "",
    description: "",
  });
  useEffect(() => {
    if (editTask && selectTask) {
      setTask({
        taskTitle: selectTask.title,
        description: selectTask.description,
      });
    } else {
      setTask({
        taskTitle: "",
        description: "",
      });
    }
  }, [editTask, selectTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const EditTaskToSection = async () => {
    if (task.taskTitle.trim() === "") {
      toast.error("Task title can't be empty!");
      return;
    } else if (task.description.trim() === "") {
      toast.error("Description can't be empty!");
      return;
    }

    try {
      if (!selectTask || !selectTask.id) {
        toast.error("Task not selected!");
        return;
      }
      const response = await EditTask({ ...task, id: selectTask.id });
      if (response) {
        fetchSections();
        setOpenTaskDialog(false);
        handleClose();
        toast.success("Task edited successfully!");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task!");
    }
  };

  const addTaskToSection = async () => {
    if (task.taskTitle.trim() === "") {
      toast.error("Task title can't be empty!");
      return;
    } else if (task.description.trim() === "") {
      toast.error("Description can't be empty!");
      return;
    }

    try {
      const response = await createTask(task, selectedSection.id);
      if (response) {
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
      } else {
        toast.error("Failed to add task!");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Error adding task!");
    }
  };

  return (
    <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
      <DialogTitle>{editTask ? "Edit Task" : "Add Task"}</DialogTitle>
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
        {editTask ? (
          <Button style={{ color: "#000000" }} onClick={EditTaskToSection}>
            Edit Task
          </Button>
        ) : (
          <Button style={{ color: "#000000" }} onClick={addTaskToSection}>
            Add Task
          </Button>
        )}
      </DialogActions>
      <Toaster />
    </Dialog>
  );
}

export default TaskModal;
