import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from './Pages/Category';
import Type from './Pages/Type';
import Issue from './Pages/Issue';
import Result from './Pages/Result';
import Home from './pages/Home';
import Hero from './pages/Hero';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import BackgroundVideo from "./components/BackgroundVideo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RoutineBuilder from "./pages/RoutineBuilder";

function App() {
  return (
    <BrowserRouter>

      
      <BackgroundVideo />
      <Navbar />

     
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* Protected Area: Advisor System */}
          <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
          <Route path="/type" element={<ProtectedRoute><Type /></ProtectedRoute>} />
          <Route path="/issue" element={<ProtectedRoute><Issue /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
          <Route path="/build-routine" element={<ProtectedRoute><RoutineBuilder /></ProtectedRoute>} />
        </Routes>
      </div>

      <Footer />

    </BrowserRouter>
  );
}

export default App;