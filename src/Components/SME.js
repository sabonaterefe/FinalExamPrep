import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, Typography, Grid, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './Styling/SME.css'
import questions from './questions.json';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        {currentIndex < questions.length ? (
          <div>
            <Typography variant="h4" gutterBottom>
              {questions[currentIndex].question}
            </Typography>
            <Grid container spacing={2}>
              {questions[currentIndex].answers.map((answer, index) => (
                <Grid item xs={12} key={index}>
                  <Button
                    variant={selectedAnswer === answer ? 'contained' : 'outlined'}
                    color={selectedAnswer === answer ? 'primary' : 'secondary'}
                    onClick={() => handleAnswerSelect(answer)}
                    fullWidth
                  >
                    {answer}
                  </Button>
                </Grid>
              ))}
            </Grid>
            {selectedAnswer && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextQuestion}
                style={{ marginTop: '16px' }}
              >
                Next Question
              </Button>
            )}
          </div>
        ) : (
          <div>
            <Typography variant="h4" gutterBottom>
              Game Over
            </Typography>
            <Typography variant="h6">
              Your score: {score}/{questions.length}
            </Typography>
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;