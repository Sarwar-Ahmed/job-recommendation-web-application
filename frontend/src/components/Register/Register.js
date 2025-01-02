import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axiosAPI from '../../api';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Register() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
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
      const response = await axiosAPI.post('/register/', formData);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert("Error: " + error.response.data);
    }
  };
  
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
            Register
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
              required
            />
            <TextField
              label="First Name"
              name="first_name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.first_name}
              sx={{ marginBottom: 2, backgroundColor: '#ffffff', borderRadius: 2 }}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              name="last_name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.last_name}
              sx={{ marginBottom: 2, backgroundColor: '#ffffff', borderRadius: 2 }}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={formData.email}
              sx={{ marginBottom: 2, backgroundColor: '#ffffff', borderRadius: 2 }}
              onChange={handleChange}
              required
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
              required
            />
            
            <Button 
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
            Already have an Account? <Link style={{textDecoration: "none", color: '#1565C0'}} to="/login">Login</Link>
          </form>
        </Box>
      </Container>
    </div>
  )
}

export default Register