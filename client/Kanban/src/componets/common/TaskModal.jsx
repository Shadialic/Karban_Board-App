import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { createTask, EditTask } from "../../api/TaskApis";
import toast, { Toaster } from "react-hot-toast";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";

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
  owners,
}) {
  const [task, setTask] = useState({
    taskTitle: "",
    description: "",
    tag: "",
    duration_date: null,
    owner: "",
  });
  console.log(selectTask, "selectTask");

  useEffect(() => {
    if (editTask && selectTask) {
      setTask({
        taskTitle: selectTask.title,
        description: selectTask.description,
        tag: selectTask.tag || "",
        owner: selectTask.owner || "",
        duration_date: selectTask.duration_date
          ? dayjs(selectTask.duration_date)
          : null,
      });
    } else {
      setTask({
        taskTitle: "",
        description: "",
        tag: "",
        duration_date: null,
        owner: "",
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

  const handleOwnerChange = (e) => {
    setTask((prevTask) => ({
      ...prevTask,
      owner: e.target.value,
    }));
  };

  const handleDateChange = (newValue) => {
    setTask((prevTask) => ({
      ...prevTask,
      duration_date: newValue,
    }));
  };

  const validateTask = () => {
    if (task.taskTitle.trim() === "") {
      toast.error("Task title can't be empty!");
      return false;
    }
    if (task.owner.trim() === "") {
      toast.error("owner can't be empty!");
      return false;
    }
    if (task.description.trim() === "") {
      toast.error("Description can't be empty!");
      return false;
    }
    if (task.tag.trim() === "") {
      toast.error("Tag can't be empty!");
      return false;
    }
    if (!task.duration_date) {
      toast.error("Duration date can't be empty!");
      return false;
    }
    return true;
  };

  const EditTaskToSection = async () => {
    if (!validateTask()) return;

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
    if (!validateTask()) return;

    try {
      const response = await createTask({ ...task }, selectedSection.id);
      if (response) {
        const newData = [...data];
        const index = newData.findIndex((e) => e.id === selectedSection.id);
        newData[index].tasks.unshift(response);
        setData(newData);
        setTask({
          taskTitle: "",
          description: "",
          tag: "",
          duration_date: null,
          owner: "",
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
        <div className="flex gap-2 items-center">
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
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="owner-label">Add work owner</InputLabel>
            <Select
              labelId="owner-label"
              id="owner"
              value={task.owner}
              onChange={handleOwnerChange}
              input={<OutlinedInput label="Add work owner" />}
            >
              {owners.map((item) => (
                <MenuItem key={item.id} value={item.userName}>
                  {item.userName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="flex gap-2 items-center">
          <TextField
            margin="dense"
            id="tag"
            label="Tag"
            variant="outlined"
            name="tag"
            value={task.tag}
            onChange={handleChange}
            style={{ flex: 1 }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={task.duration_date}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} margin="dense" style={{ flex: 1,backgroundColor:"black" }} />
              )}
            />
          </LocalizationProvider>
        </div>

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
