import React, { useState } from 'react';
import ContentInput from './Components/ContentInput';
import QuizContainer from './Components/QuizContainer';
import Results from './Components/Results';
// import { generateMCQs } from './utils/quizGenerator';
import FileUpload from './Components/FileUpload';
import { generateQuestions } from './utils/quizGenerator';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState('input'); // 'input', 'quiz', 'results'
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStartQuiz = async (content) => {
    if (!content.trim()) {
      setError('Please enter some content or upload a file first.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Generate questions using the API
      const generatedQuestions = await generateQuestions(content);
      setQuestions(generatedQuestions);
      setCurrentStep('quiz');
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
      console.error('Error generating questions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileContent = async (fileContent) => {
    handleStartQuiz(fileContent);
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
    setError(null);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Topic to MCQ Quiz Generator</h1>
        <p className="intro">Generate a timed MCQ quiz from text or a PDF file</p>
      </header>

      {currentStep === 'input' && (
        <>
          <div className="input-options">
            <FileUpload onFileContent={handleFileContent} />
            <div className="divider">OR</div>
            <ContentInput onStartQuiz={handleStartQuiz} />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          {isLoading && <div className="loading">Generating questions... Please wait.</div>}
        </>
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