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
        whileHover={{ y: -5 }}
        className="card h-full flex flex-col group"
      >
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover rounded-t-2xl"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${name}&size=400&background=0D8ABC&color=fff`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          {availability ? (
            <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-medium bg-green-500 text-white shadow-lg backdrop-blur-sm">
              Available Now
            </span>
          ) : (
            <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-medium bg-red-500 text-white shadow-lg backdrop-blur-sm">
              Unavailable
            </span>
          )}
        </div>

        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
              <p className="text-blue-600 font-medium">{specialty}</p>
              <p className="text-sm text-gray-600">{subspecialty}</p>
            </div>
            <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-lg">
              <span className="text-yellow-500 mr-1.5">⭐</span>
              <span className="text-blue-700 font-medium">{rating}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <span className="text-xl mr-3">👨‍⚕️</span>
              <span className="font-medium">{experience} experience</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-xl mr-3">🎓</span>
                <div className="flex flex-wrap gap-2">
                  {qualifications.map((qual, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg font-medium"
                    >
                      {qual}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-xl mr-3">🗣️</span>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-xl mr-3">🔬</span>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-sm bg-green-50 text-green-700 rounded-lg font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <div className="flex gap-3">
            <motion.button
              whileHover={availability ? { scale: 1.02 } : {}}
              whileTap={availability ? { scale: 0.98 } : {}}
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
              whileHover={availability ? { scale: 1.02 } : {}}
              whileTap={availability ? { scale: 0.98 } : {}}
              onClick={handleMessageDoctor}
              className={`btn-secondary flex items-center justify-center ${
                !availability && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!availability}
            >
              <span>💬</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="card max-w-lg w-full overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">
                    Book Appointment with {name}
                  </h3>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    ×
                  </button>
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

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="card w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  Chat with {name}
                </h3>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  ×
                </button>
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
