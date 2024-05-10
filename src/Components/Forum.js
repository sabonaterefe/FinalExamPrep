import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';

// Define the custom theme using createTheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#C6B2CE',
    },
    secondary: {
      main: '#99C4E0',
    },
    background: {
      default: '#E0D4D4',
    },
  },
});

const Forum = () => {
  const [categories, setCategories] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // Fetch forum categories and discussions
    // Example:
    const fetchedCategories = ['General', 'Technical', 'Q&A'];
    const fetchedDiscussions = [
      { id: 1, category: 'General', topic: 'Welcome to the Forum', author: 'Admin', responses: 10 },
      { id: 2, category: 'Technical', topic: 'React Hooks Query', author: 'UserA', responses: 5 },
      // Other discussions...
    ];
    setCategories(fetchedCategories);
    setDiscussions(fetchedDiscussions);
  }, []);

  const handlePostSubmit = () => {
    // Handle posting a new question/topic
    // Example:
    console.log('Posting:', newPost);
    // Clear the input field after posting
    setNewPost('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply global styles from Material-UI */}
      <GlobalStyles styles={{ // Apply global styles
        body: {
          backgroundColor: '#74451A' // Use theme's background color
        },
      }} />
      <Container maxWidth="md" style={{ minHeight: '100vh' }}>
        <Typography variant="h4" style={{ color: '#D9CCDD', marginBottom: '20px' }}>Welcome to the Forum</Typography>
        
        {/* Display Forum Categories */}
        <List>
          {categories.map((category, index) => (
            <ListItem button key={index} onClick={() => console.log('Category:', category)}>
              <ListItemText primary={<Typography variant="subtitle1" style={{ color: '#BACCD8' }}>{category}</Typography>} />
            </ListItem>
          ))}
        </List>
        
        {/* Display Discussions */}
        {discussions.map((discussion) => (
          <div key={discussion.id} style={{ marginBottom: '20px' }}>
            <Typography variant="h6" style={{ color: '#BFD5E4' }}>{discussion.topic}</Typography>
            <Typography variant="subtitle2" style={{ color: '#D3DAE6' }}>Category: {discussion.category}</Typography>
            <Typography variant="body2" style={{ color: '#333333' }}>Author: {discussion.author}</Typography>
            <Typography variant="body2" style={{ color: '#333333' }}>Responses: {discussion.responses}</Typography>
          </div>
        ))}
        
        {/* Post Question/Topic Form */}
        <TextField
          label="Post a Question or Topic"
          multiline
          rows={4}
          variant="outlined"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          style={{ backgroundColor: 'white', marginBottom: '16px', width: '100%' }}
        />
        <Button variant="contained" color="primary" onClick={handlePostSubmit}>Post</Button>
      </Container>
    </ThemeProvider>
  );
};

export default Forum;
