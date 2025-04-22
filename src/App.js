import React, { useState } from 'react';
import ContentInput from './Components/ContentInput';
import QuizContainer from './Components/QuizContainer';
import Results from './Components/Results';
import { generateMCQs } from './utils/quizGenerator';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState('input'); // 'input', 'quiz', 'results'
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const handleStartQuiz = (content) => {
    if (content.trim() === '') {
      alert('Please enter some content first!');
      return;
    }
    
    const generatedQuestions = generateMCQs(content);
    setQuestions(generatedQuestions);
    setCurrentStep('quiz');
  };

  const handleFinishQuiz = (finalQuestions) => {
    // Calculate final score
    let finalScore = 0;
    finalQuestions.forEach(question => {
      if (question.userAnswer === question.correctAnswer) {
        finalScore++;
      }
    });
    
    setScore(finalScore);
    setQuestions(finalQuestions);
    setCurrentStep('results');
  };

  const handleRestartQuiz = () => {
    setQuestions([]);
    setScore(0);
    setCurrentStep('input');
  };

  return (
    <div className="app-container">
      <header>
        <h1>Topic to MCQ Quiz Generator</h1>
        <p className="intro">Paste your content below, and we'll convert it into a timed MCQ quiz!</p>
      </header>

      {currentStep === 'input' && (
        <ContentInput onStartQuiz={handleStartQuiz} />
      )}
      
      {currentStep === 'quiz' && (
        <QuizContainer 
          questions={questions} 
          onFinishQuiz={handleFinishQuiz}
        />
      )}
      
      {currentStep === 'results' && (
        <Results 
          score={score} 
          totalQuestions={questions.length} 
          onRestart={handleRestartQuiz} 
        />
      )}
    </div>
  );
}

export default App;