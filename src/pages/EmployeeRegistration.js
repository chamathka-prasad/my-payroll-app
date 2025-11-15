import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faPlus,
  faTimes,
  faTrash,
  faUser,
  faSave,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import './EmployeeRegistration.css';

const EmployeeRegistration = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [dynamicIncentives, setDynamicIncentives] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add dynamic incentive
  const addDynamicIncentive = () => {
    setDynamicIncentives([
      ...dynamicIncentives,
      { id: Date.now(), name: '', amount: '0.00' }
    ]);
  };

  // Remove dynamic incentive
  const removeDynamicIncentive = (id) => {
    setDynamicIncentives(dynamicIncentives.filter((item) => item.id !== id));
  };

  // Update dynamic incentive
  const updateDynamicIncentive = (id, field, value) => {
    setDynamicIncentives(
      dynamicIncentives.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get the form element from ref or from event target
      const form = formRef.current || e.target;
      const formData = new FormData(form);

      // Collect all form data
      const employeeData = {
        // Generate unique ID
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),

        // Basic Information
        empNo: formData.get('empNo'),
        displayName: formData.get('displayName'),
        category: formData.get('category'),
        salaryStatus: formData.get('salaryStatus'),
        firstName: formData.get('firstName'),
        middleName: formData.get('middleName'),
        lastName: formData.get('lastName'),
        nic: formData.get('nic'),
        mobile: formData.get('mobile'),
        mobile2: formData.get('mobile2'),
        address: formData.get('address'),
        city: formData.get('city'),

        // Employment Details
        epfNumber: formData.get('epfNumber'),
        department: formData.get('department'),
        joinDate: formData.get('joinDate'),
        designation: formData.get('designation'),
        inactiveDate: formData.get('inactiveDate'),
        notes: formData.get('notes'),

        // Banking Details
        bankName: formData.get('bankName'),
        branchName: formData.get('branchName'),
        accountNumber: formData.get('accountNumber'),
        accountName: formData.get('accountName'),

        // Salary Components
        salaryComponents: {
          incentive: formData.get('incentive') || '0.00',
          specialIncentive: formData.get('specialIncentive') || '0.00',
          gradingIncentive: formData.get('gradingIncentive') || '0.00',
          transportFee: formData.get('transportFee') || '0.00',
          basicSalary: formData.get('basicSalary') || '0.00',
          budgetAllowance: formData.get('budgetAllowance') || '0.00',
          serviceIncentive: formData.get('serviceIncentive') || '0.00',
          adjustment: formData.get('adjustment') || '0.00',
          attendanceRooms: formData.get('attendanceRooms') || '0.00'
        },

        // Dynamic Incentives
        dynamicIncentives: dynamicIncentives,

        // Payroll Settings
        payrollSettings: {
          otAllowed: formData.get('otAllowed') === 'on',
          deductions: formData.get('deductions') === 'on',
          lateAllowed: formData.get('lateAllowed') === 'on',
          etfAllowed: formData.get('etfAllowed') === 'on',
          epfAllowed: formData.get('epfAllowed') === 'on'
        },

        // Save profile image as base64 string
        profileImage: profileImage || null
      };

      // Get existing employees from localStorage
      const existingEmployees = JSON.parse(localStorage.getItem('employees') || '[]');

      // Add new employee
      existingEmployees.push(employeeData);

      // Save back to localStorage
      localStorage.setItem('employees', JSON.stringify(existingEmployees));

      // Also save as a downloadable JSON file (optional)
      const dataStr = JSON.stringify(existingEmployees, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      // Create a temporary link to download the file
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'employees-backup.json';

      // Optionally auto-download (commented out by default)
      // downloadLink.click();

      console.log('Employee saved to localStorage!');
      console.log('Total employees:', existingEmployees.length);
      console.log('Download backup available at:', url);

      alert('Employee saved successfully to browser storage!');
      navigate('/employees');

    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Error saving employee data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handler for the save button in header
  const handleSaveClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className="employee-registration-page">
      {/* Header Bar */}
      <div className="registration-header">
        <button className="btn-back" onClick={() => navigate('/employees')}>
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to Employees
        </button>
        <h2 className="page-title">New Employee Registration</h2>
        <div className="header-actions">
          <button type="button" className="btn-save" onClick={handleSaveClick}>
            <FontAwesomeIcon icon={faSave} className="me-2" />
            Save Employee
          </button>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="registration-form">

        {/* SECTION 1: NEW USER PROFILE */}
        <div className="form-card">
          <div className="card-header-custom">
            <h3 className="section-heading">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              NEW USER PROFILE
            </h3>
          </div>
          <div className="card-body-custom">
            <div className="row">
              {/* Profile Image Upload */}
              <div className="col-lg-3 col-md-4">
                <div className="profile-upload-section">
                  <div className="profile-image-preview">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" />
                    ) : (
                      <FontAwesomeIcon icon={faUser} className="placeholder-icon" />
                    )}
                  </div>
                  <label htmlFor="imageUpload" className="btn-upload">
                    <FontAwesomeIcon icon={faUpload} className="me-2" />
                    UPLOAD IMAGE
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <p className="upload-hint">Max size: 2MB</p>
                </div>
              </div>

              {/* Basic Information Fields */}
              <div className="col-lg-9 col-md-8">
                <h4 className="subsection-title">BASIC INFORMATION</h4>

                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">EMP NO *</label>
                    <input type="text" name="empNo" className="form-control" placeholder="Enter employee number" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">DISPLAY NAME *</label>
                    <input type="text" name="displayName" className="form-control" placeholder="Enter display name" required />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">CATEGORY *</label>
                    <select name="category" className="form-select" required>
                      <option value="">Select Team</option>
                      <option value="management">Management</option>
                      <option value="operations">Operations</option>
                      <option value="sales">Sales</option>
                      <option value="it">IT</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">SALARY STATUS *</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input type="radio" name="salaryStatus" value="monthly" defaultChecked />
                        <span>MONTHLY SALARY</span>
                      </label>
                      <label className="radio-label">
                        <input type="radio" name="salaryStatus" value="daily" />
                        <span>DAILY SALARY</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">FIRST NAME *</label>
                    <input type="text" name="firstName" className="form-control" placeholder="First name" required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">MIDDLE NAME</label>
                    <input type="text" name="middleName" className="form-control" placeholder="Middle name" />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">LAST NAME *</label>
                    <input type="text" name="lastName" className="form-control" placeholder="Last name" required />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">NIC *</label>
                    <input type="text" name="nic" className="form-control" placeholder="National ID" required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">EMAIL *</label>
                    <input type="email" name="email" className="form-control" placeholder="email@example.com" required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">QUALIFICATIONS</label>
                    <input type="text" name="qualifications" className="form-control" placeholder="Educational qualifications" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">GENDER *</label>
                    <select name="gender" className="form-select" required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">CIVIL STATUS *</label>
                    <select name="civilStatus" className="form-select" required>
                      <option value="">Select Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">CONTACT NO *</label>
                    <input type="tel" name="mobile" className="form-control" placeholder="Phone number" required />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">ADDRESS *</label>
                    <textarea name="address" className="form-control" rows="2" placeholder="Full address" required></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: ADDITIONAL DETAILS - EMPLOYMENT */}
        <div className="form-card">
          <div className="card-header-custom">
            <h3 className="section-heading">ADDITIONAL DETAILS - EMPLOYMENT</h3>
          </div>
          <div className="card-body-custom">
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">EPF NO</label>
                <input type="text" name="epfNumber" className="form-control" placeholder="EPF number" />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">CATEGORY</label>
                <select name="employeeCategory" className="form-select">
                  <option value="">Select Employee Category</option>
                  <option value="permanent">Permanent</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                  <option value="intern">Intern</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">JOIN DATE *</label>
                <input type="date" name="joinDate" className="form-control" required />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">LEAVES</label>
                <input type="number" name="annualLeaves" className="form-control" placeholder="Annual leave days" defaultValue="0" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">SALARY TYPE</label>
                <select name="salaryType" className="form-select">
                  <option value="">Select Salary Type</option>
                  <option value="fixed">Fixed</option>
                  <option value="hourly">Hourly</option>
                  <option value="commission">Commission</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">DEPARTMENT</label>
                <select name="department" className="form-select">
                  <option value="">Select Employee Department</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="it">IT</option>
                  <option value="sales">Sales</option>
                  <option value="operations">Operations</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">RESIGN DATE</label>
                <input type="date" name="inactiveDate" className="form-control" />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">REMARKS</label>
                <input type="text" name="notes" className="form-control" placeholder="Additional notes" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: PAYROLL - BANKING */}
        <div className="form-card">
          <div className="card-header-custom">
            <h3 className="section-heading">PAYROLL - BANKING</h3>
          </div>
          <div className="card-body-custom">
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">BANK</label>
                <select name="bankName" className="form-select">
                  <option value="">Select Bank</option>
                  <option value="bank1">Commercial Bank</option>
                  <option value="bank2">Bank of Ceylon</option>
                  <option value="bank3">People's Bank</option>
                  <option value="bank4">Sampath Bank</option>
                  <option value="bank5">HNB</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">BANK CODE</label>
                <input type="text" name="bankCode" className="form-control" placeholder="Bank code" />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">BRANCH</label>
                <select name="branchName" className="form-select">
                  <option value="">Select Branch</option>
                  <option value="branch1">Colombo</option>
                  <option value="branch2">Kandy</option>
                  <option value="branch3">Galle</option>
                  <option value="branch4">Negombo</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">BRANCH CODE</label>
                <input type="text" name="branchCode" className="form-control" placeholder="Branch code" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">ACCOUNT NO</label>
                <input type="text" name="accountNumber" className="form-control" placeholder="Bank account number" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: SALARY COMPONENTS */}
        <div className="form-card">
          <div className="card-header-custom">
            <h3 className="section-heading">SALARY COMPONENTS</h3>
          </div>
          <div className="card-body-custom">
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                <div className="salary-field">
                  <label>INCENTIVE</label>
                  <input type="number" name="incentive" className="form-control" step="0.01" defaultValue="0.00" />
                </div>
                <div className="salary-field">
                  <label>SPECIAL INCENTIVE</label>
                  <input type="number" name="specialIncentive" className="form-control" step="0.01" defaultValue="0.00" />
                </div>
                <div className="salary-field">
                  <label>GRADING INCENTIVE</label>
                  <input type="number" name="gradingIncentive" className="form-control" step="0.01" defaultValue="0.00" />
                </div>
                <div className="salary-field">
                  <label>TRANSPORT FEE</label>
                  <input type="number" name="transportFee" className="form-control" step="0.01" defaultValue="0.00" />
                </div>
              </div>

              {/* Right Column */}
              <div className="col-md-6">
                <div className="salary-field">
                  <label>BASIC SALARY</label>
                  <input type="number" name="basicSalary" className="form-control" step="0.01" defaultValue="0.00" />
                </div>
                <div className="salary-field">
                  <label>BUDGET ALLOWANCE</label>
                  <input type="number" name="budgetAllowance" className="form-control" step="0.01" defaultValue="0.00" />
                </div>
                <div className="salary-field">
                  <label>SERVICE INCENTIVE</label>
                  <input type="number" name="serviceIncentive" className="form-control" step="0.01" defaultValue="0.00" />
                </div>
                <div className="salary-field">
                  <label>ADJUSTMENT</label>
                  <input type="number" name="adjustment" className="form-control" step="0.01" defaultValue="0.00" />
                </div>
                <div className="salary-field">
                  <label>ATTENDANCE ROOMS</label>
                  <input type="number" name="attendanceRooms" className="form-control" step="0.01" defaultValue="0.00" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: DYNAMIC INCENTIVES */}
        <div className="form-card">
          <div className="card-header-custom">
            <h3 className="section-heading">DYNAMIC INCENTIVES</h3>
            <button
              type="button"
              className="btn-add-incentive"
              onClick={addDynamicIncentive}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              ADD INCENTIVE
            </button>
          </div>
          <div className="card-body-custom">
            {dynamicIncentives.length === 0 ? (
              <div className="empty-state">
                <FontAwesomeIcon icon={faPlus} className="empty-icon" />
                <p className="empty-text">NO DYNAMIC INCENTIVES ADDED YET</p>
                <button
                  type="button"
                  className="btn-add-first"
                  onClick={addDynamicIncentive}
                >
                  + Add Your First Incentive
                </button>
              </div>
            ) : (
              <div className="dynamic-incentives-list">
                {dynamicIncentives.map((incentive) => (
                  <div key={incentive.id} className="dynamic-incentive-item">
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Incentive name"
                          value={incentive.name}
                          onChange={(e) =>
                            updateDynamicIncentive(incentive.id, 'name', e.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-5">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Amount"
                          step="0.01"
                          value={incentive.amount}
                          onChange={(e) =>
                            updateDynamicIncentive(incentive.id, 'amount', e.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-2">
                        <button
                          type="button"
                          className="btn-delete-incentive"
                          onClick={() => removeDynamicIncentive(incentive.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SECTION 6: PAYROLL SETTINGS */}
        <div className="form-card">
          <div className="card-header-custom">
            <h3 className="section-heading">PAYROLL SETTINGS</h3>
          </div>
          <div className="card-body-custom">
            <div className="row">
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="checkbox-field">
                  <input type="checkbox" name="otAllowed" id="otAllowed" className="form-check-input" />
                  <label htmlFor="otAllowed" className="form-check-label">
                    OT ALLOWED
                  </label>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="checkbox-field">
                  <input type="checkbox" name="deductions" id="deductions" className="form-check-input" />
                  <label htmlFor="deductions" className="form-check-label">
                    DEDUCTIONS
                  </label>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="checkbox-field">
                  <input type="checkbox" name="lateAllowed" id="lateAllowed" className="form-check-input" />
                  <label htmlFor="lateAllowed" className="form-check-label">
                    LATE ALLOWED
                  </label>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="checkbox-field">
                  <input type="checkbox" name="etfAllowed" id="etfAllowed" className="form-check-input" />
                  <label htmlFor="etfAllowed" className="form-check-label">
                    ETF ALLOWED
                  </label>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="checkbox-field">
                  <input type="checkbox" name="epfAllowed" id="epfAllowed" className="form-check-input" />
                  <label htmlFor="epfAllowed" className="form-check-label">
                    EPF ALLOWED
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate('/employees')}
          >
            <FontAwesomeIcon icon={faTimes} className="me-2" />
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            <FontAwesomeIcon icon={faSave} className="me-2" />
            Save Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegistration;
