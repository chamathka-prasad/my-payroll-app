const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Create necessary directories
const dataDir = path.join(__dirname, 'data');
const imagesDir = path.join(__dirname, 'public', 'images', 'employees');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'employee-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Helper function to read employees data
const getEmployeesData = () => {
  const filePath = path.join(dataDir, 'employees.json');
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  return { employees: [] };
};

// Helper function to save employees data
const saveEmployeesData = (data) => {
  const filePath = path.join(dataDir, 'employees.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// POST endpoint to save employee
app.post('/api/employees', upload.single('profileImage'), (req, res) => {
  try {
    const employeeData = JSON.parse(req.body.employeeData);

    // Add image path if file was uploaded
    if (req.file) {
      employeeData.profileImagePath = `/images/employees/${req.file.filename}`;
    }

    // Add timestamp and ID
    employeeData.id = Date.now().toString();
    employeeData.createdAt = new Date().toISOString();

    // Read existing data
    const data = getEmployeesData();

    // Add new employee
    data.employees.push(employeeData);

    // Save to file
    saveEmployeesData(data);

    res.status(201).json({
      success: true,
      message: 'Employee saved successfully',
      employee: employeeData
    });
  } catch (error) {
    console.error('Error saving employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving employee data',
      error: error.message
    });
  }
});

// GET endpoint to retrieve all employees
app.get('/api/employees', (req, res) => {
  try {
    const data = getEmployeesData();
    res.json({
      success: true,
      employees: data.employees
    });
  } catch (error) {
    console.error('Error reading employees:', error);
    res.status(500).json({
      success: false,
      message: 'Error reading employee data',
      error: error.message
    });
  }
});

// GET endpoint to retrieve a single employee
app.get('/api/employees/:id', (req, res) => {
  try {
    const data = getEmployeesData();
    const employee = data.employees.find(emp => emp.id === req.params.id);

    if (employee) {
      res.json({
        success: true,
        employee: employee
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
  } catch (error) {
    console.error('Error reading employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error reading employee data',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Data directory: ${dataDir}`);
  console.log(`Images directory: ${imagesDir}`);
});
