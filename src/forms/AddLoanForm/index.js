import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCustomerById, addLoanToCustomer } from '../../utils/api';




const AddLoanForm = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [loanData, setLoanData] = useState({
    item: '',
    amount: '',
    remaining: '',
    dueDate: '',
  });

  const [error, setError] = useState(null);
  const [customer, setCustomer] = useState(null);

  // Fetch the customer data when the component loads
  useEffect(() => {
    const customerDetails = fetchCustomerById(customerId);
    if (!customerDetails) {
      navigate('/');
    } else {
      setCustomer(customerDetails);
    }
  }, [customerId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    if (!loanData.item || !loanData.amount || !loanData.dueDate || !loanData.remaining) {
      setError('All fields are required');
      return;
    }

    const newLoan = {
      id: Date.now(),  // Unique loan ID
      item: loanData.item,
      amount: parseFloat(loanData.amount),
      remaining: parseFloat(loanData.remaining),
      dueDate: loanData.dueDate,
      repayments: [],
    };

    // Update customer loans
    addLoanToCustomer(customerId, newLoan);
    navigate(`/customer/${customerId}`);
  };

  if (!customer) return <div>Loading customer data...</div>;

  return (
    <div>
      <h2>Add Loan for {customer.name}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Loan Item</label>
          <input
            type="text"
            name="item"
            value={loanData.item}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={loanData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Remaining Amount</label>
          <input
            type="number"
            name="remaining"
            value={loanData.remaining}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={loanData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Loan</button>
      </form>
    </div>
  );
};

export default AddLoanForm;
