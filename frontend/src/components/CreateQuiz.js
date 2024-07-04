import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    const newQuestion = {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, event) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, event) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = parseInt(value, 10);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${window.location.origin}/api/questions`, {
        quizName,
        questions
      });
      console.log('Quiz created:', response.data);
      navigate(`/dashboard`);
    } catch (err) {
      console.error('Failed to create quiz:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full mx-4 max-h-[600px] overflow-y-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Create Quiz</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="quizName" className="block text-sm font-medium text-gray-700">
              Quiz Name
            </label>
            <input
              id="quizName"
              name="quizName"
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm transition-all duration-300"
              placeholder="Enter quiz name"
            />
          </div>

          {questions.map((question, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question {index + 1}
              </label>
              <input
                type="text"
                name="question"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm transition-all duration-300"
                placeholder="Enter question"
              />
              <div className="mt-2 space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label className="block text-sm font-medium text-gray-700">
                      Option {optionIndex + 1}
                    </label>
                    <input
                      type="text"
                      name={`option${index}${optionIndex}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm transition-all duration-300"
                      placeholder={`Enter option ${optionIndex + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Correct Answer
                </label>
                <select
                  name={`correctAnswer${index}`}
                  value={question.correctAnswer}
                  onChange={(e) => handleCorrectAnswerChange(index, e)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm transition-all duration-300"
                >
                  {question.options.map((_, optionIndex) => (
                    <option key={optionIndex} value={optionIndex}>
                      Option {optionIndex + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              Add Question
            </button>
            {questions.length > 0 && (
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
