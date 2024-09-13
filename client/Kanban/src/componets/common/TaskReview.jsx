import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

export default function TaskReview({ open, setOpen, selectTask }) {
  const handleClose = () => setOpen(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectTask && (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: 1,
                }}
              >
                <Typography variant="subtitle1">
                  <strong>Title</strong>
                </Typography>
                <Typography variant="subtitle1">{selectTask.title}</Typography>

                <Typography variant="subtitle1">
                  <strong>Owner</strong>
                </Typography>
                <Typography variant="subtitle1">{selectTask.owner}</Typography>

                <Typography variant="subtitle1">
                  <strong>Target Date</strong>
                </Typography>
                <Typography variant="subtitle1">
                  {formatDate(selectTask.duration_date)}
                </Typography>

                <Typography variant="subtitle1">
                  <strong>Tag</strong>
                </Typography>
                <Typography variant="subtitle1">{selectTask.tag}</Typography>

                <Typography variant="subtitle1">
                  <strong>Description</strong>
                </Typography>
                <Typography variant="subtitle1">
                  {selectTask.description}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
