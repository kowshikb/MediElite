import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// FlyAwayText Component
const FlyAwayText = ({ text, position }) => (
  <div
    style={{
      position: "fixed",
      left: position.x,
      top: position.y,
      zIndex: 9999,
    }}
  >
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -100 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="text-emerald-600 font-medium bg-white px-4 py-2 rounded-lg shadow-lg border border-emerald-100 whitespace-nowrap"
    >
      {text}
    </motion.div>
  </div>
);

// Status Badge Component
const StatusBadge = ({ status }) => {
  let colorClasses = "bg-gray-100 text-gray-800"; // Default styling
  let label = status;

  switch (status.toLowerCase()) {
    case "pending":
      colorClasses = "bg-yellow-100 text-yellow-800";
      break;
    case "approved":
    case "paid":
    case "completed":
      colorClasses = "bg-green-100 text-green-800";
      break;
    case "denied":
    case "rejected":
      colorClasses = "bg-red-100 text-red-800";
      break;
    case "ongoing":
      colorClasses = "bg-blue-100 text-blue-800";
      break;
    case "resolved":
      colorClasses = "bg-green-100 text-green-800";
      break;
    case "recurring":
      colorClasses = "bg-purple-100 text-purple-800";
      break;
    default:
      colorClasses = "bg-gray-100 text-gray-800";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}
    >
      {label}
    </span>
  );
};

// Toast notification component
const Toast = ({ message, type, onClose }) => {
  const styles =
    type === "success"
      ? {
          bg: "bg-emerald-50",
          text: "text-emerald-800",
          icon: "text-emerald-400",
          border: "border-emerald-200",
        }
      : {
          bg: "bg-red-50",
          text: "text-red-800",
          icon: "text-red-400",
          border: "border-red-200",
        };

  const icon = type === "success" ? "✓" : "✕";

  // Automatically close toast after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 right-4 z-50 max-w-md"
    >
      <div
        className={`p-4 rounded-lg shadow-lg ${styles.bg} border ${styles.border}`}
      >
        <div className="flex">
          <div className={`flex-shrink-0 ${styles.icon}`}>
            <span
              className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${styles.bg} ${styles.text}`}
            >
              {icon}
            </span>
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 ${styles.text} hover:${styles.bg} focus:outline-none`}
              >
                <span className="sr-only">Close</span>
                <span className="h-5 w-5">×</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Bill Details Modal Component
const BillDetailsModal = ({ bill, onClose }) => {
  // Auto-close after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 pb-4 mb-4">
          <h3 className="text-xl font-bold text-emerald-900">Bill Details</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Provider</p>
              <p className="font-medium text-gray-900">{bill.provider}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Service Date</p>
              <p className="font-medium text-gray-900">
                {new Date(bill.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="font-medium text-gray-900">{bill.service}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="font-medium text-gray-900">
                ${bill.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="mt-1">
                <StatusBadge status={bill.status} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Claim Details Modal Component
const ClaimDetailsModal = ({ claim, onClose }) => {
  // Auto-close after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 pb-4 mb-4">
          <h3 className="text-xl font-bold text-emerald-900">Claim Details</h3>
          <p className="text-sm text-gray-500 mt-1">
            Tap anywhere outside to close
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Claim Number</p>
              <p className="font-medium text-gray-900">{claim.claimNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date Submitted</p>
              <p className="font-medium text-gray-900">
                {new Date(claim.dateSubmitted).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount Claimed</p>
              <p className="font-medium text-gray-900">
                ${claim.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="mt-1">
                <StatusBadge status={claim.status} />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Coverage</p>
              <p className="font-medium text-gray-900">{claim.coverage}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Date</p>
              <p className="font-medium text-gray-900">
                {claim.paymentDate
                  ? new Date(claim.paymentDate).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Medical Records Modal Component
const MedicalRecordsModal = ({ record, onClose }) => {
  // Auto-close after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 pb-4 mb-4">
          <h3 className="text-xl font-bold text-emerald-900">
            Medical Records
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              {record.condition}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Diagnosed Date</p>
                <p className="font-medium text-gray-900">
                  {new Date(record.diagnosedDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Treated By</p>
                <p className="font-medium text-gray-900">{record.treatedBy}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className="mt-1">
                  <StatusBadge status={record.status} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-2">Treatment Notes</p>
            <p className="text-gray-700">{record.notes}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Treatment Timeline</p>
            <div className="space-y-3">
              {[
                {
                  date: record.diagnosedDate,
                  event: "Initial Diagnosis",
                  details: `Diagnosed by ${record.treatedBy}`,
                },
                {
                  date: new Date(
                    new Date(record.diagnosedDate).getTime() +
                      7 * 24 * 60 * 60 * 1000
                  ).toISOString(),
                  event: "Follow-up Appointment",
                  details: "Reviewed treatment progress",
                },
                {
                  date: new Date(
                    new Date(record.diagnosedDate).getTime() +
                      30 * 24 * 60 * 60 * 1000
                  ).toISOString(),
                  event: "Treatment Review",
                  details: "Assessed condition management",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-2 w-2 mt-2 rounded-full bg-emerald-500 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(item.date).toLocaleDateString()} - {item.event}
                    </p>
                    <p className="text-sm text-gray-600">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Refill Confirm Modal Component
const RefillConfirmModal = ({ prescription, onClose }) => {
  // Auto-close after 4 seconds
  React.useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">💊</span>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-emerald-900">
              Refill Request Sent!
            </h3>
            <p className="text-gray-600 mt-1">
              Your medicines will be delivered within 1 hour
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Prescriptions Section Component
const PrescriptionsSection = ({ prescriptions }) => {
  const [refillRequested, setRefillRequested] = useState({});
  const [flyAwayText, setFlyAwayText] = useState(null);

  const handleRefillRequest = (prescription, event) => {
    // Get button position for flyaway text
    const rect = event.currentTarget.getBoundingClientRect();

    setRefillRequested((prev) => ({
      ...prev,
      [prescription.id]: true,
    }));

    setFlyAwayText({
      text: "Refill request sent! You'll receive your medication in 30 minutes",
      position: {
        x: rect.left,
        y: rect.top,
      },
    });

    // Clear flyaway text after animation
    setTimeout(() => {
      setFlyAwayText(null);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      {/* Flyaway Text */}
      <AnimatePresence>
        {flyAwayText && (
          <FlyAwayText
            text={flyAwayText.text}
            position={flyAwayText.position}
          />
        )}
      </AnimatePresence>

      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            Active Prescriptions
          </h2>
        </div>
      </div>

      <div className="grid gap-4 p-6">
        {prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {prescription.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Prescribed by {prescription.prescribedBy} on{" "}
                  {new Date(prescription.date).toLocaleDateString()}
                </p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                  <div>
                    <span className="text-xs text-gray-500 block">Dosage</span>
                    <span className="font-medium text-gray-700">
                      {prescription.dosage}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">
                      Frequency
                    </span>
                    <span className="font-medium text-gray-700">
                      {prescription.frequency}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">
                      Duration
                    </span>
                    <span className="font-medium text-gray-700">
                      {prescription.duration}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Refills</span>
                    <span className="font-medium text-gray-700">
                      {prescription.refills}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
              {refillRequested[prescription.id] ? (
                <div className="px-4 py-2 bg-white text-emerald-600 rounded-lg border border-emerald-200 font-medium">
                  Refill Requested
                </div>
              ) : (
                <button
                  onClick={(e) => handleRefillRequest(prescription, e)}
                  className="px-4 py-2 bg-white text-rose-600 rounded-lg border border-rose-200 font-medium transition-transform duration-300 transform hover:scale-105 active:scale-95"
                  style={{
                    "--tw-hover-bg": "inherit",
                    "--tw-hover-text": "inherit",
                    "--tw-hover-border": "inherit",
                  }}
                >
                  Request Refill
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {prescriptions.length === 0 && (
        <div className="p-12 text-center">
          <div className="inline-flex rounded-full bg-blue-50 p-4 mb-4">
            <div className="text-3xl">💊</div>
          </div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            No Active Prescriptions
          </p>
          <p className="text-gray-500">
            You don't have any active prescriptions at the moment.
          </p>
        </div>
      )}
    </motion.div>
  );
};

// New Claim Form modal component
const NewClaimForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    provider: "",
    amount: "",
    serviceType: "",
    description: "",
    policyNumber: "POL-123456", // Pre-filled
    attachments: [],
  });
  const [fileError, setFileError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    setFileError("");

    // Allow only single file
    if (files.length > 1) {
      setFileError("Please upload only one file at a time");
      return;
    }

    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowedTypes.includes(files[0].type)) {
      setFileError("Only PNG, JPG, and PDF files are allowed");
      return;
    }

    // Validate file size
    if (files[0].size > 10 * 1024 * 1024) {
      setFileError("File must be smaller than 10MB");
      return;
    }

    setFormData({
      ...formData,
      attachments: files,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-emerald-900">
              File New Insurance Claim
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="provider"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Provider Name
              </label>
              <input
                type="text"
                id="provider"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                required
                className="form-input w-full rounded-md border-gray-300"
                placeholder="E.g., General Hospital"
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Claim Amount ($)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="form-input w-full rounded-md border-gray-300"
                placeholder="0.00"
              />
            </div>

            <div>
              <label
                htmlFor="serviceType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Type of Service
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className="form-select w-full rounded-md border-gray-300"
              >
                <option value="">Select service type</option>
                <option value="consultation">Consultation</option>
                <option value="emergency">Emergency</option>
                <option value="dental">Dental</option>
                <option value="vision">Vision</option>
                <option value="laboratory">Laboratory</option>
                <option value="imaging">Imaging/Diagnostics</option>
                <option value="procedure">Medical Procedure</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="form-textarea w-full rounded-md border-gray-300"
                placeholder="Brief description of the services received"
              ></textarea>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="policyNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Policy Number
              </label>
              <input
                type="text"
                id="policyNumber"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                disabled
                className="form-input w-full rounded-md border-gray-300 bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your policy number is pre-filled
              </p>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Documents
              </label>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="flex items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-md hover:border-emerald-300 transition-colors"
              >
                <div className="space-y-1 text-center">
                  <div className="text-gray-400 text-3xl mb-2">📄</div>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        className="sr-only"
                        accept=".png,.jpg,.jpeg,.pdf"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF up to 10MB (single file only)
                  </p>
                  {fileError && (
                    <p className="text-xs text-red-500 mt-1">{fileError}</p>
                  )}
                  {formData.attachments.length > 0 && (
                    <p className="text-xs text-emerald-500 mt-1">
                      {formData.attachments[0].name} selected
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 p-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white no-hover"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 no-hover"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Tab Button Component for vertical sidebar
const SidebarTab = ({ active, onClick, icon, text }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.98 }}
    className={`px-4 py-3 rounded-xl flex items-center space-x-3 transition-all w-full no-hover
      ${
        active
          ? "bg-emerald-50 text-emerald-600 font-medium shadow-sm border border-emerald-100"
          : "text-gray-600 border border-transparent"
      }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{text}</span>
  </motion.button>
);

// Medical Bills Section with updated buttons based on status
const BillsSection = ({ bills, onPayBill, onViewBill }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card overflow-hidden"
  >
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-gray-800">Medical Bills</h2>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              Provider
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              Service
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {bills.map((bill) => (
            <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-700">
                {new Date(bill.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                {bill.provider}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {bill.service}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                ${bill.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm">
                <StatusBadge status={bill.status} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onViewBill(bill)}
                    className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium no-hover"
                  >
                    View
                  </button>

                  {bill.status.toLowerCase() === "pending" && (
                    <button
                      onClick={() => onPayBill(bill)}
                      className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium no-hover"
                    >
                      Pay
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {bills.length === 0 && (
      <div className="p-12 text-center">
        <div className="inline-flex rounded-full bg-blue-50 p-4 mb-4">
          <div className="text-3xl">📄</div>
        </div>
        <p className="text-lg font-medium text-gray-700 mb-2">
          No Medical Bills
        </p>
        <p className="text-gray-500">
          You don't have any medical bills at the moment.
        </p>
      </div>
    )}
  </motion.div>
);

// Medical History Section with fixed alignment
const HistorySection = ({ history }) => {
  const [viewingRecord, setViewingRecord] = useState(null);

  // Sort history by date in descending order
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.diagnosedDate) - new Date(a.diagnosedDate)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      {/* Medical Records Modal */}
      <AnimatePresence>
        {viewingRecord && (
          <MedicalRecordsModal
            record={viewingRecord}
            onClose={() => setViewingRecord(null)}
          />
        )}
      </AnimatePresence>

      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Medical History</h2>
        </div>
      </div>

      <div className="grid gap-4 p-6">
        {sortedHistory.map((record) => (
          <div
            key={record.id}
            className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {record.condition}
                </h3>
                <p className="text-sm text-gray-600">
                  Diagnosed on{" "}
                  {new Date(record.diagnosedDate).toLocaleDateString()} by{" "}
                  {record.treatedBy}
                </p>
              </div>
              <StatusBadge status={record.status} />
            </div>

            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <span className="text-xs text-gray-500 block mb-1">Notes</span>
                <p className="font-medium text-gray-700">{record.notes}</p>
              </div>
              <button
                onClick={() => setViewingRecord(record)}
                className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium no-hover ml-4"
              >
                View Full Records
              </button>
            </div>
          </div>
        ))}
      </div>

      {history.length === 0 && (
        <div className="p-12 text-center">
          <div className="inline-flex rounded-full bg-blue-50 p-4 mb-4">
            <div className="text-3xl">📋</div>
          </div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            No Medical History
          </p>
          <p className="text-gray-500">
            Your medical history records will appear here.
          </p>
        </div>
      )}
    </motion.div>
  );
};

// Insurance Claims Section with file new claim button
const ClaimsSection = ({ claims, onFileNewClaim }) => {
  const [viewingClaim, setViewingClaim] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card overflow-hidden"
    >
      {/* Claim Details Modal */}
      <AnimatePresence>
        {viewingClaim && (
          <ClaimDetailsModal
            claim={viewingClaim}
            onClose={() => setViewingClaim(null)}
          />
        )}
      </AnimatePresence>

      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Insurance Claims</h2>
          <button
            onClick={onFileNewClaim}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg flex items-center justify-center space-x-2 no-hover"
          >
            <span className="text-lg">+</span>
            <span>File New Claim</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                Claim #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                Date Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                Coverage
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                Payment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {claims.map((claim) => (
              <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                  {claim.claimNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {new Date(claim.dateSubmitted).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  ${claim.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status={claim.status} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {claim.coverage}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {claim.paymentDate
                    ? new Date(claim.paymentDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => setViewingClaim(claim)}
                    className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium no-hover"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {claims.length === 0 && (
        <div className="p-12 text-center">
          <div className="inline-flex rounded-full bg-blue-50 p-4 mb-4">
            <div className="text-3xl">🧾</div>
          </div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            No Insurance Claims
          </p>
          <p className="text-gray-500">
            You haven't filed any insurance claims yet.
          </p>
        </div>
      )}
    </motion.div>
  );
};

const HealthAndClaims = () => {
  const [activeTab, setActiveTab] = useState("bills");
  const [showNewClaimForm, setShowNewClaimForm] = useState(false);
  const [toast, setToast] = useState(null);

  // For adding a new claim temporarily
  const [claims, setClaims] = useState([
    {
      id: 1,
      claimNumber: "CLM-23456",
      dateSubmitted: "2025-03-25",
      amount: 378.45,
      status: "approved",
      paymentDate: "2025-04-01",
      coverage: "Full Coverage",
    },
    {
      id: 2,
      claimNumber: "CLM-23422",
      dateSubmitted: "2025-02-12",
      amount: 125.0,
      status: "pending",
      paymentDate: null,
      coverage: "Partial (80%)",
    },
    {
      id: 3,
      claimNumber: "CLM-23301",
      dateSubmitted: "2025-01-20",
      amount: 75.5,
      status: "approved",
      paymentDate: "2025-01-27",
      coverage: "Full Coverage",
    },
  ]);

  // Mock data for bills section with ability to pay
  const [medicalBills, setMedicalBills] = useState([
    {
      id: 1,
      date: "2025-03-22",
      provider: "General Hospital",
      amount: 378.45,
      status: "paid",
      service: "Consultation + Lab Tests",
    },
    {
      id: 2,
      date: "2025-02-10",
      provider: "City Medical Center",
      amount: 125.0,
      status: "pending",
      service: "X-Ray",
    },
    {
      id: 3,
      date: "2025-01-15",
      provider: "Dr. Williams Clinic",
      amount: 75.5,
      status: "paid",
      service: "Follow-up Visit",
    },
  ]);

  const prescriptions = [
    {
      id: 1,
      name: "Amoxicillin",
      prescribedBy: "Dr. Sarah Lee",
      date: "2025-03-20",
      dosage: "500mg",
      frequency: "3 times daily",
      duration: "7 days",
      refills: 2,
    },
    {
      id: 2,
      name: "Loratadine",
      prescribedBy: "Dr. Michael Chen",
      date: "2025-02-28",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "30 days",
      refills: 2,
    },
    {
      id: 3,
      name: "Metformin",
      prescribedBy: "Dr. James Wilson",
      date: "2025-01-10",
      dosage: "850mg",
      frequency: "Twice daily",
      duration: "90 days",
      refills: 3,
    },
  ];

  const medicalHistory = [
    {
      id: 1,
      condition: "Hypertension",
      diagnosedDate: "2023-06-15",
      treatedBy: "Dr. James Wilson",
      status: "ongoing",
      notes: "Being managed with regular medication",
    },
    {
      id: 2,
      condition: "Respiratory Infection",
      diagnosedDate: "2024-11-10",
      treatedBy: "Dr. Sarah Lee",
      status: "resolved",
      notes: "Treated with antibiotics for 10 days",
    },
    {
      id: 3,
      condition: "Seasonal Allergies",
      diagnosedDate: "2022-03-22",
      treatedBy: "Dr. Michael Chen",
      status: "recurring",
      notes: "Flares up in spring, managed with antihistamines",
    },
  ];

  // Sort medical history by diagnosed date in descending order
  const sortedMedicalHistory = [...medicalHistory].sort(
    (a, b) => new Date(b.diagnosedDate) - new Date(a.diagnosedDate)
  );

  // Handle showing payment success toast
  const handlePayBill = (bill) => {
    // Update bill status to paid
    const updatedBills = medicalBills.map((b) =>
      b.id === bill.id ? { ...b, status: "paid" } : b
    );
    setMedicalBills(updatedBills);

    // Show success toast
    setToast({
      message: `Payment of $${bill.amount.toFixed(2)} to ${
        bill.provider
      } successful!`,
      type: "success",
    });
  };

  // Handle submitting a new claim
  const handleSubmitClaim = (formData) => {
    const newClaim = {
      id: claims.length + 1,
      claimNumber: `CLM-${Math.floor(10000 + Math.random() * 90000)}`,
      dateSubmitted: new Date().toISOString().split("T")[0],
      amount: parseFloat(formData.amount),
      status: "pending",
      paymentDate: null,
      coverage: "Pending Review",
    };

    setClaims([newClaim, ...claims]);
    setActiveTab("claims");
    setToast({
      message: "Your claim has been submitted successfully!",
      type: "success",
    });
  };

  // Close toast notification
  const closeToast = () => {
    setToast(null);
  };

  // Add new state for viewing bills
  const [viewingBill, setViewingBill] = useState(null);

  // Handle viewing bill details
  const handleViewBill = (bill) => {
    setViewingBill(bill);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={closeToast}
          />
        )}
      </AnimatePresence>

      {/* Bill Details Modal */}
      <AnimatePresence>
        {viewingBill && (
          <BillDetailsModal
            bill={viewingBill}
            onClose={() => setViewingBill(null)}
          />
        )}
      </AnimatePresence>

      {/* File New Claim Modal */}
      <AnimatePresence>
        {showNewClaimForm && (
          <NewClaimForm
            onClose={() => setShowNewClaimForm(false)}
            onSubmit={handleSubmitClaim}
          />
        )}
      </AnimatePresence>

      {/* Header with enhanced gradient background */}
      <div className="relative overflow-hidden glass-card bg-gradient-to-r from-emerald-700 to-green-400 rounded-3xl p-4 md:p-6 mb-6">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
              Health & Claims
            </h1>
            <p className="text-blue-100 text-sm md:text-base mt-1">
              Manage your medical records, bills, prescriptions, and insurance
              claims
            </p>
          </div>
        </div>
        {/* Enhanced decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-blue-300 rounded-full filter blur-xl opacity-20"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-300 rounded-full filter blur-xl opacity-10"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar navigation */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-xl p-4 sticky top-6">
            <div className="space-y-1">
              <SidebarTab
                active={activeTab === "bills"}
                onClick={() => setActiveTab("bills")}
                icon="💳"
                text="Medical Bills"
              />
              <SidebarTab
                active={activeTab === "prescriptions"}
                onClick={() => setActiveTab("prescriptions")}
                icon="💊"
                text="Prescriptions"
              />
              <SidebarTab
                active={activeTab === "history"}
                onClick={() => setActiveTab("history")}
                icon="📋"
                text="Medical History"
              />
              <SidebarTab
                active={activeTab === "claims"}
                onClick={() => setActiveTab("claims")}
                icon="📝"
                text="Insurance Claims"
              />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="md:col-span-3">
          {/* Content based on selected tab */}
          {activeTab === "bills" && (
            <BillsSection
              bills={medicalBills}
              onPayBill={handlePayBill}
              onViewBill={handleViewBill}
            />
          )}

          {activeTab === "prescriptions" && (
            <PrescriptionsSection prescriptions={prescriptions} />
          )}

          {activeTab === "history" && (
            <HistorySection history={sortedMedicalHistory} />
          )}

          {activeTab === "claims" && (
            <ClaimsSection
              claims={claims}
              onFileNewClaim={() => setShowNewClaimForm(true)}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HealthAndClaims;
