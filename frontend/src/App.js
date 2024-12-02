import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch employees when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token); // Store token in localStorage
    setIsLoggedIn(true); // Update the login state
  };

  // Simulate a logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update the login state
  };


  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8084/api/v1/emp/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleAddEmployee = async () => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8084/api/v1/emp/employees/${editEmployeeId}`, employee);
        alert('Employee updated successfully');
      } else {
        await axios.post('http://localhost:8084/api/v1/emp/employees', employee);
        alert('Employee added successfully');
      }
      setEmployee({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: '',
      });
      setIsEditing(false);
      setEditEmployeeId(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error adding/updating employee:', error);
      alert('Error adding/updating employee');
    }
  };

  const handleEditEmployee = (emp) => {
    setEmployee(emp);
    setIsEditing(true);
    setEditEmployeeId(emp._id);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8084/api/v1/emp/employees/${id}`);
      alert('Employee deleted successfully');
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Error deleting employee');
    }
  };


  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Employee Management System
      </Typography>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First Name"
                        name="first_name"
                        value={employee.first_name}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Last Name"
                        name="last_name"
                        value={employee.last_name}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        name="email"
                        value={employee.email}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Position"
                        name="position"
                        value={employee.position}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Salary"
                        name="salary"
                        value={employee.salary}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Date of Joining"
                        name="date_of_joining"
                        type="date"
                        value={employee.date_of_joining}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Department"
                        name="department"
                        value={employee.department}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddEmployee}
                        fullWidth
                      >
                        {isEditing ? 'Update Employee' : 'Add Employee'}
                      </Button>
                    </Grid>
                  </Grid>

                  <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>First Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Position</TableCell>
                          <TableCell>Salary</TableCell>
                          <TableCell>Date of Joining</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {employees.map((emp) => (
                          <TableRow key={emp._id}>
                            <TableCell>{emp.first_name}</TableCell>
                            <TableCell>{emp.last_name}</TableCell>
                            <TableCell>{emp.email}</TableCell>
                            <TableCell>{emp.position}</TableCell>
                            <TableCell>{emp.salary}</TableCell>
                            <TableCell>{emp.date_of_joining}</TableCell>
                            <TableCell>{emp.department}</TableCell>
                            <TableCell>
                              <Button color="primary" onClick={() => handleEditEmployee(emp)}>
                                Edit
                              </Button>
                              <Button color="secondary" onClick={() => handleDeleteEmployee(emp._id)}>
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Container>
  );
}

export default App;