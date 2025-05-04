import React, { useContext, useEffect, useState } from 'react';
import './index.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Fetch customers from localStorage
      const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
      setCustomers(storedCustomers);
    }
  }, [user, navigate]);

  const getStatus = (loans) => {
    const overdue = loans.some(loan => new Date(loan.dueDate) < new Date() && loan.remaining > 0);
    return overdue ? 'Overdue' : 'Up-to-date';
  };

  const getNextDueDate = (loans) => {
    const futureDates = loans
      .filter(loan => loan.remaining > 0)
      .map(loan => new Date(loan.dueDate));
    if (futureDates.length === 0) return '-';
    return new Date(Math.min(...futureDates)).toLocaleDateString();
  };

  return (
    <div className="dashboard">
      <h2>Customer Dashboard</h2>
      <div className="customer-list">
        {customers.map(customer => (
          <div
            className={`customer-card ${getStatus(customer.loans) === 'Overdue' ? 'overdue' : ''}`}
            key={customer.id}
            onClick={() => navigate(`/customer/${customer.id}`)}
          >
            <h3>{customer.name}</h3>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Outstanding:</strong> ₹{customer.loans.reduce((sum, l) => sum + l.remaining, 0)}</p>
            <p><strong>Next Due:</strong> {getNextDueDate(customer.loans)}</p>
            <p><strong>Status:</strong> {getStatus(customer.loans)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
