import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        authContext?.login(data.access_token);
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (error) {
        setError('Sign in failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignIn} className="p-6 bg-white rounded w-[30%] shadow-md">
        <h1 className="mb-4 text-xl font-bold">Sign In</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 mt-4 font-semibold bg-blue-500 text-white rounded">
          Sign In
        </button>
        <div className=' mt-5 text-center '>
       <h1>Don't have an account?<span onClick={()=>navigate('/sign-up')} className=' ml-1 font-bold underline cursor-pointer'>Register</span></h1>
       </div>
      </form>
    </div>
  );
};

export default SignIn;
