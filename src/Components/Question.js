import React from 'react';
import '../styles/Question.css';

function Question({ question, selectedOption, onSelectOption }) {
  return (
    <div className="question-container">
      <h3>{question.question}</h3>
      <div className="options-container">
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`option ${selectedOption === index ? 'selected' : ''}`}
            onClick={() => onSelectOption(index)}
          >
            {String.fromCharCode(65 + index)}. {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;