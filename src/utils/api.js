let customers = JSON.parse(localStorage.getItem('customers')) || [];  // Initialize from localStorage

export const fetchCustomers = () => {
  return customers;
};

export const fetchCustomerById = (id) => {
  return customers.find(customer => customer.id === Number(id));  // Get customer by ID
};

export const addCustomer = (data) => {
  const newCustomer = {
    id: Date.now(),  // Use Date.now() for unique IDs
    name: data.name,
    phone: data.phone,
    loans: [],  // Initialize with an empty loans array
  };
  customers.push(newCustomer);
  localStorage.setItem('customers', JSON.stringify(customers));  // Save back to localStorage
};

export const addLoanToCustomer = (customerId, loanData) => {
  const customer = customers.find(customer => customer.id === Number(customerId));  // Find customer by ID
  if (customer) {
    const newLoan = {
      id: Date.now(),  // Use Date.now() for unique loan ID
      ...loanData,  // Spread the loanData
      repayments: [],  // Initialize repayments as an empty array
      remaining: loanData.amount, // Set remaining as the full loan amount initially
    };
    customer.loans.push(newLoan);
    localStorage.setItem('customers', JSON.stringify(customers));  // Save updated customers back to localStorage
  }
};

export const updateLoanData = (customerId, loanId, updatedLoanData) => {
  const customer = customers.find(customer => customer.id === Number(customerId));  // Find customer by ID
  if (customer) {
    const loanIndex = customer.loans.findIndex((loan) => loan.id === loanId);  // Find loan by ID
    if (loanIndex !== -1) {
      customer.loans[loanIndex] = { ...customer.loans[loanIndex], ...updatedLoanData };  // Update the loan data
      localStorage.setItem('customers', JSON.stringify(customers));  // Save updated customers back to localStorage
    }
  }
};

// Updated addRepaymentToLoan function
export const addRepaymentToLoan = (customerId, loanId, repaymentData) => {
  const customer = customers.find(customer => customer.id === Number(customerId));  // Find customer by ID
  if (customer) {
    const loan = customer.loans.find(loan => loan.id === loanId);  // Find loan by ID
    if (loan) {
      let remainingAmount = loan.remaining; // Get current remaining amount

      // Prevent repayment from exceeding remaining amount
      const repaymentAmount = repaymentData.amount > remainingAmount ? remainingAmount : repaymentData.amount;

      // Deduct repayment from the remaining balance
      loan.remaining -= repaymentAmount;

      // Prevent the remaining balance from going negative
      if (loan.remaining < 0) {
        loan.remaining = 0; // Ensure that the remaining balance does not go below zero
      }

      // Create repayment record
      const newRepayment = {
        id: Date.now(),  // Unique ID for repayment
        ...repaymentData,  // Add repayment details
      };

      // Add repayment to the loan
      loan.repayments.push(newRepayment);

      // Update localStorage with new loan data
      localStorage.setItem('customers', JSON.stringify(customers));

      // Debugging: Log the remaining balance after repayment
      console.log(`Remaining balance after repayment: ₹${loan.remaining}`);
    }
  }
};













