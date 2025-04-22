import React, { useState } from 'react';
import '../styles/ContentInput.css';

function ContentInput({ onStartQuiz }) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    onStartQuiz(content);
  };

  return (
    <div className="content-input">
      <textarea 
        placeholder="Paste your content here (articles, study notes, etc.)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Generate Quiz</button>
    </div>
  );
}

export default ContentInput;