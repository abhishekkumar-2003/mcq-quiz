import React, { useState, useEffect } from 'react';
import '../styles/Timer.css';

function Timer({ onExpire }) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onExpire();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onExpire]);

  return (
    <div className="timer-container">
      <p>Time Remaining:</p>
      <div className="timer">{timeLeft}</div>
    </div>
  );
}

export default Timer;