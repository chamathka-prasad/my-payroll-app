# Payroll App - Setup Instructions

## Running the Application

This application now has both a frontend (React) and a backend (Node.js/Express) server.

### Option 1: Run Both Servers Separately

1. **Start the Backend Server** (in one terminal):
   ```bash
   npm run server
   ```
   This will start the backend on `http://localhost:5000`

2. **Start the Frontend** (in another terminal):
   ```bash
   npm start
   ```
   This will start the React app on `http://localhost:3000`

### Option 2: Run Both Together (Recommended)

Install concurrently first:
```bash
npm install concurrently --save-dev
```

Then run both servers together:
```bash
npm run dev
```

## Features

### Employee Registration with Data Persistence

- **Save Employee Data**: All employee information is saved to a JSON file (`data/employees.json`)
- **Image Storage**: Profile images are saved to the `public/images/employees/` folder
- **API Endpoints**:
  - `POST /api/employees` - Save new employee
  - `GET /api/employees` - Get all employees
  - `GET /api/employees/:id` - Get specific employee

### Data Storage Locations

- **Employee Data**: `f:\my-payroll-app\data\employees.json`
- **Profile Images**: `f:\my-payroll-app\public\images\employees\`

## Form Fields Saved

The employee registration form saves the following data:

### Basic Information
- Employee Number
- Display Name
- Category
- Salary Status (Monthly/Daily)
- First Name, Middle Name, Last Name
- NIC
- Mobile Numbers
- Address & City

### Employment Details
- EPF Number
- Department
- Join Date
- Designation
- Inactive Date
- Notes

### Banking Details
- Bank Name
- Branch Name
- Account Number
- Account Name

### Salary Components
- Incentive
- Special Incentive
- Grading Incentive
- Transport Fee
- Basic Salary
- Budget Allowance
- Service Incentive
- Adjustment
- Attendance Rooms

### Dynamic Incentives
- Custom incentive names and amounts (add/remove)

### Payroll Settings
- OT Allowed
- Deductions
- Late Allowed
- ETF Allowed
- EPF Allowed

## Testing

1. Navigate to the Employee Registration page
2. Fill in the employee details
3. Upload a profile image (optional)
4. Click "Save Employee"
5. Check the `data/employees.json` file to see the saved data
6. Check the `public/images/employees/` folder to see the uploaded images

## Notes

- The backend automatically creates the `data` and `public/images/employees` directories if they don't exist
- Images are limited to 5MB
- Only image files (jpg, jpeg, png, gif) are accepted for profile pictures
