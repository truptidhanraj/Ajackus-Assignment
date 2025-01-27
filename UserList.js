import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserList.css'

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
    } else {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          const jsonData = data.map(user => ({
            id: user.id,
            name: `${user.name}`,
            email: user.email,
            department: 'Department'
          }));
          setUsers(jsonData);
          localStorage.setItem('users', JSON.stringify(jsonData));
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }, []);

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <div className='container'>
      <h1>Users List</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className='user-list-container'>
        <table className='user-list-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className='user-list-row'>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>
                  <button className='edit-btn' onClick={() => handleEdit(user.id)}>Edit</button>
                  <button className='delete-btn' onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      <button className='add-user-btn' onClick={() => navigate('/add-user')}>Add User</button>
    </div>
  );
};

export default UserList;