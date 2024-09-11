import { InfinitySpin } from "react-loader-spinner";
import { Box } from "@mui/material";

export function Loading() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <InfinitySpin color="#000000" />
    </Box>
  );
}