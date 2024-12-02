import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };


  const addEmployee = async (employee) => {
    try {
      const response = await axios.post('http://localhost:8084/api/v1/emp/employees', employee);
      console.log(response.data);  // Logs the response data from the server
    } catch (error) {
      console.error('Error adding employee:', error);  // Logs any error that happens
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8084/api/v1/emp/employees', employee, {
        headers: {
          'Content-Type': 'application/json',
          // Add authentication token here if using JWT
          // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
      });
      console.log('Employee added:', response.data);
      // Optionally clear the form or navigate to another page
      setEmployee({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: '',
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      // Handle error (e.g., show a notification or alert)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={employee.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="last_name"
          value={employee.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="position"
          value={employee.position}
          onChange={handleChange}
          placeholder="Position"
          required
        />
        <input
          type="number"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
        />
        <input
          type="date"
          name="date_of_joining"
          value={employee.date_of_joining}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
