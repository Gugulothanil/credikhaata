import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCustomerById } from '../../utils/api';
import { exportToPDF } from '../../utils/exportToPDF';

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const customerData = fetchCustomerById(id);
    if (!customerData) {
      navigate('/');
    } else {
      setCustomer(customerData);
    }
  }, [id, navigate]);

  if (!customer) {
    return <div>Loading customer data...</div>;
  }

  // Safely handle loans and repayments
  const handleRepaymentClick = (loanId) => {
    console.log('Navigating to repayment for loan ID:', loanId);
    navigate(`/record-repayment/${loanId}`);
  };

  // Handle Export to PDF
  const handleExportPDF = () => {
    if (customer) {
      exportToPDF(customer); // Export the current customer data as PDF
    }
  };

  return (
    <div>
      <h2>{customer.name}</h2>
      <p>Phone: {customer.phone}</p>
      <h3>Loans</h3>
      <div>
        {customer.loans && Array.isArray(customer.loans) && customer.loans.length === 0 ? (
          <p>No loans available</p>
        ) : (
          customer.loans && Array.isArray(customer.loans) && customer.loans.map((loan) => (
            <div key={loan.id}>
              <h4>Loan ID: {loan.id}</h4>
              <p><strong>Amount:</strong> ₹{loan.amount}</p>
              <p><strong>Remaining:</strong> ₹{loan.remaining}</p>
              <p><strong>Due Date:</strong> {new Date(loan.dueDate).toLocaleDateString()}</p>
              <h5>Repayments</h5>
              {loan.repayments && Array.isArray(loan.repayments) && loan.repayments.length === 0 ? (
                <p>No repayments yet</p>
              ) : (
                loan.repayments && Array.isArray(loan.repayments) && loan.repayments.map((repayment, idx) => (
                  <div key={idx}>
                    <p><strong>Amount:</strong> ₹{repayment.amount} on {new Date(repayment.date).toLocaleDateString()}</p>
                  </div>
                ))
              )}
              <button onClick={() => handleRepaymentClick(loan.id)}>
                Record Repayment
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Loan button */}
      <button onClick={() => navigate(`/add-loan/${id}`)}>Add Loan</button>

      {/* Export PDF button */}
      <button onClick={handleExportPDF}>Export to PDF</button>
    </div>
  );
};

export default CustomerDetail;










// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchCustomerById } from '../../utils/api';

// const CustomerDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);

//   useEffect(() => {
//     const customerData = fetchCustomerById(id);
//     if (!customerData) {
//       navigate('/');
//     } else {
//       setCustomer(customerData);
//     }
//   }, [id, navigate]);

//   if (!customer) {
//     return <div>Loading customer data...</div>;
//   }

//   // Safely handle loans and repayments
//   const handleRepaymentClick = (loanId) => {
//     console.log('Navigating to repayment for loan ID:', loanId);
//     navigate(`/record-repayment/${loanId}`);
//   };

//   return (
//     <div>
//       <h2>{customer.name}</h2>
//       <p>Phone: {customer.phone}</p>
//       <h3>Loans</h3>
//       <div>
//         {customer.loans && Array.isArray(customer.loans) && customer.loans.length === 0 ? (
//           <p>No loans available</p>
//         ) : (
//           customer.loans && Array.isArray(customer.loans) && customer.loans.map((loan) => (
//             <div key={loan.id}>
//               <h4>Loan ID: {loan.id}</h4>
//               <p><strong>Amount:</strong> ₹{loan.amount}</p>
//               <p><strong>Remaining:</strong> ₹{loan.remaining}</p>
//               <p><strong>Due Date:</strong> {new Date(loan.dueDate).toLocaleDateString()}</p>
//               <h5>Repayments</h5>
//               {loan.repayments && Array.isArray(loan.repayments) && loan.repayments.length === 0 ? (
//                 <p>No repayments yet</p>
//               ) : (
//                 loan.repayments && Array.isArray(loan.repayments) && loan.repayments.map((repayment, idx) => (
//                   <div key={idx}>
//                     <p><strong>Amount:</strong> ₹{repayment.amount} on {new Date(repayment.date).toLocaleDateString()}</p>
//                   </div>
//                 ))
//               )}
//               <button onClick={() => handleRepaymentClick(loan.id)}>
//                 Record Repayment
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//       <button onClick={() => navigate(`/add-loan/${id}`)}>Add Loan</button>
//     </div>
//   );
// };

// export default CustomerDetail;



















