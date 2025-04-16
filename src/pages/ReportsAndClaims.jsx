import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import medicalBillsData from "../data/medicalBills";
import prescriptionsData from "../data/prescriptions";
import medicalHistoryData from "../data/medicalHistory";
import insuranceClaimsData from "../data/insuranceClaims";
import reportsData from "../data/reports.json";
import NewClaimForm from "../components/NewClaimForm";

// SidebarTab component for navigation
const SidebarTab = ({ active, onClick, icon, text }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.98 }}
    className={`px-4 py-3 rounded-xl flex items-center space-x-3 transition-all w-full no-hover
      ${
        active
          ? "bg-emerald-50 text-emerald-600 font-medium shadow-sm border border-emerald-100"
          : "text-gray-600 border border-transparent bg-white hover:text-emerald-600"
      }`}
    style={{ boxShadow: "none" }}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{text}</span>
  </motion.button>
);

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

// Generic Modal Auto-Close Hook
const useAutoClose = (onClose, duration = 5000) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  let colorClasses = "bg-gray-100 text-gray-800"; // Default styling
  let label = status;
  let symbol = "";

  switch (status.toLowerCase()) {
    case "pending":
      colorClasses = "bg-yellow-100 text-yellow-800";
      symbol = "⏳"; // Hourglass for pending
      break;
    case "approved":
    case "paid":
    case "completed":
      colorClasses = "bg-green-100 text-green-800";
      symbol = "✅"; // Checkmark for approved/paid/completed
      break;
    case "denied":
    case "rejected":
      colorClasses = "bg-red-100 text-red-800";
      symbol = "❌"; // Cross for denied/rejected
      break;
    case "ongoing":
      colorClasses = "bg-blue-100 text-blue-800";
      symbol = "🔄"; // Circular arrow for ongoing
      break;
    case "resolved":
      colorClasses = "bg-green-100 text-green-800";
      symbol = "✔️"; // Checkmark for resolved
      break;
    case "recurring":
      colorClasses = "bg-purple-100 text-purple-800";
      symbol = "🔁"; // Repeat symbol for recurring
      break;
    default:
      colorClasses = "bg-gray-100 text-gray-800";
      symbol = "❓"; // Question mark for unknown
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}
    >
      <span className="mr-1">{symbol}</span>
      {label}
    </span>
  );
};

// Toast notification component
const Toast = ({ message, type, onClose }) => {
  // Use the generic auto-close hook
  useAutoClose(onClose);

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

// Modal Layout Component to standardize modal structure
const ModalLayout = ({ title, children, onClose, subTitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 pb-4 mb-4">
          <h3 className="text-xl font-bold text-emerald-900">{title}</h3>
          {subTitle && <p className="text-sm text-gray-500 mt-1">{subTitle}</p>}
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
};

// EmptyState component to standardize empty state displays
const EmptyState = ({ icon, title, description }) => (
  <div className="p-12 text-center">
    <div className="inline-flex rounded-full bg-blue-50 p-4 mb-4">
      <div className="text-3xl">{icon}</div>
    </div>
    <p className="text-lg font-medium text-gray-700 mb-2">{title}</p>
    <p className="text-gray-500">{description}</p>
  </div>
);

// Date formatter utility
const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

// Bill Details Modal Component
const BillDetailsModal = ({ bill, onClose }) => {
  useAutoClose(onClose);

  return (
    <ModalLayout title="Bill Details" onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Provider</p>
            <p className="font-medium text-gray-900">{bill.provider}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Service Date</p>
            <p className="font-medium text-gray-900">{formatDate(bill.date)}</p>
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
    </ModalLayout>
  );
};

// Claim Details Modal Component
const ClaimDetailsModal = ({ claim, onClose }) => {
  useAutoClose(onClose);

  return (
    <ModalLayout
      title="Claim Details"
      subTitle="Tap anywhere outside to close"
      onClose={onClose}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Claim Number</p>
            <p className="font-medium text-gray-900">{claim.claimNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date Submitted</p>
            <p className="font-medium text-gray-900">
              {formatDate(claim.dateSubmitted)}
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
              {claim.paymentDate ? formatDate(claim.paymentDate) : "-"}
            </p>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

// Medical Records Modal Component
const MedicalRecordsModal = ({ record, onClose }) => {
  return (
    <ModalLayout title="Medical Records" onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">
            {record.condition}
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Diagnosed Date</p>
              <p className="font-medium text-gray-900">
                {formatDate(record.diagnosedDate)}
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
                    {formatDate(item.date)} - {item.event}
                  </p>
                  <p className="text-sm text-gray-600">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

// Enhanced Report Viewer Modal with visual content based on report type
const ReportViewerModal = ({ report, onClose }) => {
  const getReportContent = () => {
    switch (report.reportType.toLowerCase()) {
      case "ecg":
        return (
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="text-lg font-semibold mb-3">ECG Results</h4>
            <img
              src={getReportImage("ecg")}
              alt="ECG"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="font-medium">72 BPM</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">QRS Duration</p>
                <p className="font-medium">0.08s</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">PR Interval</p>
                <p className="font-medium">0.16s</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">QT Interval</p>
                <p className="font-medium">0.42s</p>
              </div>
            </div>
          </div>
        );
      case "x-ray":
        return (
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="text-lg font-semibold mb-3">X-Ray Results</h4>
            <img
              src={getReportImage("x-ray")}
              alt="X-Ray"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-700">
              <strong>Finding:</strong> No fractures or abnormalities detected.
              Bone structure and alignment appear normal.
            </p>
          </div>
        );
      case "mri":
        return (
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="text-lg font-semibold mb-3">MRI Results</h4>
            <img
              src={getReportImage("mri")}
              alt="MRI"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-700">
              <strong>Finding:</strong> No evidence of structural abnormalities.
              Tissue appears healthy with no signs of inflammation or damage.
            </p>
          </div>
        );
      case "blood test":
        return (
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="text-lg font-semibold mb-3">Blood Test Results</h4>
            <img
              src={getReportImage("blood test")}
              alt="Blood Test"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left">Test</th>
                  <th className="px-3 py-2 text-left">Result</th>
                  <th className="px-3 py-2 text-left">Normal Range</th>
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 border-t">Hemoglobin</td>
                  <td className="px-3 py-2 border-t">14.2 g/dL</td>
                  <td className="px-3 py-2 border-t">13.5-17.5 g/dL</td>
                  <td className="px-3 py-2 border-t text-green-600">Normal</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border-t">WBC</td>
                  <td className="px-3 py-2 border-t">7.5 x10^9/L</td>
                  <td className="px-3 py-2 border-t">4.5-11.0 x10^9/L</td>
                  <td className="px-3 py-2 border-t text-green-600">Normal</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border-t">Platelets</td>
                  <td className="px-3 py-2 border-t">250 x10^9/L</td>
                  <td className="px-3 py-2 border-t">150-450 x10^9/L</td>
                  <td className="px-3 py-2 border-t text-green-600">Normal</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border-t">Glucose</td>
                  <td className="px-3 py-2 border-t">95 mg/dL</td>
                  <td className="px-3 py-2 border-t">70-100 mg/dL</td>
                  <td className="px-3 py-2 border-t text-green-600">Normal</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "ct scan":
        return (
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="text-lg font-semibold mb-3">CT Scan Results</h4>
            <img
              src={getReportImage("ct scan")}
              alt="CT Scan"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-700">
              <strong>Finding:</strong> No evidence of abnormal masses or
              structures. All organs appear normal in size and density.
            </p>
          </div>
        );
      case "ultrasound":
        return (
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="text-lg font-semibold mb-3">Ultrasound Results</h4>
            <img
              src={getReportImage("ultrasound")}
              alt="Ultrasound"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-700">
              <strong>Finding:</strong> Normal examination with no visible
              abnormalities. Tissues and structures appear within normal limits.
            </p>
          </div>
        );
      default:
        return (
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="text-lg font-semibold mb-3">
              {report.reportType} Results
            </h4>
            <img
              src={getReportImage("default")}
              alt={report.reportType}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-700">
              Report details will be available once reviewed by your doctor.
            </p>
          </div>
        );
    }
  };

  return (
    <ModalLayout
      title={`${report.reportType} Report`}
      subTitle="Tap anywhere outside to close"
      onClose={onClose}
    >
      {getReportContent()}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        <div>
          <p className="text-xs text-gray-500">Report Center</p>
          <p className="font-medium text-gray-800">{report.reportCenterName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Date</p>
          <p className="font-medium text-gray-800">
            {formatDate(report.reportDate)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Doctor</p>
          <p className="font-medium text-gray-800">{report.doctorName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Status</p>
          <div className="mt-1">
            <StatusBadge status={report.status} />
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Report ID</p>
          <p className="font-medium text-gray-800">
            RPT-{report.id.toString().padStart(6, "0")}
          </p>
        </div>
      </div>
    </ModalLayout>
  );
};

// Medical History Section Component
const HistorySection = ({ history, setViewingRecord }) => {
  const [viewingRecord, setViewingRecordState] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Medical History</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Diagnosed Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {history.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {record.condition}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {formatDate(record.diagnosedDate)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {record.treatedBy}
                </td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status={record.status} />
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => setViewingRecord(record)}
                    className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium no-hover"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {history.length === 0 && (
        <EmptyState
          icon="📋"
          title="No Medical History"
          description="Your medical history records will appear here."
        />
      )}
    </motion.div>
  );
};

// Prescriptions Section Component
const PrescriptionsSection = ({ prescriptions, onRefillRequest }) => {
  const [refillRequested, setRefillRequested] = useState({});
  const [activeTab, setActiveTab] = useState("ongoing");

  const handleRefillRequest = (prescription) => {
    setRefillRequested((prev) => ({
      ...prev,
      [prescription.id]: true,
    }));

    // Increment the refills count
    prescription.refills += 1;

    onRefillRequest(prescription);
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    if (activeTab === "ongoing") return !prescription.expired;
    if (activeTab === "expired") return prescription.expired;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Prescriptions</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("ongoing")}
              className={`px-3 py-1.5 text-sm font-medium rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300 ${
                activeTab === "ongoing"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setActiveTab("expired")}
              className={`px-3 py-1.5 text-sm font-medium rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 ${
                activeTab === "expired"
                  ? "bg-gradient-to-r from-rose-400 to-red-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Expired
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-6">
        {filteredPrescriptions.map((prescription) => (
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
                  {formatDate(prescription.date)}
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
              <div className="flex flex-col items-end ml-4">
                {!prescription.expired && !refillRequested[prescription.id] && (
                  <button
                    onClick={() => handleRefillRequest(prescription)}
                    className="px-4 py-2 bg-white text-rose-600 rounded-lg border border-rose-200 font-medium transition-transform duration-300 transform active:scale-95 no-hover"
                    style={{ boxShadow: "none" }}
                  >
                    Request Refill
                  </button>
                )}
                {refillRequested[prescription.id] && (
                  <div className="px-4 py-2 bg-white text-emerald-600 rounded-lg border border-emerald-200 font-medium">
                    Refill Requested
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {filteredPrescriptions.length === 0 && (
          <EmptyState
            icon="💊"
            title={`No ${
              activeTab === "ongoing" ? "Ongoing" : "Expired"
            } Prescriptions`}
            description={`You don't have any ${
              activeTab === "ongoing" ? "ongoing" : "expired"
            } prescriptions at the moment.`}
          />
        )}
      </div>
    </motion.div>
  );
};

// Medical Bills Section with dynamic filters
const BillsSection = ({ bills, onPayBill, onViewBill }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const FilterButton = ({ label, isActive, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`px-3 py-1.5 text-sm font-medium rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300 ${
          isActive
            ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        style={{ boxShadow: "none" }}
      >
        {label}
      </button>
    );
  };

  const filteredBills = bills.filter((bill) => {
    if (activeFilter === "all") return true;
    return bill.status.toLowerCase() === activeFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Medical Bills</h2>
          <div className="flex space-x-4">
            {["All", "Pending", "Paid"].map((filter) => (
              <FilterButton
                key={filter}
                label={filter}
                isActive={activeFilter === filter.toLowerCase()}
                onClick={() => setActiveFilter(filter.toLowerCase())}
              />
            ))}
          </div>
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
            {filteredBills.map((bill) => (
              <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {formatDate(bill.date)}
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

      {filteredBills.length === 0 && (
        <EmptyState
          icon="📄"
          title={`No ${
            activeFilter === "all" ? "Medical Bills" : activeFilter
          } Bills`}
          description={`You don't have any ${activeFilter} medical bills at the moment.`}
        />
      )}
    </motion.div>
  );
};

// Get report image based on report type
const getReportImage = (reportType) => {
  switch (reportType.toLowerCase()) {
    case "x-ray":
      return "https://img.freepik.com/free-photo/female-chest-x-ray_1101-452.jpg";
    case "ecg":
      return "/ReportImages/Ecg.png";
    case "mri":
      return "/ReportImages/MRI.png";
    case "blood test":
      return "/ReportImages/BloodReport.png";
    case "ct scan":
      return "/ReportImages/CTScan.png";
    case "ultrasound":
      return "/ReportImages/Ultra.png";
    default:
      return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80";
  }
};

// Reports Section Component with enhanced table layout and visual reports
const ReportsSection = ({ reports, setViewingReport }) => {
  // Calculate time to get report in a human-readable format
  const getTimeToReceive = (reportType) => {
    switch (reportType.toLowerCase()) {
      case "x-ray":
        return "1 day";
      case "ecg":
        return "1 hour";
      case "mri":
        return "3 days";
      case "blood test":
        return "2 days";
      case "ct scan":
        return "2 days";
      case "ultrasound":
        return "1 day";
      default:
        return "1-2 days";
    }
  };

  // Get icon/emoji based on report type
  const getReportIcon = (reportType) => {
    switch (reportType.toLowerCase()) {
      case "x-ray":
        return "🦴";
      case "ecg":
        return "💓";
      case "mri":
        return "🧠";
      case "blood test":
        return "🩸";
      case "ct scan":
        return "🔬";
      case "ultrasound":
        return "🔊";
      default:
        return "📋";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1 }}
      className="card overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Medical Reports</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Test Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Processing Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reports.map((report) => (
              <tr
                key={report.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">
                      {getReportIcon(report.reportType)}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {report.reportType}
                      </p>
                      <p className="text-xs text-gray-500">
                        {report.reportCenterName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {report.doctorName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {formatDate(report.reportDate)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status={report.status} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {getTimeToReceive(report.reportType)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => setViewingReport(report)}
                    className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium no-hover"
                  >
                    View Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reports.length === 0 && (
        <EmptyState
          icon="📄"
          title="No Reports Available"
          description="Your medical test reports will appear here."
        />
      )}
    </motion.div>
  );
};

// Revamp the Insurance Claims section for improved usability and visual appeal
const ClaimsSection = ({ claims, onFileNewClaim }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewingClaim, setViewingClaim] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredClaims = claims.filter((claim) => {
    if (activeFilter === "All") return true;
    return claim.status.toLowerCase() === activeFilter.toLowerCase();
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#menu-button")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
          <div className="flex items-center space-x-4">
            <button
              onClick={onFileNewClaim}
              className="px-5 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
              + File New Claim
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Claim #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Coverage
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Payment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredClaims.map((claim) => (
              <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                  {claim.claimNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {formatDate(claim.dateSubmitted)}
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
                  {claim.paymentDate ? formatDate(claim.paymentDate) : "-"}
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

      {filteredClaims.length === 0 && (
        <EmptyState
          icon="🧾"
          title={`No ${
            activeFilter === "All" ? "Insurance Claims" : activeFilter
          } Claims`}
          description={`You don't have any ${activeFilter} insurance claims at the moment.`}
        />
      )}
    </motion.div>
  );
};

const ReportsAndClaims = () => {
  // Use location to get state passed from other components
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "bills"
  );
  const [showNewClaimForm, setShowNewClaimForm] = useState(false);
  const [toast, setToast] = useState(null);

  // Create refs for each section to enable scrolling to top
  const prescriptionsRef = React.useRef(null);
  const reportsRef = React.useRef(null);
  const medicalHistoryRef = React.useRef(null);

  // Set active tab from location state when it changes
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);

      // Handle scroll to top if requested
      if (location.state?.scrollToTop) {
        setTimeout(() => {
          // Scroll to the top of the page first
          window.scrollTo(0, 0);

          // Then after a small delay, scroll to the specific section if needed
          setTimeout(() => {
            if (
              location.state.activeTab === "prescriptions" &&
              prescriptionsRef.current
            ) {
              prescriptionsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            } else if (
              location.state.activeTab === "reports" &&
              reportsRef.current
            ) {
              reportsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            } else if (
              location.state.activeTab === "history" &&
              medicalHistoryRef.current
            ) {
              medicalHistoryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }, 300);
        }, 100);
      }

      // Clear the state to prevent it from persisting on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Add refill handler at the parent level
  const handleRefillRequest = (prescription) => {
    setToast({
      message: `Refill request sent for ${prescription.name}! You will receive your medication in 30 minutes.`,
      type: "success",
    });
  };

  // Sort all data by date descending (recent first)
  const [medicalBills, setMedicalBills] = useState(
    [...medicalBillsData].sort((a, b) => new Date(b.date) - new Date(a.date))
  );
  const [prescriptions] = useState(
    [...prescriptionsData].sort((a, b) => new Date(b.date) - new Date(a.date))
  );
  const [history] = useState(
    [...medicalHistoryData].sort(
      (a, b) => new Date(b.diagnosedDate) - new Date(a.diagnosedDate)
    )
  );
  const [claims, setClaims] = useState(
    [...insuranceClaimsData].sort(
      (a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted)
    )
  );
  const [reports] = useState(
    [...reportsData].sort(
      (a, b) => new Date(b.reportDate) - new Date(a.reportDate)
    )
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

  const [viewingRecord, setViewingRecord] = useState(null);
  const [viewingReport, setViewingReport] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Single Toast notification for all actions */}
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

      {/* Medical Records Modal */}
      <AnimatePresence>
        {viewingRecord && (
          <MedicalRecordsModal
            record={viewingRecord}
            onClose={() => setViewingRecord(null)}
          />
        )}
      </AnimatePresence>

      {/* Report Viewer Modal */}
      <AnimatePresence>
        {viewingReport && (
          <ReportViewerModal
            report={viewingReport}
            onClose={() => setViewingReport(null)}
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
              ReportsAndClaims
            </h1>
            <p className="text-blue-100 text-sm md:text-base mt-1">
              Manage your medical records, bills, prescriptions, and insurance
              claims
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="/client/support-feedback"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo(0, 0);
                window.location.href = "/client/support-feedback";
              }}
              className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 focus:outline-none"
            >
              <span className="text-lg">🧩 </span>
              Support & Feedback
            </a>
          </div>
        </div>
        {/* Enhanced decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-blue-300 rounded-full filter blur-xl opacity-20"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-300 rounded-full filter blur-xl opacity-10"></div>
      </div>

      <div className="flex gap-6">
        {/* Fixed Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-8">
            <div className="bg-gray-50 rounded-xl p-4">
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
                <SidebarTab
                  active={activeTab === "reports"}
                  onClick={() => setActiveTab("reports")}
                  icon="📄"
                  text="Reports"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {activeTab === "bills" && (
            <BillsSection
              bills={medicalBills}
              onPayBill={handlePayBill}
              onViewBill={handleViewBill}
            />
          )}

          {activeTab === "prescriptions" && (
            <div ref={prescriptionsRef}>
              <PrescriptionsSection
                prescriptions={prescriptions}
                onRefillRequest={handleRefillRequest}
              />
            </div>
          )}

          {activeTab === "history" && (
            <div ref={medicalHistoryRef}>
              <HistorySection
                history={history}
                setViewingRecord={setViewingRecord}
              />
            </div>
          )}

          {activeTab === "claims" && (
            <ClaimsSection
              claims={claims}
              onFileNewClaim={() => setShowNewClaimForm(true)}
            />
          )}

          {activeTab === "reports" && (
            <div ref={reportsRef}>
              <ReportsSection
                reports={reports}
                setViewingReport={setViewingReport}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReportsAndClaims;
