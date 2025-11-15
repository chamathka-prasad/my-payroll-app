// Utility functions for managing employee data in localStorage

/**
 * Get all employees from localStorage
 */
export const getEmployees = () => {
  try {
    const employees = localStorage.getItem('employees');
    return employees ? JSON.parse(employees) : [];
  } catch (error) {
    console.error('Error reading employees from localStorage:', error);
    return [];
  }
};

/**
 * Get a single employee by ID
 */
export const getEmployeeById = (id) => {
  const employees = getEmployees();
  return employees.find(emp => emp.id === id);
};

/**
 * Save an employee
 */
export const saveEmployee = (employeeData) => {
  try {
    const employees = getEmployees();

    // Add ID and timestamp if not present
    if (!employeeData.id) {
      employeeData.id = Date.now().toString();
    }
    if (!employeeData.createdAt) {
      employeeData.createdAt = new Date().toISOString();
    }

    employees.push(employeeData);
    localStorage.setItem('employees', JSON.stringify(employees));
    return { success: true, employee: employeeData };
  } catch (error) {
    console.error('Error saving employee:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update an employee
 */
export const updateEmployee = (id, updatedData) => {
  try {
    const employees = getEmployees();
    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) {
      return { success: false, error: 'Employee not found' };
    }

    employees[index] = { ...employees[index], ...updatedData, updatedAt: new Date().toISOString() };
    localStorage.setItem('employees', JSON.stringify(employees));
    return { success: true, employee: employees[index] };
  } catch (error) {
    console.error('Error updating employee:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete an employee
 */
export const deleteEmployee = (id) => {
  try {
    const employees = getEmployees();
    const filtered = employees.filter(emp => emp.id !== id);
    localStorage.setItem('employees', JSON.stringify(filtered));
    return { success: true };
  } catch (error) {
    console.error('Error deleting employee:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Download employees data as JSON file
 */
export const downloadEmployeesJSON = () => {
  try {
    const employees = getEmployees();
    const dataStr = JSON.stringify(employees, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `employees-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error('Error downloading employees JSON:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Import employees from JSON file
 */
export const importEmployeesFromJSON = (jsonData) => {
  try {
    const newEmployees = JSON.parse(jsonData);

    if (!Array.isArray(newEmployees)) {
      return { success: false, error: 'Invalid data format' };
    }

    const existingEmployees = getEmployees();
    const merged = [...existingEmployees, ...newEmployees];

    localStorage.setItem('employees', JSON.stringify(merged));
    return { success: true, count: newEmployees.length };
  } catch (error) {
    console.error('Error importing employees:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Clear all employee data (use with caution!)
 */
export const clearAllEmployees = () => {
  try {
    localStorage.removeItem('employees');
    return { success: true };
  } catch (error) {
    console.error('Error clearing employees:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get employee statistics
 */
export const getEmployeeStats = () => {
  const employees = getEmployees();
  return {
    total: employees.length,
    byCategory: employees.reduce((acc, emp) => {
      acc[emp.category] = (acc[emp.category] || 0) + 1;
      return acc;
    }, {}),
    bySalaryStatus: employees.reduce((acc, emp) => {
      acc[emp.salaryStatus] = (acc[emp.salaryStatus] || 0) + 1;
      return acc;
    }, {})
  };
};
