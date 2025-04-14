import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationContext } from "../components/AppointmentCalendar";
import { useAppointments } from "../context/AppointmentContext";
import ChatBox from "./ChatBox";
import { format } from "date-fns";

const DoctorCard = ({ doctor }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const { addNotification } = useContext(NotificationContext);
  const { addAppointment, currentAppointments } = useAppointments();

  const {
    name,
    specialty,
    subspecialty,
    image,
    rating,
    availability,
    experience,
    qualifications,
    languages,
    schedule,
    specializations,
  } = doctor;

  const hasExistingAppointment = currentAppointments.some(
    (apt) => apt.doctorName === doctor.name
  );

  const handleBookAppointment = () => {
    if (!availability) {
      addNotification(
        "This doctor is currently unavailable for appointments",
        "warning"
      );
      return;
    }
    if (hasExistingAppointment) {
      addNotification(
        "You already have an upcoming appointment with this doctor",
        "info"
      );
    }
    setShowBookingModal(true);
  };

  const handleMessageDoctor = () => {
    if (!availability) {
      addNotification(
        "This doctor is currently unavailable for chat",
        "warning"
      );
      return;
    }
    setShowChatModal(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="card h-full flex flex-col group overflow-hidden"
      >
        {/* Doctor Image with Enhanced Visual Effects */}
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-72 object-cover rounded-t-2xl"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${name}&size=400&background=059669&color=fff&bold=true`;
            }}
          />
          {/* Gradient Overlay with Enhanced Opacity*/}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-t-2xl opacity-20 group-hover:opacity-70 transition-all duration-300" />

          {/* Status Badge with enhanced styling */}
          {availability ? (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-500 text-white shadow-lg backdrop-blur-md border border-emerald-400/50 flex items-center"
            >
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              Available Now
            </motion.span>
          ) : (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-medium bg-rose-500 text-white shadow-lg backdrop-blur-md border border-rose-400/50"
            >
              Unavailable
            </motion.span>
          )}

          {/* Decorative elements */}
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-emerald-500/10 rounded-full"></div>
          <div className="absolute -bottom-10 left-8 w-16 h-16 bg-emerald-500/5 rounded-full"></div>
        </div>

        <div className="p-6 flex-grow">
          {/* Doctor Info Header */}
          <div className="flex justify-between items-start mb-5">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-500">
                {name}
              </h3>
              <p className="text-emerald-600 font-medium">{specialty}</p>
              <p className="text-sm text-gray-600">{subspecialty}</p>
            </div>
            <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 shadow-sm">
              <span className="text-amber-500 mr-1.5 text-lg">⭐</span>
              <span className="text-amber-700 font-semibold">{rating}</span>
            </div>
          </div>

          {/* Doctor Details */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center text-gray-600 bg-indigo-50/50 p-2 rounded-lg"
            >
              <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                <span className="text-lg">👨‍⚕️</span>
              </div>
              <span className="font-medium text-indigo-900">
                {experience} experience
              </span>
            </motion.div>

            <div className="space-y-3 bg-white p-3 rounded-xl border border-gray-100/80">
              {/* Qualifications */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start"
              >
                <div className="p-2 bg-sky-50 rounded-lg mr-3 self-start">
                  <span className="text-lg">🎓</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {qualifications.map((qual, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-sm bg-sky-50 text-sky-700 rounded-lg font-medium border border-sky-100"
                    >
                      {qual}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start"
              >
                <div className="p-2 bg-slate-50 rounded-lg mr-3 self-start">
                  <span className="text-lg">🗣️</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-sm bg-slate-50 text-slate-700 rounded-lg font-medium border border-slate-100"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Specializations */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start"
              >
                <div className="p-2 bg-emerald-50 rounded-lg mr-3 self-start">
                  <span className="text-lg">🔬</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-sm bg-emerald-50 text-emerald-700 rounded-lg font-medium border border-emerald-100"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Card Footer with Action Buttons */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex gap-3">
            <motion.button
              whileHover={availability ? { scale: 1.03, y: -2 } : {}}
              whileTap={availability ? { scale: 0.97 } : {}}
              onClick={handleBookAppointment}
              className={`flex-1 ${
                hasExistingAppointment ? "btn-secondary" : "btn-primary"
              } flex items-center justify-center ${
                !availability && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!availability}
            >
              <span className="mr-2">
                {hasExistingAppointment ? "🔄" : "📅"}
              </span>
              {hasExistingAppointment ? "Book Another" : "Book Appointment"}
            </motion.button>

            <motion.button
              whileHover={availability ? { scale: 1.03, y: -2 } : {}}
              whileTap={availability ? { scale: 0.97 } : {}}
              onClick={handleMessageDoctor}
              className={`btn-secondary flex items-center justify-center ${
                !availability && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!availability}
            >
              <span className="mr-1">💬</span>
              <span>Chat</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Booking Modal with Enhanced Styling */}
      <AnimatePresence>
        {showBookingModal && (
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
              className="card max-w-lg w-full overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-emerald-900 flex items-center">
                    <span className="text-xl mr-3">📅</span>
                    Book Appointment with {name}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors text-2xl font-light focus:outline-none"
                  >
                    ×
                  </motion.button>
                </div>
              </div>
              <div className="p-6">
                <AppointmentBookingForm
                  doctor={doctor}
                  onClose={() => setShowBookingModal(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal with Enhanced Design */}
      <AnimatePresence>
        {showChatModal && (
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
              className="card w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-emerald-50 to-white">
                <h3 className="text-xl font-bold text-emerald-900 flex items-center">
                  <span className="text-xl mr-3">💬</span>
                  Chat with {name}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowChatModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-2xl font-light focus:outline-none"
                >
                  ×
                </motion.button>
              </div>
              <div className="flex-grow overflow-hidden">
                <ChatBox doctorId={doctor.id} doctorName={name} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AppointmentBookingForm = ({ doctor, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Regular Checkup");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addAppointment } = useAppointments();
  const { addNotification } = useContext(NotificationContext);

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Please select a future date");
      setDate("");
      return;
    }
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctor.availability) {
      addNotification(
        "This doctor is currently unavailable for appointments",
        "warning"
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const newAppointment = {
        doctorName: doctor.name,
        date,
        time,
        type,
        notes: "",
      };

      addAppointment(newAppointment);
      addNotification(
        `✅ Appointment successfully booked with ${doctor.name} for ${format(
          new Date(date),
          "MMMM d"
        )} at ${
          time.includes(":30")
            ? time.replace(":30", ":30 ") + (parseInt(time) < 12 ? "AM" : "PM")
            : time + " " + (parseInt(time) < 12 ? "AM" : "PM")
        }. See all appointments in your dashboard.`,
        "success"
      );
      onClose();
    } catch (error) {
      if (error.message.includes("duplicate")) {
        addNotification("❌ " + error.message, "error");
      } else {
        addNotification(
          "❌ Appointment failed. Duplicate appointment detected.",
          "error"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          min={today.toISOString().split("T")[0]}
          max={maxDate.toISOString().split("T")[0]}
          className="input-field"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Time
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="input-field"
          required
        >
          <option value="">Choose a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot.includes(":30")
                ? slot.replace(":30", ":30 ") +
                  (parseInt(slot) < 12 ? "AM" : "PM")
                : slot + " " + (parseInt(slot) < 12 ? "AM" : "PM")}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Appointment Type
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input-field"
          required
        >
          <option>Regular Checkup</option>
          <option>Follow-up</option>
          <option>Consultation</option>
          <option>Emergency</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary relative"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="opacity-0">Book Appointment</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </>
          ) : (
            "Book Appointment"
          )}
        </button>
      </div>
    </form>
  );
};

export default DoctorCard;
