import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/Home';
import MaterialAccess from './Components/AccessMaterial';
import TrackProgress from './Components/TrackProgress';
import Quiz from './Components/Quiz'
import TakeExam from './Components/TakeExam';
import Forum from './Components/Forum';
import Signup from './Components/Signup';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import SME from './Components/SME';
import Student from './Components/Student';
import Admin from './Components/Admin';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/access-material" element={<MaterialAccess />} />
        <Route path="/track-progress" element={<TrackProgress />} />
        <Route path="/take-exam" element={<TakeExam />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/signup" element={<Signup />} />
        <Route path ="/quiz" element={<Quiz/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path ="/sme" element={<SME/>}/>
        <Route path ="/student"element={<Student/>}/>
        <Route path ="/admin"element={<Admin/>}/>
      </Routes>
    </Router>
  );
};

export default App;
