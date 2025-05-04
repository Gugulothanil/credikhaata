import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCustomer } from '../../utils/api';

const AddCustomerForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add customer to localStorage
    addCustomer({ name, phone });
    // Navigate back to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="add-customer-form">
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomerForm;















// import React from 'react';
// import './index.css';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { addCustomer } from '../../utils/api';




// const AddCustomerForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm();

//   const navigate = useNavigate();

//   const onSubmit = (data) => {
//     addCustomer(data); // Save to mock/local data
//     navigate('/');     // Redirect to Dashboard
//   };

//   return (
//     <div className="add-customer-form">
//       <h2>Add New Customer</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <label>Name:</label>
//         <input type="text" {...register('name', { required: true })} />
//         {errors.name && <p className="error">Name is required</p>}

//         <label>Phone:</label>
//         <input type="text" {...register('phone', { required: true })} />
//         {errors.phone && <p className="error">Phone number is required</p>}

//         <button type="submit">Add Customer</button>
//       </form>
//     </div>
//   );
// };




// export default AddCustomerForm;
