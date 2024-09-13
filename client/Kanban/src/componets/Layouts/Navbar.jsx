import { Box, Button } from "@mui/material";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import share from "../../assets/share-symbol.png";
import SettingsIcon from "@mui/icons-material/Settings";
import AppleIcon from "@mui/icons-material/Apple";
import Date_Time from "../common/Date_Time";
function Navbar() {
  const buttonStyle = {
    borderColor: "#dee2e6",
    color: "#adb5bd",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
    fontSize: "1rem",
    padding: "6px",
    borderRadius: "0.7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "auto",
    height: "auto",
    paddingLeft: "10px",
    paddingRight: "10px",
  };

  return (
    <Box
      position="absolute"
      left="0px"
      top="0px"
      display="flex"
      flexDirection="row"
      p={4}
      alignItems="center"
      gap={2}
      width="100%"
    >
      <div className="flex gap-2 flex-grow">
        <Button variant="outlined" sx={buttonStyle}>
          <KeyboardBackspaceSharpIcon />
        </Button>
        <div className="bg-black px-3 flex justify-center items-center rounded-xl  ml-2">
          <AppleIcon className="text-[#fff]" />
        </div>

        <div className="flex flex-col">
          <h1>
            <strong>Apple</strong>
          </h1>
          <h1 className="text-[#adb5bd] text-[12px]">5 boards 24 members</h1>
        </div>
      </div>

      <div className="flex gap-2 items-center ml-auto">
        <Date_Time />
        <div className="relative flex items-center">
          <svg
            className="w-4 h-4 text-gray-500 absolute left-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <input
            type="search"
            className="block w-full pl-10 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
            placeholder="Search"
          />
        </div>
        <Button variant="outlined" sx={buttonStyle}>
          <img className="w-6" src={share} alt="" />
        </Button>
        <Button variant="outlined" sx={buttonStyle}>
          <SettingsIcon />
        </Button>
      </div>
    </Box>
  );
}

export default Navbar;
