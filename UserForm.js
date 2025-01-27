import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserForm.css';

const UserForm = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      const storedUsers = JSON.parse(localStorage.getItem('users'));
      const user = storedUsers.find(user => user.id === parseInt(id));
      if (user) {
        const name = user.name.split(' ');
        setFirstName(name[0]);
        setLastName(name[1]);
        setEmail(user.email);
        setDepartment(user.department);
      }
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'Required';
    if (!lastName) newErrors.lastName = 'Required';
    if (!email) newErrors.email = 'Required';
    if (!department) newErrors.department = 'Required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      if (id) {
        const index = storedUsers.findIndex(user => user.id === parseInt(id));
        if (index !== -1) {
          storedUsers[index] = { id: parseInt(id), name: `${firstName} ${lastName}`, email, department };
        }
      } else {
        const newUser = { id: Math.max(...storedUsers.map(user => user.id)) + 1 || 1, name: `${firstName} ${lastName}`, email, department };
        storedUsers.push(newUser);
      }
      localStorage.setItem('users', JSON.stringify(storedUsers));
      navigate('/');
    }
  };

  return (
    <div className='user-form-container'>
      <h1>{id ? 'Edit User' : 'Add User'}</h1>
      <form onSubmit={handleSubmit} className='user-form'>
        <div className='form-group'>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Enter first name"
          />
          {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
        </div>
        <div className='form-group'>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Enter last name"
          />
          {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
        </div>
        <div className='form-group'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div className='form-group'>
          <label>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            placeholder="Enter department"
          />
          {errors.department && <p style={{ color: 'red' }}>{errors.department}</p>}
        </div>
        <button type="submit" className='submit-btn'>Submit</button>
      </form>
    </div>
  );
};

export default UserForm;