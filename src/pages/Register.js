import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    if (userSession && userSession.isUserLoggin) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [superAmount, setSuperAmount] = useState('');
  const [error, setError] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      
      const body = JSON.stringify({
        email: email, 
        password: password,
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        superAmount: superAmount
      });

      try {
        const response = await fetch('https://vephmwzfaa.execute-api.us-east-1.amazonaws.com/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ body })
        });

        const data = await response.json();
        
        if (data.success) {
          console.log('Registration successful:', data.message);
          navigate('/login?message=You have successful registration. Please log in.');
        } else {
          setError(data.message);
          console.log('Registration failed:', data.message);
        }
      } catch (error) {
        setError('An error occurred while registering.');
        console.error('Error:', error);
      }
    } else {
      setError('Passwords do not match');
      console.log('Passwords do not match');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-2">
      <div className='w-full max-w-3xl p-8 bg-white text-black rounded shadow'>
        <h2 className="text-2xl font-bold text-black mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
        {error && (
            <div className="mb-4 text-red-500">
              <p>{error}</p>
            </div>
          )}
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