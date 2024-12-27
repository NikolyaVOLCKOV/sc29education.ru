import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) throw new Error("Registration failed");

      alert("Registration successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "300px" }}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          margin="normal"
          value={formData.fullName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
