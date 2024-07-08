import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransferForm = ({ customers, onSuccess }) => {
  const [fromCustomerId, setFromCustomerId] = useState('');
  const [toCustomerId, setToCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/transfers');
      setTransfers(response.data);
    } catch (error) {
      console.error('Failed to fetch transfers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/transfer', {
        fromCustomerId,
        toCustomerId,
        amount: parseFloat(amount)
      });
      onSuccess();
      fetchTransfers(); // Refresh transfers after successful transfer
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  return (
    <div className="mt-8 p-4 bg-zinc-200 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Transfer Money</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">From (Customer):</label>
          <select
            value={fromCustomerId}
            onChange={(e) => setFromCustomerId(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="" required>Select Customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>{customer.name} ({customer._id})</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">To (Customer):</label>
          <select
            value={toCustomerId}
            onChange={(e) => setToCustomerId(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>{customer.name} ({customer._id})</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Transfer</button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Transfer History</h2>
        <table className="w-full border-collapse border border-gray-200">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-200 px-2 py-1 md:px-4 md:py-2">From</th>
      <th className="border border-gray-200 px-2 py-1 md:px-4 md:py-2">To</th>
      <th className="border border-gray-200 px-2 py-1 md:px-4 md:py-2">Amount</th>
      <th className="border border-gray-200 px-2 py-1 md:px-4 md:py-2">Date</th>
    </tr>
  </thead>
  <tbody>
    {transfers.map((transfer) => (
      <tr className="text-center" key={transfer._id}>
        <td className="border border-gray-200 px-2 py-1 md:px-4 md:py-2">
          {transfer.fromCustomerName} ({transfer.fromCustomerId})
        </td>
        <td className="border border-gray-200 px-2 py-1 md:px-4 md:py-2">
          {transfer.toCustomerName} ({transfer.toCustomerId})
        </td>
        <td className="border border-gray-200 px-2 py-1 md:px-4 md:py-2">
        ₹{transfer.amount}
        </td>
        <td className="border border-gray-200 px-2 py-1 md:px-4 md:py-2">
          {new Date(transfer.date).toLocaleString()}
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default TransferForm;
