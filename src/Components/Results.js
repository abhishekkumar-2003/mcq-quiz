import React from 'react';
import '../styles/Results.css';

function Results({ score, totalQuestions, onRestart }) {
  return (
    <div className="results">
      <h2>Quiz Complete!</h2>
      <div className="score">Your Score: {score}/{totalQuestions}</div>
      <button onClick={onRestart}>Take Another Quiz</button>
    </div>
  );
}

export default Results;