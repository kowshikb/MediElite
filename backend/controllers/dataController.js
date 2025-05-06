const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Import uuid for generating unique IDs

// Helper function to read JSON data
const readJsonData = (filename) => {
  // Construct the path relative to the backend directory
  const filePath = path.join(__dirname, "../../src/data", filename);
  try {
    const rawData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading data file ${filename}:`, error);
    return null; // Or throw error / return default structure
  }
};

// Helper function to write JSON data
const writeJsonData = (filename, data) => {
  const filePath = path.join(__dirname, "../../src/data", filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error(`Error writing data file ${filename}:`, error);
    return false;
  }
};

// Helper function to read JS module data (assuming module.exports = [...] or export default [...])
const readJsData = (filename) => {
  const filePath = path.join(__dirname, "../../src/data", filename);
  try {
    // Use require to load JS modules
    const dataModule = require(filePath);
    // Handle both CommonJS (module.exports) and ES Modules (export default)
    return dataModule.default || dataModule;
  } catch (error) {
    console.error(`Error reading data file ${filename}:`, error);
    return null;
  }
};

// Controller function for appointments
exports.getAppointments = (req, res) => {
  const data = readJsonData("appointments.json");
  if (data) {
    res.json(data);
  } else {
    res.status(500).send("Error reading appointment data");
  }
};

// Controller function for creating an appointment
exports.createAppointment = (req, res) => {
  const { doctorId, doctorName, date, time, type } = req.body;
  const userId = req.user.id; // Assuming user ID is attached by auth middleware

  // Basic validation
  if (!doctorId || !doctorName || !date || !time || !type) {
    return res
      .status(400)
      .json({ msg: "Please provide all required appointment details" });
  }

  const appointments = readJsonData("appointments.json");
  if (!appointments) {
    return res.status(500).send("Error reading appointment data");
  }

  const newAppointment = {
    id: uuidv4(), // Generate a unique ID
    userId, // Link appointment to the logged-in user
    doctorId,
    doctorName,
    date,
    time,
    type,
    status: "Scheduled", // Default status
    createdAt: new Date().toISOString(),
  };

  appointments.push(newAppointment);

  if (writeJsonData("appointments.json", appointments)) {
    res.status(201).json(newAppointment); // Respond with the created appointment
  } else {
    res.status(500).send("Error saving appointment data");
  }
};

// Controller function for doctors
exports.getDoctors = (req, res) => {
  const data = readJsonData("doctors.json");
  if (data) {
    res.json(data);
  } else {
    res.status(500).send("Error reading doctor data");
  }
};

// Controller function for insurance claims
exports.getInsuranceClaims = (req, res) => {
  const data = readJsData("insuranceClaims.js"); // Use readJsData
  if (data) {
    res.json(data);
  } else {
    res.status(500).send("Error reading insurance claims data");
  }
};

// Controller function for medical bills
exports.getMedicalBills = (req, res) => {
  const data = readJsData("medicalBills.js"); // Use readJsData
  if (data) {
    res.json(data);
  } else {
    res.status(500).send("Error reading medical bills data");
  }
};

// Controller function for medical history
exports.getMedicalHistory = (req, res) => {
  const data = readJsData("medicalHistory.js"); // Use readJsData
  if (data) {
    res.json(data);
  } else {
    res.status(500).send("Error reading medical history data");
  }
};

// Controller function for messages
exports.getMessages = (req, res) => {
  const data = readJsonData("messages.json"); // Use readJsonData
  if (data) {
    res.json(data);
  } else {
    res.status(500).send("Error reading messages data");
  }
};

// Controller function for patients
exports.getPatients = (req, res) => {
  const data = readJsonData("patients.json"); // Use readJsonData
  if (data) {
    res.json(data);
  } else {
    res.status(500).send("Error reading patient data");
  }
};

// Controller function for prescriptions
exports.getPrescriptions = (req, res) => {
  const data = readJsData("prescriptions.js"); // Use readJsData
  if (data) {
    res.json(data);
  } else {
    res.status(500).send("Error reading prescriptions data");
  }
};

// Controller function for reports
exports.getReports = (req, res) => {
  const data = readJsonData("reports.json"); // Use readJsonData
  if (data) {
    res.json(data);
  } else {
    res.status(500).send("Error reading reports data");
  }
};

// Controller function for vitals
exports.getVitals = (req, res) => {
  const data = readJsonData("vitals.json"); // Use readJsonData
  if (data) {
    res.json(data);
  } else {
    res.status(500).send("Error reading vitals data");
  }
};
