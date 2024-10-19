import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import piggyBank from '../assets/images/piggy-bank.png';

function HomePage() {


  const navigate = useNavigate(); 
  //Check if user is login
  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('userSession'));

    if(userSession && userSession.isUserLoggin){
      navigate('/dashboard'); 
    }
  }, []);

  return (
    <div className="flex items-center justify-center px-4 pt-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-white text-5xl font-bold mb-4">
            Take control of your super
          </h1>
          <p className="text-gray-300 text-xl mb-6">
            You're young and want to be rich? Contribute to your super to become a millionaire in 25 years.
          </p>
          <a 
            href="/login" 
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg inline-block text-center"
          >
            Login or Create an Account
          </a>
        </div>
        <div className="flex justify-center items-center">
          <img 
            src={piggyBank} 
            alt="Piggy Bank" 
            className="w-80 h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
