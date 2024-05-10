import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Button, Grid, Paper, CircularProgress, Typography } from '@mui/material';
import './Styling/Quiz.css'
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
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [timeProgress, setTimeProgress] = useState(100); // Initial progress is 100%
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const startTimer = () => {
      const start = Date.now();
      setStartTime(start);
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            setGameFinished(true);
            setEndTime(Date.now()); // Set the end time
            return 0;
          }
          setTimeProgress(Math.floor((prevTime / 900) * 100));
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    };

    startTimer();
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
    setShowCorrectAnswer(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setCurrentIndex(currentIndex + 1);
    if (currentIndex === questions.length - 1) {
      setGameFinished(true);
      setEndTime(Date.now()); // Set the end time
    } else {
      setTimeRemaining(900); // Reset the timer for the next question
      setTimeProgress(100); // Reset the progress to 100%
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        {!gameFinished ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4">{questions[currentIndex].question}</Typography>
              <div style={{ marginLeft: '16px' }}>
                <CircularProgress variant="determinate" value={timeProgress} size={48} />
                <Typography variant="body1" style={{ marginTop: '8px' }}>
                  {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
                </Typography>
              </div>
            </div>
            {startTime && (
              <Typography variant="body2" style={{ marginBottom: '8px' }}>
                Quiz started at: {new Date(startTime).toLocaleString()}
              </Typography>
            )}
            {endTime && (
              <Typography variant="body2" style={{ marginBottom: '16px' }}>
                Quiz ended at: {new Date(endTime).toLocaleString()}
              </Typography>
            )}
            <Grid container spacing={2}>
              {questions[currentIndex].answers.map((answer, index) => (
                <Grid item xs={12} key={index}>
                  <Paper
                    variant={
                      selectedAnswer === answer
                        ? 'elevation'
                        : showCorrectAnswer && answer === questions[currentIndex].correctAnswer
                        ? 'elevation'
                        : 'outlined'
                    }
                    onClick={() => handleAnswerSelect(answer)}
                    style={{
                      padding: '16px',
                      cursor: 'pointer',
                      backgroundColor:
                        showCorrectAnswer && answer === questions[currentIndex].correctAnswer
                          ? 'green'
                          : showCorrectAnswer && answer !== questions[currentIndex].correctAnswer
                          ? 'red'
                          : 'inherit',
                      color:
                        showCorrectAnswer && (
                          answer === questions[currentIndex].correctAnswer ||
                          answer !== questions[currentIndex].correctAnswer
                        )
                          ? 'white'
                          : 'inherit',
                    }}
                  >
                    <Typography variant="body1">
                      {answer}
                      {showCorrectAnswer && (
                        <span>
                          {answer === questions[currentIndex].correctAnswer
                            ? ' (Correct)'
                            : ' (Incorrect)'}
                        </span>
                      )}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
              {currentIndex > 0 && (
                <Button variant="contained" color="primary" onClick={handlePreviousQuestion}>
                  Previous
                </Button>
              )}
              {currentIndex < questions.length - 1 && (
                <Button variant="contained" color="primary" onClick={handleNextQuestion}>
                  Next
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <Typography variant="h4" gutterBottom>
              Game Over
            </Typography>
            <Typography variant="h6">
              Your score: {score}/{questions.length}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Time taken: {Math.floor((endTime - startTime) / 1000)} seconds
            </Typography>
            <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
              Play Again
            </Button>
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;