import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosAPI from "../../api";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
function Profile() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    phone: "",
    skills: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetch existing profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosAPI.get("/profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setFormData({
          bio: response.data.bio || "",
          profile_picture: response.data.profile_picture || null,
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          date_of_birth: response.data.date_of_birth || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          skills: response.data.skills || "",
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("date_of_birth", formData.date_of_birth);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("skills", formData.skills);

    try {
      const response = await axiosAPI.put("/profile/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      style={{
        witdth: "100%",
        textAlign: "center",
        height: "100vh",
        color: "white",
      }}
    >
      <Container maxWidth="75%" mt={1} sx={{ padding: "1%", width: "70%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Your Profile
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="First Name"
              name="first_name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.first_name}
              sx={{
                marginBottom: 2,
                backgroundColor: "#ffffff",
                borderRadius: 2,
              }}
              onChange={handleChange}
            />

            <TextField
              label="Last Name"
              name="last_name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.last_name}
              sx={{
                marginBottom: 2,
                backgroundColor: "#ffffff",
                borderRadius: 2,
              }}
              onChange={handleChange}
            />
            <TextField
              label="Date Of Birth"
              name="date_of_birth"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.date_of_birth}
              sx={{
                marginBottom: 2,
                backgroundColor: "#ffffff",
                borderRadius: 2,
              }}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={formData.email}
              sx={{
                marginBottom: 2,
                backgroundColor: "#ffffff",
                borderRadius: 2,
              }}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              name="phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.phone}
              sx={{
                marginBottom: 2,
                backgroundColor: "#ffffff",
                borderRadius: 2,
              }}
              onChange={handleChange}
            />
            <TextField
              label="Skills"
              name="skills"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.skills}
              sx={{
                marginBottom: 2,
                backgroundColor: "#ffffff",
                borderRadius: 2,
              }}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Save Profile
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default Profile;
