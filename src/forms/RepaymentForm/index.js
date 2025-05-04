import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Import the AuthContext
import { updateLoanData } from '../../utils/api'; // Import the function to update loan data

const RepaymentForm = () => {
  const { loanId } = useParams(); // Get loan ID from URL
  const { user } = useContext(AuthContext); // Get user context
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  // If there's no user, redirect to login page
  if (!user) {
    navigate('/login');
    return null; // Prevent rendering the rest of the component
  }

  // Get customer and loan data (You can implement this in API if needed)
  const customerId = localStorage.getItem('currentCustomerId'); // Store current customer ID when viewing customer
  const loan = JSON.parse(localStorage.getItem('customers')).find(cust => cust.id === Number(customerId))
    .loans.find(loan => loan.id === loanId); // Find the loan using loanId
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const repaymentData = {
      amount: parseFloat(amount),
      date,
    };

    const updatedLoanData = {
      ...loan,
      remaining: loan.remaining - repaymentData.amount, // Update the remaining amount
    };

    updateLoanData(customerId, loanId, updatedLoanData); // Update loan in localStorage
    navigate(`/customer/${customerId}`); // Redirect to customer details page
  };

  return (
    <div className="repayment-form">
      <h2>Record Repayment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Repayment Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Record Repayment</button>
      </form>
    </div>
  );
};

export default RepaymentForm;













// import React, { useState, useEffect } from 'react';
// import './index.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { updateLoanData } from '../../utils/api';

// const RepaymentForm = () => {
//   const { loanId } = useParams();
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [loan, setLoan] = useState(null);
//   const [amount, setAmount] = useState('');

//   useEffect(() => {
//     const customers = JSON.parse(localStorage.getItem('customers')) || [];
//     let found = false;

//     for (let cust of customers) {
//       const foundLoan = cust.loans.find((l) => String(l.id) === String(loanId));
//       if (foundLoan) {
//         setCustomer(cust);
//         setLoan(foundLoan);
//         found = true;
//         break;
//       }
//     }

//     if (!found) {
//       console.error('Loan not found');
//     }
//   }, [loanId]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const repaymentAmount = parseFloat(amount);
//     if (!repaymentAmount || repaymentAmount <= 0) {
//       toast.error("Enter a valid repayment amount");
//       return;
//     }

//     const updatedLoan = {
//       ...loan,
//       remaining: loan.remaining - repaymentAmount,
//       repayments: [
//         ...(loan.repayments || []),
//         { amount: repaymentAmount, date: new Date().toLocaleDateString() }
//       ]
//     };

//     updateLoanData(customer.id, loan.id, updatedLoan);
//     toast.success(`₹${repaymentAmount} repayment recorded successfully!`);
//     setTimeout(() => navigate(`/customer/${customer.id}`), 2000);
//   };

//   if (!loan || !customer) return <p>Loading repayment form...</p>;

//   return (
//     <div className="repayment-form">
//       <h2>Record Repayment for {customer.name}</h2>
//       <p>Loan Item: {loan.item}</p>
//       <p>Remaining Balance: ₹{loan.remaining}</p>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           placeholder="Repayment Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           required
//         />
//         <button type="submit">Record Repayment</button>
//       </form>
//     </div>
//   );
// };

// export default RepaymentForm;
