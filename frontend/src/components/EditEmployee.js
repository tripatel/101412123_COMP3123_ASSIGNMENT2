import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`employees/${id}`);
        setEmployeeData(response.data);
      } catch (err) {
        console.error('Error fetching employee data:', err);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`employees/${id}`, employeeData);
      alert('Employee updated successfully');
      window.location.href = '/';
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" value={employeeData.first_name} onChange={handleChange} required />
        <input type="text" name="last_name" value={employeeData.last_name} onChange={handleChange} required />
        <input type="email" name="email" value={employeeData.email} onChange={handleChange} required />
        <input type="text" name="position" value={employeeData.position} onChange={handleChange} required />
        <input type="number" name="salary" value={employeeData.salary} onChange={handleChange} required />
        <input type="date" name="date_of_joining" value={employeeData.date_of_joining} onChange={handleChange} required />
        <input type="text" name="department" value={employeeData.department} onChange={handleChange} required />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
