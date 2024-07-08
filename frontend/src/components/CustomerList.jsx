import React from 'react';

const CustomerList = ({ customers, onSelect }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Customers</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer) => (
          <li key={customer._id} className="bg-zinc-200 shadow-md p-4 rounded-lg">
            <button
              className="text-blue-500 "
              onClick={() => onSelect(customer._id)}
            >
              {customer.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
