import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FeaturePage from './landing_page/features/FeaturePage';
import Navbar from './navbar';
import HomePage from './landing_page/HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from './landing_page/AboutPage/AboutPage';
import ContactPage from './landing_page/Contact/ContactPage';
import LoginPage from './landing_page/Login/LoginPage';
import LoanPage from './landing_page/loan_form/loan_page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router basename={process.env.PUBLIC_URL || '/'}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/loan" element={<LoanPage />} />
        </Routes>
      </Router>
  </React.StrictMode>
);