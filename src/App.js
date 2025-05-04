import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import CustomerDetail from './pages/CustomerDetail';
import AddCustomerForm from './forms/AddCustomerForm';
import AddLoanForm from './forms/AddLoanForm';
import RepaymentForm from './forms/RepaymentForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <header>
        <h1>CrediKhaata</h1>
      </header>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer/:id" element={<CustomerDetail />} />
          <Route path="/add-customer" element={<AddCustomerForm />} />
          <Route path="/add-loan/:customerId" element={<AddLoanForm />} />
          <Route path="/record-repayment/:loanId" element={<RepaymentForm />} />

        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
