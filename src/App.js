import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import EmployeePage from './pages/EmployeePage';
import EmployeeRegistration from './pages/EmployeeRegistration'; // <-- 1. IMPORT THE NEW PAGE

function App() {
  return (
    <Routes>
      {/* Routes WITH sidebar/navbar/footer */}
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="employees" element={<EmployeePage />} />
        {/* ... other pages ... */}
      </Route>
      
      {/* 2. ADD NEW ROUTE (no sidebar/navbar/footer) */}
      <Route path="/register-employee" element={<EmployeeRegistration />} />
    </Routes>
  );
}

export default App;