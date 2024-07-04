import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/questions/${id}`);
        setQuiz(response.data);
      } catch (err) {
        console.error('Fetch Quiz Error:', err);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  if (!quiz) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">{quiz.quizName}</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {quiz.questions.map((question, index) => (
            <div key={index} className="mb-4 bg-gray-100 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900">{question.question}</h3>
              <div className="mt-4 space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label className="block text-sm font-medium text-gray-700">
                      <input
                        type="radio"
                        name={`question${index}`}
                        value={optionIndex}
                        onChange={() => handleOptionChange(index, optionIndex)}
                        className="mr-2"
                        disabled={showResults}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              {showResults && (
                <div className={`mt-2 ${question.correctAnswer === answers[index] ? 'text-green-500' : 'text-red-500'}`}>
                  Correct Answer: {question.options[question.correctAnswer]}
                </div>
              )}
            </div>
          ))}
          {!showResults && (
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition hover:scale-105"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Quiz;

