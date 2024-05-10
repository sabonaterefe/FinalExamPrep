import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, TextField, Button, IconButton, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, ThemeProvider, createTheme, CssBaseline, GlobalStyles, styled } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Custom styles for buttons
const CustomButton = styled(Button)({
  background: '#4CAF50', // Green background
  color: 'white', // White text
  '&:hover': {
    background: '#45A049', // Dark green on hover
  },
});

// Custom styles for the "Forgot Password" button
const ForgotPasswordButton = styled(Button)({
  width: '100%',
  fontSize: '1rem', // Adjust font size as needed
  padding: '12px', // Increase padding for larger appearance
  marginTop: '10px', // Add margin for spacing
  background: '#1976d2', // Blue background
  color: 'white', // White text
  '&:hover': {
    background: '#1565c0', // Dark blue on hover
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#C6B2CE',
    },
    secondary: {
      main: '#99C4E0',
    },
    background: {
      default: '#f0f0f0',
    },
  },
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showIncorrectDialog, setShowIncorrectDialog] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log('Form submitted:', values);
      // Check username and password (dummy check for example)
      if (values.username.length === 8 && values.password.length === 8) {
        // Redirect to user's eXam Prep account
        window.location.href = '/exam-prep-account'; // Example redirection
      } else {
        // Show incorrect message dialogue
        setShowIncorrectDialog(true);
      }
    },
  });

  const handleCloseDialog = () => {
    setShowIncorrectDialog(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        body: {
          backgroundColor: theme.palette.background.default,
        },
      }} />
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 8 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 8 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton variant="contained" fullWidth type="submit">Login</CustomButton>
            </Grid>
            <Grid item xs={12}>
              {/* Styled "Forgot Password" button */}
              <ForgotPasswordButton color="inherit" variant="outlined" component={Link} to="/forgot-password">
                Forgot Password
              </ForgotPasswordButton>
            </Grid>
            <Grid item xs={12}>
              <Button color="inherit" variant="outlined" fullWidth>Sign Up</Button>
            </Grid>
          </Grid>
        </form>

        <Dialog open={showIncorrectDialog} onClose={handleCloseDialog}>
          <DialogTitle>Incorrect Credentials</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Please check your username and password and try again.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
