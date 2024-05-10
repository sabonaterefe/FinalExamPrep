import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Button, Grid, Typography } from '@mui/material';
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

const subjects = [
  { name: 'Mathematics', grade: '9-12' },
  { name: 'English', grade: '9-12' },
  { name: 'Biology', grade: '9-12' },
  { name: 'Chemistry', grade: '9-12' },
  { name: 'Physics', grade: '9-12' },
  // Add more subjects as needed
];

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentIndex(0); // Reset index when subject changes
    setSelectedAnswer(null); // Reset selected answer when subject changes
    setScore(0); // Reset score when subject changes
    setShowCorrectAnswer(false); // Reset correct answer display when subject changes
    setGameFinished(false); // Reset game finish state when subject changes
  };

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
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderQuiz = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4">{questions[currentIndex].question}</Typography>
      <Grid container spacing={2}>
        {questions[currentIndex].answers.map((answer, index) => (
          <Grid item xs={12} key={index}>
            <Button
              variant={
                selectedAnswer === answer
                  ? 'contained'
                  : showCorrectAnswer && answer === questions[currentIndex].correctAnswer
                  ? 'contained'
                  : 'outlined'
              }
              color={
                showCorrectAnswer && answer === questions[currentIndex].correctAnswer
                  ? 'primary'
                  : showCorrectAnswer && answer !== questions[currentIndex].correctAnswer
                  ? 'secondary'
                  : 'default'
              }
              onClick={() => handleAnswerSelect(answer)}
              style={{ width: '100%' }}
            >
              {answer}
            </Button>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {currentIndex > 0 && (
          <Button variant="contained" onClick={handlePreviousQuestion}>
            Previous
          </Button>
        )}
        {currentIndex < questions.length - 1 && (
          <Button variant="contained" onClick={handleNextQuestion}>
            Next
          </Button>
        )}
      </div>
    </div>
  );

  const renderSubjectSelection = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4">Select a Subject</Typography>
      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        {subjects.map((subject, index) => (
          <Grid item xs={12} key={index}>
            <Button variant="contained" color="primary" onClick={() => handleSubjectSelect(subject)}>
              {subject.name} ({subject.grade})
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        {selectedSubject ? renderQuiz() : renderSubjectSelection()}
        {gameFinished && (
          <div>
            <Typography variant="h4" gutterBottom>
              Game Over
            </Typography>
            <Typography variant="h6">
              Your score: {score}/{questions.length}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setSelectedSubject(null)}>
              Change Subject
            </Button>
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
