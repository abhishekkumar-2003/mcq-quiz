export function generateMCQs(content) {
    // This is a simplified example - in a real app, you would use NLP or AI to generate questions
    const sampleQuestions = [];
    
    // Create 30 sample questions
    for (let i = 1; i <= 30; i++) {
      sampleQuestions.push({
        id: i,
        question: `Sample Question ${i} based on the provided content?`,
        options: [
          `Option A for question ${i}`,
          `Option B for question ${i}`,
          `Option C for question ${i}`,
          `Option D for question ${i}`
        ],
        correctAnswer: Math.floor(Math.random() * 4),
        userAnswer: null
      });
    }
    
    return sampleQuestions;
  }