import React, { useState, useEffect } from 'react';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', designation: '', gender: '', salary: '' });

  useEffect(() => {
    fetch('/api/employee')
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ name: '', designation: '', gender: '', salary: '' });
    const updated = await fetch('/api/employee').then(res => res.json());
    setEmployees(updated);
  };

  return (
    <div>
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" required />
        <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" required />
        <input name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" required />
        <button type="submit">Add Employee</button>
      </form>

      <h3>Employee List</h3>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>{emp.name} - {emp.designation}</li>
        ))}
      </ul>
    </div>
  );
};

export default Employee;
