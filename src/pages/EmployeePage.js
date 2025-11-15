import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { getEmployees, downloadEmployeesJSON } from '../utils/employeeStorage';
import './EmployeePage.css';

// A new component for the static table headers (used above and below the scrollable list)
const TableHeader = () => (
  <div className="emp-table-header d-flex text-center">
    <div className="col-emp-no">EMPLOYEE NO</div>
    <div className="col-epf-no">EPF NO</div>
    <div className="col-display-name">DISPLAY NAME</div>
    <div className="col-name">FIRST NAME</div>
    <div className="col-name">MIDDLE NAME</div>
    <div className="col-name">LAST NAME</div>
    <div className="col-nic">NIC</div>
    <div className="col-mobile">MOBILE</div>
    <div className="col-mobile">MOBILE 2</div>
    <div className="col-address">ADDRESS</div>
    <div className="col-designation">DESIGNATION</div>
    <div className="col-salary">BASIC SALARY</div>
    <div className="col-salary">DAILY SALARY</div>
    <div className="col-salary">BUDGET ALLOWANCE</div>
    <div className="col-salary">INCENTIVE</div>
    <div className="col-salary">SPECIAL INCENTIVE</div>
    <div className="col-salary">SERVICE</div>
  </div>
);

const EmployeePage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load employees from localStorage on component mount
  useEffect(() => {
    loadEmployees();
  }, []);

  // Load employees from localStorage
  const loadEmployees = () => {
    const savedEmployees = getEmployees();
    setEmployees(savedEmployees);
    setFilteredEmployees(savedEmployees);
  };

  // Handle search/filter
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(emp =>
        emp.displayName?.toLowerCase().includes(term) ||
        emp.empNo?.toLowerCase().includes(term) ||
        emp.firstName?.toLowerCase().includes(term) ||
        emp.lastName?.toLowerCase().includes(term)
      );
      setFilteredEmployees(filtered);
    }
  };

  const handleAddEmployee = () => {
    navigate('/register-employee');
  };

  const handleDownloadJSON = () => {
    const result = downloadEmployeesJSON();
    if (result.success) {
      alert('Employee data downloaded successfully!');
    } else {
      alert('Error downloading data: ' + result.error);
    }
  };

  return (
    <div className="employee-page-container">
      {/* 1. Main Header */}
      <div className="page-header d-flex justify-content-between align-items-center mb-3">
        <h5 className="page-title">EMPLOYEES</h5>
        <button className="btn btn-outline-primary btn-sm add-employee-btn" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </div>

      {/* 2. Search Box */}
      <div className="search-box mb-3">
        <h6 className="section-title">SEARCH :-</h6>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search by Display Name, Employee No, First/Last Name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-3">
            <span className="text-muted">Found: {filteredEmployees.length} employees</span>
          </div>
        </div>
      </div>

      {/* 3. EMP LIST Box */}
      <div className="list-box">
        <h6 className="section-title">EMP LIST</h6>
        
        {/* Button/Action Row */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm list-box-btn" onClick={loadEmployees}>Refresh</button>
            <button className="btn btn-outline-primary btn-sm list-box-btn" onClick={handleDownloadJSON}>
              <FontAwesomeIcon icon={faDownload} className="me-1" />
              Download JSON
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span>Total: {filteredEmployees.length}</span>
          </div>
        </div>

        {/* Table wrapper for horizontal scrolling */}
        <div className="table-wrapper">
          <div className="table-content-wrapper">
            {/* Static Table Header (Top) */}
            <TableHeader />

            {/* Scrollable Table Body */}
            <div className="table-scroll-container">
              <table className="table table-bordered table-striped text-center align-middle">
                {/* The table header is intentionally omitted, as it's now static above */}
                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="col-emp-no">{employee.empNo || '-'}</td>
                        <td className="col-epf-no">{employee.epfNumber || '-'}</td>
                        <td className="col-display-name">{employee.displayName || '-'}</td>
                        <td className="col-name">{employee.firstName || '-'}</td>
                        <td className="col-name">{employee.middleName || '-'}</td>
                        <td className="col-name">{employee.lastName || '-'}</td>
                        <td className="col-nic">{employee.nic || '-'}</td>
                        <td className="col-mobile">{employee.mobile || '-'}</td>
                        <td className="col-mobile">{employee.mobile2 || '-'}</td>
                        <td className="col-address">{employee.address || '-'}</td>
                        <td className="col-designation">{employee.designation || '-'}</td>
                        <td className="col-salary">{employee.salaryComponents?.basicSalary || '0.00'}</td>
                        <td className="col-salary">
                          {employee.salaryStatus === 'daily'
                            ? (parseFloat(employee.salaryComponents?.basicSalary || 0) / 30).toFixed(2)
                            : '0.00'}
                        </td>
                        <td className="col-salary">{employee.salaryComponents?.budgetAllowance || '0.00'}</td>
                        <td className="col-salary">{employee.salaryComponents?.incentive || '0.00'}</td>
                        <td className="col-salary">{employee.salaryComponents?.specialIncentive || '0.00'}</td>
                        <td className="col-salary">{employee.salaryComponents?.serviceIncentive || '0.00'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="17" className="text-center py-5">
                        <div>
                          <p className="mb-2">No employees found</p>
                          <button className="btn btn-primary btn-sm" onClick={handleAddEmployee}>
                            Add First Employee
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Static Table Header (Bottom) */}
            <TableHeader />
          </div>
        </div>
      </div>

      {/* 4. Pagination */}
      <nav className="mt-3">
        <ul className="pagination pagination-sm justify-content-start">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default EmployeePage;