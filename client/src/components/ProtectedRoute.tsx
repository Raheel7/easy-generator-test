import React, { ReactNode, useContext } from 'react';
import {  Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


interface ProtectedRouteProps {
    children: ReactNode;
  }


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  console.log("jjj",authContext?.isAuthenticated)

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }


  return authContext.isAuthenticated ? (
    <>
      {children}
    </>
  ) : (
    <Navigate to="/sign-in" />
  );

  
};

export default ProtectedRoute;
