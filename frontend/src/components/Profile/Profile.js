import React, { useState, useEffect, useContext } from "react";
import axiosAPI from "../../api";
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
function Profile() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    phone: "",
    skills: "",
  });


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
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          date_of_birth: response.data.date_of_birth || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          skills: response.data.skills || "",
        });
        
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [])

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
      setEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  const handleUserData = () => {
    setLoggedInUser({
      username: loggedInUser.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      skills: formData.skills,
    });
    navigate("/home");
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const skillsArray = formData.skills.split(',').map(skill => skill.trim());

  
  


  return (
    <div
      style={{
        witdth: "100%",
        textAlign: "center",
        height: "100vh",
        color: "white",
      }}
    >
      {edit ? (
        <Container mt={1} sx={{ padding: "1%", width: "70%" }}>
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
                  marginBottom: 1,
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
                  marginBottom: 1,
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
                  marginBottom: 1,
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
                  marginBottom: 1,
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
                  marginBottom: 1,
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
                  marginBottom: 1,
                  backgroundColor: "#ffffff",
                  borderRadius: 2,
                }}
                onChange={handleChange}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Save Profile
              </Button>
            </form>
          </Box>
        </Container>
      ) : (
        <Container mt={1} sx={{ padding: "1%", width: "70%" }}>
          <TableContainer
            component={Paper}
            sx={{ maxWidth: "100%", margin: "auto", padding: 2 }}
          >
            <Table aria-label="user profile">
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: 20 }}
                  >
                    Your Profile
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* First Name */}
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    First Name
                  </TableCell>
                  <TableCell>{formData.first_name}</TableCell>
                </TableRow>

                {/* Last Name */}
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    Last Name
                  </TableCell>
                  <TableCell>{formData.last_name}</TableCell>
                </TableRow>

                {/* Date of Birth */}
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    Date of Birth
                  </TableCell>
                  <TableCell>{formData.date_of_birth}</TableCell>
                </TableRow>

                {/* Email */}
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    Email
                  </TableCell>
                  <TableCell>{formData.email}</TableCell>
                </TableRow>

                {/* Phone */}
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    Phone
                  </TableCell>
                  <TableCell>{formData.phone}</TableCell>
                </TableRow>

                {/* Skills */}
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    Skills
                  </TableCell>
                  <TableCell>
                    {skillsArray.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        variant="outlined"
                        color="primary"
                        sx={{ marginRight: 1 }}
                      />
                    ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={handleUserData} sx={{ margin: "10px" }} >
            Get Recommendation
          </Button>
          <Button variant="contained" color="primary" onClick={handleEdit} sx={{ margin: "10px" }} >
            Edit Profile
          </Button>
        </Container>
      )}
    </div>
  );
}

export default Profile;
