import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirming password
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log('Password:', Password); // Log the Password value
    console.log('Confirm Password:', confirmPassword); // Log the confirmPassword value
    if (Password !== confirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      return;
    }
    try {
      const res = await axios.post(`http://localhost:4000/api/user/reset-password/${id}/${token}`, { password: Password });
      setMessage(res.data.message);
      console.log('Response:', res.data); // Log the response
      if (res.data.success) {
        navigate('/login'); // Redirect to login page after successful reset
      }
    } catch (error) {
      console.error('Error:', error); // Log the error
      setMessage('Something went wrong, please try again later.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="bg-slate-200 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
