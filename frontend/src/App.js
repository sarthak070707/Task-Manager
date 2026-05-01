import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />
          }
        />
        <Route
          path="/signup"
          element={
            token ? <Navigate to="/dashboard" /> : <Signup />
          }
        />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            token ? <Dashboard setToken={setToken} /> : <Navigate to="/login" />
          }
        />

        {/* Default redirect */}
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;