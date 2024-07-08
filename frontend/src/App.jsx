import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ViewAllCustomerPage from './pages/ViewAllCustomerPage';

function App() {
  return (
    <div className="p-10 pt-4 bg-zinc-600 text-black ">
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers" element={<ViewAllCustomerPage />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App;
