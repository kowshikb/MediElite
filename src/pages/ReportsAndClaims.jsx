import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
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

// Bill Details Modal Component
const BillDetailsModal = ({ bill, onClose }) => {
  return (
    <ModalLayout title="Bill Details" onClose={onClose}>
      Details for bill ID: {bill?.id}
    </ModalLayout>
  );
};

// Claim Details Modal Component
const ClaimDetailsModal = ({ claim, onClose }) => {
  return (
    <ModalLayout
      title="Claim Details"
      subTitle="Tap anywhere outside to close"
      onClose={onClose}
    >
      Details for claim ID: {claim?.id}
    </ModalLayout>
  );
};

// Medical Records Modal Component
const MedicalRecordsModal = ({ record, onClose }) => (
  <ModalLayout title="Medical Record" onClose={onClose}>
    Details for record ID: {record?.id}
  </ModalLayout>
);

// Report Viewer Modal Component
const ReportViewerModal = ({ report, onClose }) => (
  <ModalLayout title="Report Viewer" onClose={onClose}>
    Viewing report ID: {report?.id}
  </ModalLayout>
);

const ReportsAndClaims = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "bills"
  );
  const [showNewClaimForm, setShowNewClaimForm] = useState(false);
  const [toast, setToast] = useState(null);
  const prescriptionsRef = useRef(null);
  const reportsRef = useRef(null);
  const medicalHistoryRef = useRef(null);

  const [medicalBills, setMedicalBills] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [history, setHistory] = useState([]);
  const [claims, setClaims] = useState([]);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [viewingBill, setViewingBill] = useState(null);
  const [viewingClaim, setViewingClaim] = useState(null);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [viewingReport, setViewingReport] = useState(null);

  const [newClaimData, setNewClaimData] = useState({
    policyNumber: "",
    claimType: "",
    claimAmount: "",
    dateOfService: "",
    diagnosis: "",
    providerName: "",
    reportId: null,
  });

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const urls = [
          "/api/data/medical-bills",
          "/api/data/prescriptions",
          "/api/data/medical-history",
          "/api/data/insurance-claims",
          "/api/data/reports",
        ];
        const responses = await Promise.all(urls.map((u) => fetch(u)));

        const failedResponse = responses.find((res) => !res.ok);
        if (failedResponse) {
          throw new Error(
            `Failed to fetch: ${failedResponse.url} (${failedResponse.status})`
          );
        }

        const data = await Promise.all(responses.map((r) => r.json()));

        setMedicalBills(
          (data[0] || []).sort((a, b) => new Date(b.date) - new Date(a.date))
        );
        setPrescriptions(
          (data[1] || []).sort((a, b) => new Date(b.date) - new Date(a.date))
        );
        setHistory(
          (data[2] || []).sort(
            (a, b) => new Date(b.diagnosedDate) - new Date(a.diagnosedDate)
          )
        );
        setClaims(
          (data[3] || []).sort(
            (a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted)
          )
        );
        const rep = data[4]?.reports ?? data[4] ?? [];
        setReports(
          rep.sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate))
        );
      } catch (e) {
        console.error("Error fetching data:", e);
        setError(`Failed to load data. ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);

      if (location.state?.scrollToTop) {
        setTimeout(() => {
          window.scrollTo(0, 0);
          setTimeout(() => {
            let targetRef;
            switch (location.state.activeTab) {
              case "prescriptions":
                targetRef = prescriptionsRef;
                break;
              case "reports":
                targetRef = reportsRef;
                break;
              case "history":
                targetRef = medicalHistoryRef;
                break;
              default:
                targetRef = null;
            }
            if (targetRef?.current) {
              targetRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }, 300);
        }, 100);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    let timer;
    if (toast) {
      timer = setTimeout(() => {
        setToast(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    let timer;
    if (viewingBill) {
      timer = setTimeout(() => {
        setViewingBill(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [viewingBill]);

  useEffect(() => {
    let timer;
    if (viewingClaim) {
      timer = setTimeout(() => {
        setViewingClaim(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [viewingClaim]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-red-600 bg-red-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
        <p>{error}</p>
        <p className="mt-4 text-sm text-gray-600">
          Please ensure the backend server is running and accessible. Check
          console and server logs.
        </p>
      </div>
    );
  }

  const handleRefillRequest = (prescription) => {
    setToast({
      message: `Refill request sent for ${prescription.name}! You will receive your medication in 30 minutes.`,
      type: "success",
    });
  };

  const handlePayBill = (bill) => {
    const updatedBills = medicalBills.map((b) =>
      b.id === bill.id ? { ...b, status: "paid" } : b
    );
    setMedicalBills(updatedBills);
    setToast({
      message: `Payment of $${bill.amount.toFixed(2)} to ${
        bill.provider
      } successful!`,
      type: "success",
    });
    setViewingBill(null);
  };

  const handleSubmitClaim = (formData) => {
    const newClaim = {
      id: `claim-${Date.now()}`,
      claimNumber: `CLM-${Math.floor(10000 + Math.random() * 90000)}`,
      dateSubmitted: new Date().toISOString().split("T")[0],
      amount: parseFloat(formData.amount),
      status: "pending",
      paymentDate: null,
      coverage: "Pending Review",
      provider: formData.provider,
      serviceDate: formData.serviceDate,
    };
    setClaims([newClaim, ...claims]);
    setActiveTab("claims");
    setShowNewClaimForm(false);
    setToast({
      message: "Your claim has been submitted successfully!",
      type: "success",
    });
    setNewClaimData({
      policyNumber: "",
      claimType: "",
      claimAmount: "",
      dateOfService: "",
      diagnosis: "",
      providerName: "",
      reportId: null,
    });
  };

  const closeToast = () => {
    setToast(null);
  };

  const handleViewBill = (bill) => {
    setViewingBill(bill);
  };

  const handleViewClaim = (claim) => {
    setViewingClaim(claim);
  };

  const BillsSection = ({ bills, onPayBill, onViewBill }) => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Medical Bills
      </h2>
      {bills.length === 0 ? (
        <EmptyState
          icon="💳"
          title="No Bills Yet"
          description="Your medical bills will appear here."
        />
      ) : (
        bills.map((bill) => (
          <div
            key={bill.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-100 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-700">{bill.provider}</p>
              <p className="text-sm text-gray-500">
                Due: {formatDate(bill.dueDate)}
              </p>
              <p className="text-lg font-semibold text-emerald-600">
                ${bill.amount.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={bill.status} />
              <button
                onClick={() => onViewBill(bill)}
                className="text-sm text-emerald-600 hover:underline"
              >
                View Details
              </button>
              {bill.status !== "paid" && (
                <button
                  onClick={() => onPayBill(bill)}
                  className="px-3 py-1 bg-emerald-500 text-white text-sm rounded-md hover:bg-emerald-600"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );

  const PrescriptionsSection = ({ prescriptions, onRefillRequest }) => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Prescriptions
      </h2>
      {prescriptions.length === 0 ? (
        <EmptyState
          icon="💊"
          title="No Prescriptions"
          description="Your active prescriptions will be listed here."
        />
      ) : (
        prescriptions.map((rx) => (
          <div
            key={rx.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-100 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-700">
                {rx.name} ({rx.dosage})
              </p>
              <p className="text-sm text-gray-500">
                Prescribed by Dr. {rx.prescribedBy} on {formatDate(rx.date)}
              </p>
              <p className="text-sm text-gray-500">
                Refills left: {rx.refillsLeft}
              </p>
            </div>
            <button
              onClick={() => onRefillRequest(rx)}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={rx.refillsLeft === 0}
            >
              Request Refill
            </button>
          </div>
        ))
      )}
    </div>
  );

  const HistorySection = ({ history, setViewingRecord }) => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Medical History
      </h2>
      {history.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No Medical History"
          description="Your recorded conditions and diagnoses will appear here."
        />
      ) : (
        history.map((record) => (
          <div
            key={record.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-100 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-700">{record.condition}</p>
              <p className="text-sm text-gray-500">
                Diagnosed: {formatDate(record.diagnosedDate)} by Dr.{" "}
                {record.diagnosedBy}
              </p>
              <StatusBadge status={record.status} />
            </div>
            <button
              onClick={() => setViewingRecord(record)}
              className="text-sm text-emerald-600 hover:underline"
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );

  const ClaimsSection = ({ claims, onFileNewClaim }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Insurance Claims
        </h2>
        <button
          onClick={onFileNewClaim}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium"
        >
          File New Claim
        </button>
      </div>
      {claims.length === 0 ? (
        <EmptyState
          icon="📝"
          title="No Claims Filed"
          description="Your submitted insurance claims will be shown here."
        />
      ) : (
        claims.map((claim) => (
          <div
            key={claim.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-100 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-700">
                Claim #{claim.claimNumber}
              </p>
              <p className="text-sm text-gray-500">
                Submitted: {formatDate(claim.dateSubmitted)}
              </p>
              <p className="text-lg font-semibold text-emerald-600">
                ${claim.amount.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={claim.status} />
              <button
                onClick={() => handleViewClaim(claim)}
                className="text-sm text-emerald-600 hover:underline"
              >
                View Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const ReportsSection = ({ reports, setViewingReport }) => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reports</h2>
      {reports.length === 0 ? (
        <EmptyState
          icon="📄"
          title="No Reports Available"
          description="Your medical reports (X-rays, scans, etc.) will be listed here."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden"
            >
              <img
                src={getReportImage(report.reportType)}
                alt={report.reportType}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <p className="font-medium text-gray-700">{report.reportType}</p>
                <p className="text-sm text-gray-500">
                  Date: {formatDate(report.reportDate)}
                </p>
                <button
                  onClick={() => setViewingReport(report)}
                  className="mt-2 text-sm text-emerald-600 hover:underline"
                >
                  View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <AnimatePresence>
        {toast && (
          <Toast
            key="toast"
            message={toast.message}
            type={toast.type}
            onClose={closeToast}
          />
        )}
        {viewingBill && (
          <BillDetailsModal
            key={`bill-${viewingBill.id}`}
            bill={viewingBill}
            onClose={() => setViewingBill(null)}
          />
        )}
        {viewingClaim && (
          <ClaimDetailsModal
            key={`claim-${viewingClaim.id}`}
            claim={viewingClaim}
            onClose={() => setViewingClaim(null)}
          />
        )}
        {viewingRecord && (
          <MedicalRecordsModal
            key={`record-${viewingRecord.id}`}
            record={viewingRecord}
            onClose={() => setViewingRecord(null)}
          />
        )}
        {viewingReport && (
          <ReportViewerModal
            key={`report-${viewingReport.id}`}
            report={viewingReport}
            onClose={() => setViewingReport(null)}
          />
        )}
        {showNewClaimForm && (
          <NewClaimForm
            key="new-claim-form"
            onClose={() => {
              setShowNewClaimForm(false);
              setNewClaimData({
                policyNumber: "",
                claimType: "",
                claimAmount: "",
                dateOfService: "",
                diagnosis: "",
                providerName: "",
                reportId: null,
              });
            }}
            onSubmit={handleSubmitClaim}
          />
        )}
      </AnimatePresence>

      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl p-6 mb-8 shadow-lg">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">Your Health Records</h1>
          <p className="text-emerald-100 mt-1">
            Access bills, prescriptions, history, claims, and reports.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full filter blur-xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full filter blur-lg translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-8 bg-white rounded-xl shadow p-4 border border-gray-100">
            <div className="space-y-2">
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

        <div className="flex-1 min-w-0">
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
