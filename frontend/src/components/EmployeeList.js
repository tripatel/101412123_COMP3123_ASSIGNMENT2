import React, { useEffect, useState } from 'react';
import axios from '../axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('employees');
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
    fetchEmployees();
  }, []);

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`employees/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <button onClick={() => window.location.href = '/add-employee'}>Add Employee</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name} {employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>
                <button onClick={() => window.location.href = `/edit-employee/${employee._id}`}>Edit</button>
                <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
