import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto py-40 ">
      <h1 className="text-3xl font-bold mb-4 text-center">Simple Banking App</h1>
      <div className="text-center">
        <Link
          to="/customers"
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          View All Customers
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
