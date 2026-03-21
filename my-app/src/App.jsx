import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from './Pages/Category';
import Type from './Pages/Type';
import Issue from './Pages/Issue';
import Result from './Pages/Result';
import Home from './pages/Home';
import Hero from './pages/Hero';
import BackgroundVideo from "./components/BackgroundVideo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <BrowserRouter>

      <BackgroundVideo />
      <Navbar />

      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/type" element={<Type />} />
          <Route path="/issue" element={<Issue />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>

      <Footer />

    </BrowserRouter>
  );
}

export default App;