import React, { useState } from "react";
import { Box, Typography, Button, TextField, Divider } from "@mui/material";
import Loop from "../assets/loop.mp4";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { setUserDetails } from "../redux/Slices/UserSlice";
import {  RegisterUser } from "../api/AuthApis";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const validate = () => {
    let tempErrors = {};
    if (!formData.userName) {
      tempErrors.userName = "userName is required";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await RegisterUser(formData);
        if (response.stauts) {
          dispatch(
            setUserDetails({
              id: response.user._id,
              UserName: response.user.UserName,
              role: "user",
            })
          );
          handleClear();
          navigate("/login");
        } else {
          toast.error(response.message);
        }
      } catch (err) {
        console.error("Submission error:", err);
      }
    }
  };
  const handleClear = () => {
    setFormData({
      userName: "",
      password: "",
    });
    setErrors({});
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      height="100vh"
    >
      <Box
        width={{ xs: "100%", sm: "100%", md: "35%" }}
        height="100%"
        textAlign="left"
      >
        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            fontWeight: "bold",
            p: 2,
            color: "white",
            fontSize: "2rem",
          }}
        >
          Sketchmonk
        </Typography>
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <video
            src={Loop}
            loop
            autoPlay
            muted
            style={{ height: "100vh", objectFit: "cover", width: "100%" }}
          />
        </Box>
      </Box>
      <Box
        width={{ xs: "100%", sm: "100%", md: "50%" }}
        mt={{ sm: 8, md: 10 }}
        mb={{ xs: 10, sm: 12 }}
        mr={{ sm: 20 }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Divider sx={{ width: "25%" }} />
            <Typography variant="subtitle1" sx={{ mx: 2, color: "gray" }}>
              Register
            </Typography>
            <Divider sx={{ width: "25%" }} />
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            width="100%"
            mx={{ sm: 0 }}
          >
            <Button
              variant="outlined"
              onClick={handleClear}
              sx={{ borderRadius: "50px", mx: { xs: 6, sm: 14, md: 14 } }}
            >
              Clear
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            maxWidth={400}
            mx="auto"
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              UserName
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="userName"
              placeholder="userName"
              value={formData.userName}
              onChange={handleOnChange}
              sx={{ mb: 2 }}
              error={!!errors.userName}
              helperText={errors.userName}
            />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Password
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleOnChange}
              sx={{ mb: 2 }}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ borderRadius: "50px", maxWidth: 400, mx: "auto", py: 1 }}
          >
            SIGN Up
          </Button>
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            You dont have an account?{" "}
            <Button
              variant="text"
              onClick={handleClick}
              sx={{ textDecoration: "underline" }}
            >
              Sign In
            </Button>
          </Typography>
        </Box>
      </Box>
      <Toaster />
    </Box>
  );
}

export default SignUp;
