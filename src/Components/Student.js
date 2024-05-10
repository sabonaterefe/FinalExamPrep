import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, Typography, Grid, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './Styling/Student.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#9b59b6',
    },
    secondary: {
      main: '#2980b9',
    },
    background: {
      default: '#f2f2f2',
    },
  },
});

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    grade: '',
  });

  const gradeOptions = [
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStudentRegistration = (event) => {
    event.preventDefault();
    console.log('Student Registration:', formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className="student-registration-container">
        <Paper className="student-registration-paper">
          <Typography variant="h4" gutterBottom align="center" className="student-registration-title">
            Student Registration
          </Typography>
          <form onSubmit={handleStudentRegistration} className="student-registration-form">
            <Grid container spacing={3} className="student-registration-grid">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  className="student-registration-input"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  className="student-registration-input"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  type="email"
                  className="student-registration-input"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  className="student-registration-input"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  className="student-registration-input"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  className="student-registration-input"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className="student-registration-input">
                  <InputLabel id="grade-label">Grade</InputLabel>
                  <Select
                    labelId="grade-label"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="">Select a grade</MenuItem>
                    {gradeOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth className="student-registration-button">
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default StudentRegistration;