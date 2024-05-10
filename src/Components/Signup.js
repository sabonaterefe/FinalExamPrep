import React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const Signup = () => {
  const handleRoleChange = (e) => {
    const role = e.target.value;
    if (role === 'subject-matter-expert') {
      window.location.href = '/subject-matter-expert-registration';
    } else if (role === 'student') {
      window.location.href = '/student-registration';
    } else if (role === 'admin') {
      window.location.href = '/admin-registration';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #9E4D5F 30%, #924F2B 90%)',
        }}
      >
        <FormControl
          style={{
            width: '300px',
            textAlign: 'center',
            padding: '2rem',
            borderRadius: '8px',
            background: '#BEA9A9',
            boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h4" gutterBottom>
          What defines you?
          </Typography>
          <FormControl style={{ marginTop: '2rem', width: '100%' }}>
            <InputLabel id="role-label"></InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              onChange={handleRoleChange}
              defaultValue="student"
            >
              <MenuItem value="subject-matter-expert">Subject Matter Expert</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleRoleChange} fullWidth style={{ marginTop: '2rem' }}>
            Sign Up
          </Button>
        </FormControl>
      </div>
    </ThemeProvider>
  );
};

export default Signup;
