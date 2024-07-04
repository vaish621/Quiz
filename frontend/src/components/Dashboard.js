import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/questions`);
        setQuizzes(response.data);
      } catch (err) {
        console.error('Failed to fetch quizzes:', err);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Dashboard</h2>
        <div className="space-y-4">
          {quizzes.map((quiz, index) => (
            <Link
              key={index}
              to={`'${window.location.origin}/quiz/${quiz._id}`}
              className="block p-4 bg-white rounded-lg shadow-md transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <h3 className="text-lg font-medium text-gray-900">{quiz.quizName}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


