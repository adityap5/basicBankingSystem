import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerList from '../components/CustomerList';
import CustomerDetails from '../components/CustomerDetails';
import TransferForm from '../components/TransferForm';

const ViewAllCustomerPage = () => {

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
  
    useEffect(() => {
      fetchCustomers();
    }, []);
  
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        <CustomerList customers={customers} onSelect={(id) => {
          const customer = customers.find((customer) => customer._id === id);
          setSelectedCustomer(customer);
        }} />
        {selectedCustomer && (
          <>
            <CustomerDetails customer={selectedCustomer} />
            <TransferForm
              customers={customers}
              onSuccess={() => {
                setSelectedCustomer(null);
                fetchCustomers(); // Refresh customer list after successful transfer
              }}
            />
          </>
        )}
      </div>
    );
  };

  
export default ViewAllCustomerPage;
