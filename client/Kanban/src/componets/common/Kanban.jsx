import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button, TextField, Menu, MenuItem, Avatar } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { create, deleteSection, getSections } from "../../api/SectionApis";
import toast, { Toaster } from "react-hot-toast";
import { deleteTask, updatePosition } from "../../api/TaskApis";
import apple from "../../assets/apple.png";
import RenderDate from "./RenderDate";
import { useSelector } from "react-redux";
import TaskModal from "./TaskModal";

function Kanban() {
  const user = useSelector((state) => state.user.userInfo);
  const [data, setData] = useState([]);
  const [addSection, setAddSection] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [selectTask, setSelectTask] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);

  const toggleAddSection = () => {
    setAddSection(!addSection);
  };

  const createSection = async () => {
    try {
      if (sectionTitle.trim() === "") {
        toast.error("Section title can't be empty!");
        return;
      }
      const response = await create({ title: sectionTitle, user });
      setData((prevData) => [...prevData, { ...response, tasks: [] }]);
      setSectionTitle("");
      setAddSection(false);
      toast.success("Section added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add section.");
    }
  };

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await getSections(user.id);
        setData(response.map((section) => ({ ...section })));
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch sections.");
      }
    };
    fetchSections();
  }, [data]);

  const handleClick = (event, section) => {
    setAnchorEl(event.currentTarget);
    setSelectedSection(section);
  };
  const handleTask = async (e, task) => {
    setSelectTask(task);
    setAnchorE2(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorE2(null);
  };
  const handleTaskDelete = async () => {
    try {
      if (!selectTask) {
        toast.error("No task selected for deletion.");
        return;
      }
      await deleteTask(selectTask.id);
      setData((prevData) =>
        prevData.map((section) =>
          section.id === selectTask.sectionId
            ? {
                ...section,
                tasks: section.tasks.filter(
                  (task) => task.id !== selectTask.id
                ),
              }
            : section
        )
      );

      setSelectTask(null);
      handleClose();
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSection(selectedSection.id);
      setData((prevData) =>
        prevData.filter((item) => item.id !== selectedSection.id)
      );
      toast.success("Section deleted successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete section.");
    }
    handleClose();
  };

  const openAddTaskDialog = (section) => {
    setSelectedSection(section);
    setOpenTaskDialog(true);
  };

  const onDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const sourceSectionIndex = data.findIndex(
      (section) => section.id === source.droppableId
    );
    const destinationSectionIndex = data.findIndex(
      (section) => section.id === destination.droppableId
    );
    const sourceTasks = [...data[sourceSectionIndex].tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);
    if (sourceSectionIndex === destinationSectionIndex) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const newData = [...data];
      newData[sourceSectionIndex].tasks = sourceTasks;
      setData(newData);
    } else {
      const destinationTasks = [...data[destinationSectionIndex].tasks];
      destinationTasks.splice(destination.index, 0, movedTask);
      const newData = [...data];
      newData[sourceSectionIndex].tasks = sourceTasks;
      newData[destinationSectionIndex].tasks = destinationTasks;
      setData(newData);
    }

    try {
      await updatePosition({
        resourceList: sourceTasks,
        destinationList:
          destinationSectionIndex === sourceSectionIndex
            ? sourceTasks
            : data[destinationSectionIndex].tasks,
        resourceSectionId: data[sourceSectionIndex].id,
        destinationSectionId: data[destinationSectionIndex].id,
      });
      toast.success("Task position updated successfully!");
    } catch (error) {
      toast.error("Failed to update task position.");
      console.error(error);
    }
  };

  return (
    <div className="relative top-20 left-0 p-6 flex overflow-x-auto space-x-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className="flex flex-row overflow-x-auto"
          style={{ width: "100%" }}
        >
          {data &&
            data.map((section, index) => (
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col justify-start w-[270px] h-[100vh] p-2 rounded-lg flex-shrink-0"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h1>
                        <strong>{section.title}</strong>
                      </h1>
                      <div className="flex gap-2">
                        <AddIcon
                          className="text-[#adb5bd] cursor-pointer"
                          onClick={() => openAddTaskDialog(section)}
                        />
                        <MoreHorizIcon
                          className="text-[#adb5bd] cursor-pointer"
                          onClick={(e) => handleClick(e, section)}
                        />
                      </div>
                    </div>

                    <div className="w-full h-full bg-[#f8f9fa] flex flex-col justify-start items-center p-2 rounded-lg">
                      {section.tasks &&
                        section.tasks.map((task, idx) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id.toString()}
                            index={idx}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white w-full mb-2 rounded-lg shadow-md shadow-[#f8f9fa] p-3 ${
                                  snapshot.isDragging ? "bg-[#e0e0e0]" : ""
                                }`}
                              >
                                <div className="flex justify-between">
                                  {task.title}

                                  <MoreHorizIcon
                                    className="text-[#adb5bd]  cursor-pointer text-justify"
                                    onClick={(e) => handleTask(e, task)}
                                  />
                                </div>

                                <div className="flex items-center justify-between text-[13px] text-[#adb5bd] mt-2">
                                  <div className="flex items-center space-x-2">
                                    <Avatar
                                      alt="Remy Sharp"
                                      src={apple}
                                      sx={{ width: 26, height: 26 }}
                                    />
                                    <span>
                                      <RenderDate updatedAt={task.updatedAt} />
                                    </span>
                                  </div>

                                  <h1 className="bg-[#f8f9fa] p-1 rounded-md text-center inline-block">
                                    {task.description}
                                  </h1>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}

                      <Button
                        sx={{
                          textTransform: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                        onClick={() => openAddTaskDialog(section)}
                      >
                        <AddIcon className="text-[#adb5bd] text-[10px]" />
                        <span className="text-[#adb5bd] text-[12px]">
                          Add task
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
              </Droppable>
            ))}

          <div className="flex flex-col justify-start w-[300px] h-[100vh] p-2 rounded-lg flex-shrink-0">
            {addSection ? (
              <>
                <div className="flex items-center gap-2 mb-4 w-[200px]">
                  <TextField
                    value={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                    placeholder="Untitled"
                    variant="outlined"
                    sx={{
                      width: "90px",
                      flexGrow: 1,
                      "& .MuiOutlinedInput-input": { padding: "4px" },
                      "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "1rem",
                        fontWeight: "700",
                      },
                    }}
                  />
                  <AddIcon
                    className="text-[#b9c1c9] cursor-pointer"
                    onClick={createSection}
                  />
                </div>
              </>
            ) : (
              <div
                onClick={toggleAddSection}
                className="flex mb-4 cursor-pointer"
              >
                <AddIcon className="text-[#adb5bd]" />
                <h1 className="text-[#adb5bd]">
                  <strong>Add Section</strong>
                </h1>
              </div>
            )}
          </div>
        </div>
      </DragDropContext>
      <TaskModal
        data={data}
        setData={setData}
        selectedSection={selectedSection}
        openTaskDialog={openTaskDialog}
        setOpenTaskDialog={setOpenTaskDialog}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <Menu anchorEl={anchorE2} open={Boolean(anchorE2)} onClose={handleClose}>
        <MenuItem onClick={handleTaskDelete}>Delete</MenuItem>
      </Menu>
      <Toaster />
    </div>
  );
}

export default Kanban;
