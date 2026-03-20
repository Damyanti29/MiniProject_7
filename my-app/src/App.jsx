import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Category from './Pages/Category';
import Type from './Pages/Type';
import Issue from './Pages/Issue';
import Result from './Pages/Result';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/type" element={<Type />} />
        <Route path="/issue" element={<Issue />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
