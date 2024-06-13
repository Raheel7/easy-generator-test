import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ClipLoader } from 'react-spinners';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
   
    const emailError = !validateEmail(email) ? 'Invalid email address' : '';
    const passwordError = !validatePassword(password) ? 'Password must be at least 8 characters long and include at least one letter, one number, and one special character' : '';
   
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await response.json();
      if (response.ok) {
        authContext?.login(data.access_token);
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Sign up failed');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignUp} className="p-6 bg-white rounded w-[30%] shadow-md">
        <h1 className="mb-4 text-xl font-bold">Sign Up</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors({ ...errors, email: '' });
            }}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''} `}
            required
          />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
           
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setErrors({ ...errors, password: '' }); 
            }}
            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''} `}
            required
          />
           {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <button type="submit" className="w-full font-semibold p-2 mt-4 bg-blue-500 text-white rounded">
        {loading ? <ClipLoader size={24} color="#ffffff" /> : 'Sign Up'}
        </button>
        <div className="mt-5 text-center">
          <h1>
            Already have an account?{' '}
            <span onClick={() => navigate('/sign-in')} className="ml-1 font-bold underline cursor-pointer">
              Login
            </span>
          </h1>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
