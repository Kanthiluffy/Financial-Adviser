import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Dashboard.css';  // You can define custom styles here

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');  // Retrieve the stored JWT token
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.mobileNumber}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
