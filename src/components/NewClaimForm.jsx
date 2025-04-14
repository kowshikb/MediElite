import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const NewClaimForm = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    patientName: "",
    provider: "",
    service: "",
    amount: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  // Allowed file types
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/heic',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  // Maximum file size (10MB in bytes)
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateFile = (file) => {
    if (!file) return "Please select a file";
    if (!allowedTypes.includes(file.type)) {
      return "Invalid file type. Please upload PDF, images (JPG, PNG, HEIC), or Word documents";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 10MB limit";
    }
    return null;
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    const error = validateFile(selectedFile);
    if (error) {
      setFileError(error);
      setFile(null);
      return;
    }
    setFileError("");
    setFile(selectedFile);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    const error = validateFile(droppedFile);
    if (error) {
      setFileError(error);
      setFile(null);
      return;
    }
    setFileError("");
    setFile(droppedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (!form.patientName || !form.provider || !form.service) {
      setError("Please fill all required fields");
      return;
    }
    if (!file) {
      setFileError("Please upload supporting documentation");
      return;
    }
    setError("");
    setFileError("");
    onSubmit({ ...form, file });
    onClose();
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-emerald-900 mb-4">
          File New Insurance Claim
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter patient name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provider <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="provider"
              value={form.provider}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter provider name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="service"
              value={form.service}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter service (e.g. X-Ray, Consultation)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Claim Amount ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="input-field"
              placeholder="Describe the claim (optional)"
              rows={3}
            />
          </div>

          {/* File Upload Section */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supporting Documentation <span className="text-red-500">*</span>
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
                ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-500'}
                ${fileError ? 'border-red-300 bg-red-50' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.heic"
                className="hidden"
              />
              {file ? (
                <div className="text-emerald-600">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm">
                    {(file.size / (1024 * 1024)).toFixed(2)}MB
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600">
                    Drag and drop a file here, or click to select
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PDF, Word documents, or images up to 10MB
                  </p>
                </div>
              )}
            </div>
            {fileError && (
              <p className="text-red-500 text-xs mt-1">{fileError}</p>
            )}
          </div>

          {error && (
            <div className="md:col-span-2">
              <p className="text-red-500 text-xs mt-1">{error}</p>
            </div>
          )}
          
          <div className="md:col-span-2 flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg border border-emerald-200 font-medium"
            >
              Submit Claim
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default NewClaimForm;
