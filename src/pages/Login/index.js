import React, { useContext } from 'react';
import './index.css';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../../utils/toastUtil';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const success = login(data.email, data.password);
    if (success) {
      showSuccess('Login successful!');
      navigate('/dashboard');
    } else {
      showError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
