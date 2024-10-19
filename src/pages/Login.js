import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Login() {

  // Set varables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the message from the URL
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message');


  // Check if user is login in
  useEffect(() => {
    var isUserLoggedIn = localStorage.getItem('UserLogin');
    if (isUserLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const body = JSON.stringify({
        email: email, 
        password: password 
      });
  
      const response = await fetch('https://wn7ayl4sac.execute-api.us-east-1.amazonaws.com/superlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ body })
      });
  
      const results = await response.json();
      const data = await JSON.parse(results.body);

      if (data.success) {
        // Login successful
        localStorage.setItem('userSession', JSON.stringify({ email: data.email, isLoggedIn: true }));
        navigate('/dashboard');
      } else {
        // Handle login failure
        setErrorMessage('Login failed: ' + data.message);
      }
    } catch (err) {
      console.log('Error:', err.message);
      setErrorMessage('An error occurred: ' + err.message);
    }
  };
  
  
  
  



  return (
    <div className="flex flex-col items-center justify-center pt-28">
      <div className="w-full max-w-md p-8 bg-white rounded shadow text-black">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        
        {/* Display error message if there is one */}
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
            {errorMessage}
          </div>
        )}

        {message && (
          <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-slate-800 rounded"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-slate-800 rounded"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-black">
            Not registered? <Link to="/register" className="text-blue-500 hover:underline">Click here to register now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
