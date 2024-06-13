import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Application: React.FC = () => {
    const authContext = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2 bg-gray-100">
      <h1 className="text-2xl font-bold">Welcome to the application</h1>
      <button onClick={authContext?.logout} className="text-2xl  rounded-lg bg-blue-400 text-white px-10 py-3">Logout</button>
    </div>
  );
};

export default Application;
