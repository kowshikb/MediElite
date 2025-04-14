import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PrescriptionForm = ({ onSubmit, patientDetails }) => {
  const [medications, setMedications] = useState([
    { id: 1, name: "", dosage: "", frequency: "", duration: "" },
  ]);
  const [notes, setNotes] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        id: medications.length + 1,
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ]);
  };

  const handleRemoveMedication = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const handleMedicationChange = (id, field, value) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, [field]: value } : med
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmSubmit = () => {
    onSubmit({ medications, notes });
    setShowConfirmation(false);
  };

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Patient Details */}
        <div className="card p-6">
          <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">👤</span>
            Patient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Name</p>
              <p className="mt-1 text-lg">{patientDetails.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Age</p>
              <p className="mt-1 text-lg">{patientDetails.age} years</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Patient ID</p>
              <p className="mt-1 text-lg">{patientDetails.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Date</p>
              <p className="mt-1 text-lg">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Medications */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-emerald-900 flex items-center">
              <span className="text-2xl mr-3">💊</span>
              Medications
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleAddMedication}
              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Add Medication</span>
            </motion.button>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {medications.map((medication, index) => (
                <motion.div
                  key={medication.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative p-4 bg-gray-50 rounded-xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Medication Name
                      </label>
                      <input
                        type="text"
                        value={medication.name}
                        onChange={(e) =>
                          handleMedicationChange(
                            medication.id,
                            "name",
                            e.target.value
                          )
                        }
                        className="input-field mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Dosage
                      </label>
                      <input
                        type="text"
                        value={medication.dosage}
                        onChange={(e) =>
                          handleMedicationChange(
                            medication.id,
                            "dosage",
                            e.target.value
                          )
                        }
                        className="input-field mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Frequency
                      </label>
                      <select
                        value={medication.frequency}
                        onChange={(e) =>
                          handleMedicationChange(
                            medication.id,
                            "frequency",
                            e.target.value
                          )
                        }
                        className="input-field mt-1"
                        required
                      >
                        <option value="">Select frequency</option>
                        <option value="Once daily">Once daily</option>
                        <option value="Twice daily">Twice daily</option>
                        <option value="Three times daily">
                          Three times daily
                        </option>
                        <option value="Four times daily">
                          Four times daily
                        </option>
                        <option value="As needed">As needed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={medication.duration}
                        onChange={(e) =>
                          handleMedicationChange(
                            medication.id,
                            "duration",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 7 days, 2 weeks"
                        className="input-field mt-1"
                        required
                      />
                    </div>
                  </div>
                  {medications.length > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => handleRemoveMedication(medication.id)}
                      className="absolute -right-2 -top-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      ×
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Notes */}
        <div className="card p-6">
          <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">📝</span>
            Additional Notes
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="input-field"
            placeholder="Enter any additional instructions or notes..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn-primary"
          >
            Generate Prescription
          </motion.button>
        </div>
      </motion.form>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
            >
              <h3 className="text-xl font-bold text-emerald-900 mb-4">
                Confirm Prescription
              </h3>
              <p className="text-gray-600 mb-6">
                Please review and confirm the prescription details before
                proceeding.
              </p>
              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Review Again
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmSubmit}
                  className="btn-primary"
                >
                  Confirm & Submit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PrescriptionForm;
