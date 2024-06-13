import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Application from "./pages/Application";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";



function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/sign-in" element={<PublicRoute>
                <SignIn />
              </PublicRoute>} />
          <Route path="/sign-up" element={<PublicRoute>
                <SignUp />
              </PublicRoute>} />
          <Route
            path="/"
            element={
              <ProtectedRoute >
                <Application />
              </ProtectedRoute>
            }
          />
          
          {/* <PrivateRoute path="/user/:id" component={UserDetail} />
          <PrivateRoute path="/add-user" component={AddEditUser} />
          <PrivateRoute path="/edit-user/:id" component={AddEditUser} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;