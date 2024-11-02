import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [superAmount, setSuperAmount] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [retirementGoal, setRetirementGoal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  // Effect - Check user is login
  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    if (userSession && userSession.isUserLoggin) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Handle register API
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password != confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    // Register details
    const registrationData = JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      dob,
      superAmount,
      retirementAge,
      retirementGoal
    });
  
    try {
      const response = await fetch('https://zcovudlkqg.execute-api.us-east-1.amazonaws.com/NewUser', {
        method: 'POST',
        body: registrationData,
        headers: {
          'Content-type' : 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        navigate('/login?message=You have successfully registered. Please log in.');
      } else {
        setErrorMessage(data.message);
      }
    } catch (errorMessage) {
      setErrorMessage('An error occurred while registering.');
      console.error('Error:', errorMessage);
    } 
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center pt-2">
      <div className='w-full max-w-3xl p-8 bg-white text-black rounded shadow'>
        <h2 className="text-2xl font-bold text-black mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Error messages */}
          {errorMessage && (
            <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
              {errorMessage}
            </div>
          )}
          {/* Register form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                className="w-full px-3 py-2 border border-slate-800 rounded"
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 border border-slate-800 rounded"
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="dob">
                Date of Birth
              </label>
              <input
                className="w-full px-3 py-2 border border-slate-800 rounded"
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="superAmount">
                Current Super Amount
              </label>
              <input
                className="w-full px-3 py-2 border border-slate-800 rounded"
                id="superAmount"
                type="number"
                value={superAmount}
                onChange={(e) => setSuperAmount(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="retirementAge">
                Retirement Age
              </label>
              <input
                className="w-full px-3 py-2 border border-slate-800 rounded"
                id="retirementAge"
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="retirementGoal">
                Retirement Goal
              </label>
              <input
                className="w-full px-3 py-2 border border-slate-800 rounded"
                id="retirementGoal"
                type="number"
                value={retirementGoal}
                onChange={(e) => setRetirementGoal(e.target.value)}
                required
              />
            </div>
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 border border-slate-800 rounded"
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-black">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Click here to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;