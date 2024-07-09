import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username && password) {
      // Replace with actual registration/login logic
      if (isRegistering) {
        console.log('Registering:', username, password);
      } else {
        console.log('Logging in:', username, password);
      }
      navigate('/dashboard');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{isRegistering ? 'Register' : ' Student Sign In'}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          {isRegistering ? 'Register' : 'Sign In'}
        </button>
        <p className="mt-4 text-center">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 cursor-pointer"
          >
            {isRegistering ? 'Sign In' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
