const express = require("express");
const router = express.Router();
const {
  getAppointments,
  createAppointment, // Add createAppointment
  getDoctors,
  getInsuranceClaims,
  getMedicalBills,
  getMedicalHistory,
  getMessages,
  getPatients,
  getPrescriptions,
  getReports,
  getVitals,
} = require("../controllers/dataController");
const auth = require("../middleware/auth"); // Assuming you have auth middleware

// @route   GET api/data/appointments
// @desc    Get appointment data
// @access  Public (or Private if auth is needed)
router.get("/appointments", getAppointments);

// @route   POST api/data/appointments
// @desc    Create a new appointment
// @access  Private (requires auth)
router.post("/appointments", auth, createAppointment);

// @route   GET api/data/doctors
// @desc    Get doctor data
// @access  Public (or Private if auth is needed)
router.get("/doctors", getDoctors);

// @route   GET api/data/insurance-claims
// @desc    Get insurance claims data
// @access  Public (or Private)
router.get("/insurance-claims", getInsuranceClaims);

// @route   GET api/data/medical-bills
// @desc    Get medical bills data
// @access  Public (or Private)
router.get("/medical-bills", getMedicalBills);

// @route   GET api/data/medical-history
// @desc    Get medical history data
// @access  Public (or Private)
router.get("/medical-history", getMedicalHistory);

// @route   GET api/data/messages
// @desc    Get messages data
// @access  Public (or Private)
router.get("/messages", getMessages);

// @route   GET api/data/patients
// @desc    Get patient data
// @access  Public (or Private)
router.get("/patients", getPatients);

// @route   GET api/data/prescriptions
// @desc    Get prescriptions data
// @access  Public (or Private)
router.get("/prescriptions", getPrescriptions);

// @route   GET api/data/reports
// @desc    Get reports data
// @access  Public (or Private)
router.get("/reports", getReports);

// @route   GET api/data/vitals
// @desc    Get vitals data
// @access  Public (or Private)
router.get("/vitals", getVitals);

module.exports = router;
