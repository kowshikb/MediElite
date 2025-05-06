import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeadset,
  FaStar,
  FaComment,
  FaEnvelope,
  FaPhone,
  FaBook,
} from "react-icons/fa";
import Confetti from "react-confetti";

// Support options data
const supportOptions = [
  {
    key: "help",
    label: "Help Center",
    desc: "Browse our knowledge base.",
    emoji: "📚",
  },
  {
    key: "rate",
    label: "Rate Us",
    desc: "Share your experience.",
    emoji: "⭐",
  },
  {
    key: "chat",
    label: "Live Chat",
    desc: "Chat with our support team.",
    emoji: "💬",
  },
  {
    key: "mail",
    label: "Email Support",
    desc: "Send us a message.",
    emoji: "📧",
  },
  {
    key: "phone",
    label: "Phone Support",
    desc: "Call us for help.",
    emoji: "📞",
  },
];

// FAQ Data
const faqs = [
  {
    q: "How do I book an appointment?",
    a: "Go to Find Doctor, select a doctor, and click Book Appointment. You can filter by specialty, availability, and insurance acceptance to find the perfect match for your healthcare needs.",
    icon: "🗓️",
  },
  {
    q: "How do I access my reports?",
    a: "Navigate to Reports & Claims from the dashboard sidebar. You can view, download, or share your reports with your healthcare providers directly through our secure system.",
    icon: "📊",
  },
  {
    q: "How do I contact support?",
    a: "Use the Support & Feedback section to chat, email, or call us. Our support team is available 24/7 to assist you with any questions or concerns.",
    icon: "🤝",
  },
  {
    q: "How secure is my medical data?",
    a: "MediElite employs bank-level encryption and follows all HIPAA guidelines to ensure your medical data remains completely secure and private.",
    icon: "🔒",
  },
  {
    q: "How do I track my health metrics?",
    a: "Use the Health Tracker section to input and visualize your vital signs, medication adherence, and other health metrics. You can set reminders and see trends over time.",
    icon: "📈",
  },
  {
    q: "What insurance plans are accepted?",
    a: "MediElite works with most major insurance providers. You can verify coverage for specific doctors in their profile page or filter doctors by accepted insurance plans.",
    icon: "💳",
  },
  {
    q: "How do I get my prescription refilled?",
    a: "You can request prescription refills through the Prescriptions tab in your profile.",
    icon: "💊",
  },
];

function FaqItem({ faq, index, isOpen, toggleFaq }) {
  return (
    <div className="border-b border-gray-300">
      <button
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
        onClick={() => toggleFaq(index)}
      >
        <span className="text-base font-medium text-gray-800 flex items-center gap-2">
          <span>{faq.icon}</span> {faq.q}
        </span>
        <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <div className="py-4 text-gray-600 text-sm">{faq.a}</div>}
    </div>
  );
}

// Dialog Components
function HelpDialog() {
  return (
    <div className="space-y-6 text-slate-700">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-700 flex items-center">
          <span className="mr-2">📘</span> Knowledge Base
        </h3>
        <p className="mt-2">
          Browse our extensive knowledge base to find detailed answers to your
          questions.
        </p>
      </div>
      <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-purple-700 flex items-center">
          <span className="mr-2">🎓</span> Video Tutorials
        </h3>
        <p className="mt-2">
          Watch step-by-step video guides on how to use MediElite features.
        </p>
      </div>
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-amber-700 flex items-center">
          <span className="mr-2">⚡</span> Quick Start Guides
        </h3>
        <p className="mt-2">
          Get up to speed quickly with our easy-to-follow quick start guides.
        </p>
      </div>
    </div>
  );
}

function RateUsDialog({ rating, setRating, showConfetti, setShowConfetti, setActiveOption }) {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-10">
        {rating === 5 && (
          <>
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={400}
              gravity={0.12}
            />
            <div className="w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-5xl animate-bounce">
                ✓
              </div>
            </div>
          </>
        )}
        <div className="text-emerald-700 font-bold text-2xl mb-2">
          Feedback Submitted Successfully!
        </div>
        <div className="text-slate-600 mb-6">
          Thank you for your feedback. We appreciate your input!
        </div>
        <button
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-medium rounded-xl shadow-lg"
          onClick={() => {
            setSubmitted(false);
            setRating(0);
            setFeedback("");
            setActiveOption(null); // close dialog and return to welcome panel
          }}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Local confetti around rating dialog */}
      {showConfetti && (
        <Confetti
          width={300}
          height={300}
          recycle={false}
          numberOfPieces={200}
          gravity={0.12}
        />
      )}
      <form className="flex flex-col items-center py-6" onSubmit={handleSubmit}>
        <p className="text-slate-700 text-center text-lg mb-4">
          How would you rate your experience with MediElite?
        </p>
        <div className="flex gap-4 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setRating(star);
                if (star === 5) {
                  setShowConfetti(true);
                  setTimeout(() => setShowConfetti(false), 3000);
                }
              }}
              className={`text-5xl ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              ★
            </motion.button>
          ))}
        </div>
        {rating > 0 && (
          <div className="mt-4 w-full flex flex-col items-center">
            <div className="mb-2 text-3xl">
              {rating === 5 && "🤩"}
              {rating === 4 && "😄"}
              {rating === 3 && "😊"}
              {rating === 2 && "😐"}
              {rating === 1 && "😞"}
            </div>
            <div className="mb-2 font-bold text-xl text-slate-800">
              {rating === 5 && "Excellent!"}
              {rating === 4 && "Great!"}
              {rating === 3 && "Good"}
              {rating === 2 && "Fair"}
              {rating === 1 && "Poor"}
            </div>
            <div className="text-slate-600 mb-2">
              {rating >= 4
                ? "We're thrilled you had such a great experience! Thank you for your feedback."
                : rating === 3
                ? "Thank you for your feedback. We're always working to improve."
                : "We're sorry your experience wasn't better. Would you like to tell us more?"}
            </div>
            {rating <= 3 && (
              <textarea
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none mt-2"
                rows={4}
                placeholder="Please tell us how we can improve..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required={rating <= 2}
              />
            )}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

function EmailDialog({
  emailForm,
  setEmailForm,
  emailSent,
  setEmailSent,
  setActiveOption,
}) {
  return emailSent ? (
    <div className="py-10 text-center">
      <div className="w-32 h-32 mx-auto mb-6">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-5xl animate-bounce">
          ✓
        </div>
      </div>
      <div className="text-emerald-700 font-bold text-2xl mb-2">
        Message Sent Successfully!
      </div>
      <div className="text-slate-600 mb-6">
        We'll get back to you as soon as possible.
      </div>
      <button
        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-medium rounded-xl shadow-lg"
        onClick={() => {
          setActiveOption(null);
          setEmailSent(false);
        }}
      >
        Close
      </button>
    </div>
  ) : (
    <form
      className="space-y-4 py-4"
      onSubmit={(e) => {
        e.preventDefault();
        setEmailSent(true);
      }}
    >
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Your Name
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
          placeholder="Enter your full name"
          required
          value={emailForm.name}
          onChange={(e) =>
            setEmailForm((f) => ({ ...f, name: e.target.value }))
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Your Email
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
          placeholder="Enter your email address"
          type="email"
          required
          value={emailForm.email}
          onChange={(e) =>
            setEmailForm((f) => ({ ...f, email: e.target.value }))
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Message
        </label>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 resize-none"
          placeholder="How can we help you today?"
          rows={5}
          required
          value={emailForm.message}
          onChange={(e) =>
            setEmailForm((f) => ({ ...f, message: e.target.value }))
          }
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200"
          onClick={() => setActiveOption(null)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-medium rounded-xl shadow-lg"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}

function PhoneDialog() {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="text-7xl mb-6">📱</div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 w-full max-w-md shadow-inner mb-6">
        <div className="text-3xl font-bold text-slate-800 mb-1">MediElite</div>
        <div className="text-slate-600">(800) 123-4567</div>
      </div>
      <a
        href="tel:18006333548"
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg flex items-center gap-2 text-lg"
      >
        <span>Call Now</span>
      </a>
      <div className="text-slate-600 text-sm mt-6">
        <div className="font-medium mb-1">
          Available 24/7 for urgent support
        </div>
        <div>Mon-Fri: 8am-9pm ET | Sat-Sun: 9am-6pm ET</div>
      </div>
      <div className="mt-8 bg-amber-50 p-4 rounded-xl text-amber-800 flex items-start gap-3">
        <span className="text-xl">💡</span>
        <p className="text-sm">
          Prefer a callback instead? Leave your number in our email support form
          and we'll call you back within 30 minutes!
        </p>
      </div>
    </div>
  );
}

// Main component
export default function SupportFeedback() {
  const [activeOption, setActiveOption] = useState(null);
  const [rating, setRating] = useState(0);
  const [emailForm, setEmailForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "support", text: "Hi! How can we help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Reset all dialog state when opening/closing an option
  useEffect(() => {
    if (activeOption !== null) {
      setRating(0);
      setEmailForm({ name: "", email: "", message: "" });
      setEmailSent(false);
      setShowConfetti(false);
      setMessages([
        { sender: "support", text: "Hi! How can we help you today?" },
      ]);
      setUserInput("");
      setOpenFaqIndex(null);
    }
  }, [activeOption]);

  const toggleFaq = (index) =>
    setOpenFaqIndex(openFaqIndex === index ? null : index);

  const WelcomePanel = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col items-center justify-center h-full min-h-[420px] text-center p-8 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl shadow-xl border border-white/30"
    >
      <div className="mb-6">
        <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-cyan-300 flex items-center justify-center text-6xl shadow-lg animate-pulse">
          <FaHeadset className="text-white" />
        </div>
      </div>
      <h2 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600">
        Welcome to Support & Feedback
      </h2>
      <p className="text-lg text-slate-700 mb-4 max-w-xl mx-auto">
        Select a support option below to get instant help, chat with our team,
        or share your feedback. We're here for you 24/7!
      </p>
    </motion.div>
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    const userMessage = userInput;
    setUserInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "support",
          text: "Thank you for your message. How else can I assist you?",
        },
      ]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative pb-12"
    >
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* --- SMALL HEADER SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 flex items-center gap-4 border border-white/50"
        >
          <FaHeadset className="text-4xl text-emerald-600" />
          <div>
            <h1 className="text-3xl font-extrabold">How Can We Help?</h1>
            <p className="text-slate-700">
              Our team is here to assist you with any questions, concerns, or
              feedback. Choose an option below to get started.
            </p>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="mb-10 bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🔍</span>
            <h2 className="text-2xl font-bold text-emerald-700">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openFaqIndex === index}
                toggleFaq={toggleFaq}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() =>
                setActiveOption((prev) => (prev === opt.key ? null : opt.key))
              }
              className={`flex items-center gap-3 p-4 rounded-xl text-left transition font-semibold text-slate-800 hover:bg-emerald-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                activeOption === opt.key
                  ? "bg-emerald-100 border-emerald-300 shadow-md"
                  : ""
              }`}
              tabIndex={0}
              aria-pressed={activeOption === opt.key}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <div className="flex-1">
                <div>{opt.label}</div>
                <div className="text-xs text-gray-500 font-normal">
                  {opt.desc}
                </div>
              </div>
              <span className="ml-auto text-lg">→</span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {!activeOption && <WelcomePanel key="welcome" />}
            {activeOption && (
              <motion.div
                key={activeOption}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 relative overflow-hidden border border-white/30 w-full"
              >
                <button
                  onClick={() => setActiveOption(null)}
                  className="absolute top-4 right-4 text-rose-500 hover:bg-rose-100 rounded-full w-9 h-9 flex items-center justify-center text-2xl font-bold focus:outline-none transition-colors z-10"
                  aria-label="Close dialog"
                >
                  ×
                </button>
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-3xl">
                    {
                      supportOptions.find((opt) => opt.key === activeOption)
                        ?.emoji
                    }
                  </span>
                  <h2 className="text-2xl font-bold text-emerald-700">
                    {
                      supportOptions.find((opt) => opt.key === activeOption)
                        ?.label
                    }
                  </h2>
                </div>
                {activeOption === "rate" && (
                  <RateUsDialog
                    rating={rating}
                    setRating={setRating}
                    showConfetti={showConfetti}
                    setShowConfetti={setShowConfetti}
                    setActiveOption={setActiveOption} // pass setter to dialog
                  />
                )}
                {activeOption === "chat" && (
                  <div className="flex flex-col h-96">
                    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-emerald-50 to-cyan-50 rounded-xl p-4 mb-4 text-slate-700 shadow-inner">
                      {messages.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`mb-4 flex ${
                            msg.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-xl shadow-md ${
                              msg.sender === "user"
                                ? "bg-emerald-600 text-white rounded-tr-none"
                                : "bg-white rounded-tl-none"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <form
                      onSubmit={handleSendMessage}
                      className="flex gap-2 mt-2"
                    >
                      <motion.input
                        whileFocus={{
                          boxShadow: "0 0 0 3px rgba(16,185,129,0.2)",
                        }}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
                        placeholder="Type your message..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-medium rounded-xl shadow-lg"
                        type="submit"
                      >
                        Send
                      </motion.button>
                    </form>
                  </div>
                )}
                {activeOption === "mail" && (
                  <EmailDialog
                    emailForm={emailForm}
                    setEmailForm={setEmailForm}
                    emailSent={emailSent}
                    setEmailSent={setEmailSent}
                    setActiveOption={setActiveOption}
                  />
                )}
                {activeOption === "phone" && <PhoneDialog />}
                {activeOption === "help" && <HelpDialog />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
