import React from 'react';

const CustomerDetail = ({ customer }) => {
  return (
    <div className="mt-8 p-4 bg-zinc-200 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
      <p className="mb-2"><strong>Name:</strong> {customer.name}</p>
      <p className="mb-2"><strong>Email:</strong> {customer.email}</p>
      <p className="mb-2"><strong>Current Balance:</strong> ₹{customer.currentBalance}</p>
    </div>
  );
};

export default CustomerDetail;
