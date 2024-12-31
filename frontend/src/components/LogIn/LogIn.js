import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import axiosAPI from '../../api';
import { UserContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';


function LogIn() {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState({
    username: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosAPI.post("/login/", formData);
      localStorage.setItem("access_token", response.data.access); // Store the token

      setUser({
        username: formData.username,
      });

      alert("Login Successful");
      
      
      navigate("/home");
    } catch (error) {
      alert("Error: " + error.response.data.error);
    }
  };
  setLoggedInUser(user);
  
  return (
    <div style={{witdth: "100%", textAlign: "center", height: "100vh"}}>
      <Container maxWidth="xs" mt={4} sx={{ padding: '5%'}}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            border: '1px solid #ddd',
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Login
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="User Name"
              name="username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username}
              sx={{ marginBottom: 2, backgroundColor: '#ffffff', borderRadius: 2 }}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={formData.password}
              sx={{ marginBottom: 2, backgroundColor: '#ffffff', borderRadius: 2 }}
              onChange={handleChange}
            />
            <Button 
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Log In
            </Button>
            Create an Account? <Link style={{textDecoration: "none", color: '#1565C0'}} to="/register">Register</Link>
          </form>
        </Box>
      </Container>
    </div>
  )
}

export default LogIn