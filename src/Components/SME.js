import React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Container } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must be only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .required('Phone number is required'),
  expertise: Yup.string().required('Area of Expertise is required'),
});

const SME = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      expertise: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
      // Assuming a function to handle SME registration API call
      // registerSME(values);
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: '#f4f6f8',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginTop: '2rem',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#333', marginBottom: '1rem' }}>
        Subject matter registration
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="expertise-label" sx={{ backgroundColor: '#fff', paddingRight: '4px' }}>Area of Expertise</InputLabel>
          <Select
            labelId="expertise-label"
            id="expertise"
            name="expertise"
            value={formik.values.expertise}
            onChange={formik.handleChange}
            label="Area of Expertise"
            error={formik.touched.expertise && Boolean(formik.errors.expertise)}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Physics expert">Physics expert</MenuItem>
            <MenuItem value="Maths expert">Maths expert</MenuItem>
            <MenuItem value="English">English expert</MenuItem>
            <MenuItem value="Aptitude">Aptitude expert</MenuItem>
            <MenuItem value="Chemistry">Chemistry expert</MenuItem>
            <MenuItem value="Biology">Biology expert</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            marginTop: '1rem',
            padding: '0.75rem',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default SME;
