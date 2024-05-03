import React from 'react';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try { 
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error('Sign-in error:', error.message); // Log the error message if sign-in fails
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="box p-8 bg-gray-800 rounded-lg shadow-lg text-center md:w-1/2 lg:w-1/3">
        <div className="text-3xl font-bold text-white mb-4">Temligram</div>
        <div className="text-xl font-semibold text-white mb-4">Login</div>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:bg-gray-600"
            type="email"
            placeholder="Email"
          />
          <input
            className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:bg-gray-600"
            type="password"
            placeholder="Password"
          />
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" // Change the type to "submit"
          >
            Login
          </button>
          <p className="text-white mt-4">Doesn't Have An Account? <Link to="/register"> Register!</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
