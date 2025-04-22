import React, { useState, useEffect } from 'react';
import Question from './Question';
import Timer from './Timer';
import '../styles/QuizContainer.css';

function QuizContainer({ questions, onFinishQuiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState(questions);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeExpired, setTimeExpired] = useState(false);

  // When timer expires, move to next question automatically
  useEffect(() => {
    if (timeExpired) {
      saveAndMoveNext();
      setTimeExpired(false);
    }
  }, [timeExpired]);

  // Set initial selected option when loading a question
  useEffect(() => {
    if (currentQuestions.length > 0 && currentQuestionIndex < currentQuestions.length) {
      setSelectedOption(currentQuestions[currentQuestionIndex].userAnswer);
    }
  }, [currentQuestionIndex, currentQuestions]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const saveAnswer = () => {
    if (selectedOption !== null) {
      const updatedQuestions = [...currentQuestions];
      updatedQuestions[currentQuestionIndex].userAnswer = selectedOption;
      setCurrentQuestions(updatedQuestions);
      return updatedQuestions;
    }
    return currentQuestions;
  };

  const saveAndMoveNext = () => {
    const updatedQuestions = saveAnswer();
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      onFinishQuiz(updatedQuestions);
    }
  };

  const handleSubmitQuiz = () => {
    const updatedQuestions = saveAnswer();
    onFinishQuiz(updatedQuestions);
  };

  const handleTimerExpire = () => {
    setTimeExpired(true);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="quiz-container">
      <Timer 
        onExpire={handleTimerExpire} 
        key={currentQuestionIndex} // Reset timer when question changes
      />
      
      <div className="progress">
        <span>{currentQuestionIndex + 1}</span>/<span>{questions.length}</span>
      </div>
      
      {currentQuestions.length > 0 && (
        <Question 
          question={currentQuestions[currentQuestionIndex]} 
          selectedOption={selectedOption}
          onSelectOption={handleOptionSelect} 
        />
      )}
      
      <div className="button-group">
        {!isLastQuestion ? (
          <button onClick={saveAndMoveNext} className="next-btn">Next Question</button>
        ) : (
          <button onClick={handleSubmitQuiz} className="submit-btn">Submit Quiz</button>
        )}
      </div>
    </div>
  );
}

export default QuizContainer;