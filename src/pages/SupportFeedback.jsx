import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import {
  FaHeadset,
  FaEnvelope,
  FaPhone,
  FaComment,
  FaQuestionCircle,
  FaStar,
  FaBook,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";

// Animation data - replace with actual animation json files when available
const supportAnimation = {
  animate: true,
  loop: true,
  path: "https://assets9.lottiefiles.com/packages/lf20_ysas4vcp.json",
};

const emailSentAnimation = {
  animate: true,
  loop: false,
  path: "https://assets7.lottiefiles.com/packages/lf20_nw33oiav.json",
};

// Support options data with enhanced visuals
const supportOptions = [
  {
    key: "help",
    label: "Help Center",
    desc: "Browse our knowledge base.",
    icon: <FaBook className="w-7 h-7" />,
    color: "from-blue-500 to-cyan-500",
    hoverColor: "hover:from-blue-400 hover:to-cyan-400",
    emoji: "📚",
  },
  {
    key: "rate",
    label: "Rate Us",
    desc: "Share your experience.",
    icon: <FaStar className="w-7 h-7" />,
    color: "from-yellow-500 to-amber-500",
    hoverColor: "hover:from-yellow-400 hover:to-amber-400",
    emoji: "⭐",
  },
  {
    key: "chat",
    label: "Live Chat",
    desc: "Chat with our support team.",
    icon: <FaComment className="w-7 h-7" />,
    color: "from-emerald-500 to-green-500",
    hoverColor: "hover:from-emerald-400 hover:to-green-400",
    emoji: "💬",
  },
  {
    key: "mail",
    label: "Email Support",
    desc: "Send us a message.",
    icon: <FaEnvelope className="w-7 h-7" />,
    color: "from-rose-500 to-pink-500",
    hoverColor: "hover:from-rose-400 hover:to-pink-400",
    emoji: "📧",
  },
  {
    key: "phone",
    label: "Phone Support",
    desc: "Call us for help.",
    icon: <FaPhone className="w-7 h-7" />,
    color: "from-sky-500 to-blue-500",
    hoverColor: "hover:from-sky-400 hover:to-blue-400",
    emoji: "📞",
  },
];

// Enhanced FAQ Data
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

// Testimonials - Social proof to build trust
const testimonials = [
  {
    name: "Sarah J.",
    rating: 5,
    text: "The support team responded within minutes! Amazing service.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Michael T.",
    rating: 5,
    text: "Had a technical issue that was resolved immediately. Very impressed!",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Priya K.",
    rating: 5,
    text: "The live chat feature is incredibly helpful and convenient.",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

// New Component: Animated Support Card
function SupportCard({ option, onClick }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        y: -5,
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`relative flex items-center gap-4 rounded-2xl p-6 transition-all duration-300 group overflow-hidden w-full h-full min-h-[160px]`}
    >
      {/* Background gradient that animates on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-90 group-hover:opacity-100 transition-opacity`}
      ></div>

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] group-hover:backdrop-blur-0 transition-all"></div>

      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-white/20 blur-lg transform group-hover:scale-150 transition-transform duration-500"></div>

      <div className="flex flex-col md:flex-row items-center gap-4 z-10 w-full">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/30 text-white text-3xl shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
          {option.emoji}
        </span>
        <div className="flex-1 text-left">
          <div className="text-xl font-bold text-white">{option.label}</div>
          <div className="text-white/90 mt-1 font-medium">{option.desc}</div>
        </div>
        <motion.span
          className="text-white text-3xl opacity-70 group-hover:opacity-100"
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          →
        </motion.span>
      </div>
    </motion.button>
  );
}

// Updated FAQ design to match the provided screenshot
function FaqItem({ faq, index, isOpen, toggleFaq }) {
  return (
    <div className="border-b border-gray-300">
      <button
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
        onClick={() => toggleFaq(index)}
      >
        <span className="text-base font-medium text-gray-800">{faq.q}</span>
        <span className="text-gray-500">
          {isOpen ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
        </span>
      </button>
      {isOpen && <div className="py-4 text-gray-600 text-sm">{faq.a}</div>}
    </div>
  );
}

// Updated Rate Us dialog to show a success message after submitting feedback
function RateUsDialog({ rating, setRating, setShowConfetti }) {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmitFeedback = () => {
    setFeedbackSubmitted(true);
  };

  if (feedbackSubmitted) {
    return (
      <motion.div
        className="py-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-32 h-32 mx-auto mb-6">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-5xl animate-bounce">
            ✓
          </div>
        </div>
        <div className="text-emerald-700 font-bold text-2xl mb-2">
          Feedback Submitted Successfully!
        </div>
        <div className="text-slate-600 mb-6">
          Thank you for your feedback. We appreciate your input!
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-medium rounded-xl shadow-lg"
          onClick={() => {
            setFeedbackSubmitted(false);
            setRating(0);
          }}
        >
          Close
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center py-6">
      <div className="mb-6">
        <p className="text-slate-700 text-center text-lg">
          How would you rate your experience with MediElite?
        </p>
      </div>
      <div className="flex gap-4 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2, rotate: star <= 2 ? 0 : -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setRating(star);
              if (star === 5) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
              }
            }}
            className={`text-5xl transition-all ${
              star <= rating
                ? "text-yellow-400 drop-shadow-lg"
                : "text-gray-300"
            }`}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            ★
          </motion.button>
        ))}
      </div>
      {rating > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 flex flex-col items-center"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {rating === 5 && <span className="text-7xl">🤩</span>}
            {rating === 4 && <span className="text-7xl">😄</span>}
            {rating === 3 && <span className="text-7xl">😊</span>}
            {rating === 2 && <span className="text-7xl">😐</span>}
            {rating === 1 && <span className="text-7xl">😞</span>}
          </motion.div>

          <div className="mt-4 text-center">
            <h3 className="font-bold text-xl text-slate-800">
              {rating === 5 && "Excellent!"}
              {rating === 4 && "Great!"}
              {rating === 3 && "Good"}
              {rating === 2 && "Fair"}
              {rating === 1 && "Poor"}
            </h3>

            <p className="text-slate-600 mt-2">
              {rating >= 4
                ? "We're thrilled you had such a great experience! Thank you for your feedback."
                : rating === 3
                ? "Thank you for your feedback. We're always working to improve."
                : "We're sorry your experience wasn't better. Would you like to tell us more?"}
            </p>

            {rating <= 3 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4"
              >
                <textarea
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                  rows={4}
                  placeholder="Please tell us how we can improve..."
                ></textarea>
                <button
                  className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  onClick={handleSubmitFeedback}
                >
                  Submit Feedback
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Main component
export default function SupportFeedback() {
  const [activeOption, setActiveOption] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [emailForm, setEmailForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { width, height } = useWindowSize();
  const chatRef = useRef(null);
  const [messages, setMessages] = useState([
    { sender: "support", text: "Hi! How can we help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Reset state when clicking on a support option
  useEffect(() => {
    if (activeOption) {
      setRating(0);
      setHoverRating(0);
      setEmailForm({ name: "", email: "", message: "" });
      setEmailSent(false);
      setUserInput("");
      setMessages([
        { sender: "support", text: "Hi! How can we help you today?" },
      ]);
    }
  }, [activeOption]);

  // Auto-cycle testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll chat to bottom when new message is added
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Update confetti animation to show throughout the page for 3 seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Simulated chat response
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    const userMessage = userInput;
    setUserInput("");

    // Simulate typing delay then response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "support",
          text: getAutoResponse(userMessage),
        },
      ]);
    }, 1000);
  };

  // Simple auto-response based on keywords
  const getAutoResponse = (msg) => {
    const msgLower = msg.toLowerCase();
    if (
      msgLower.includes("appointment") ||
      msgLower.includes("book") ||
      msgLower.includes("schedule")
    )
      return "To book an appointment, go to the Appointments page and select your preferred doctor and time slot. Need more specific guidance?";
    if (
      msgLower.includes("report") ||
      msgLower.includes("test") ||
      msgLower.includes("result")
    )
      return "Your medical reports can be accessed in the Reports & Claims section. Is there a specific report you're looking for?";
    if (msgLower.includes("thank") || msgLower.includes("thanks"))
      return "You're welcome! Is there anything else I can help you with today?";
    return "Thank you for your message. How else can I assist you with your healthcare needs today?";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative pb-12"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Top gradient blob */}
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-emerald-500/20 to-transparent"></div>

        {/* Animated circles */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full bg-gradient-to-r from-amber-400/10 to-rose-400/10 blur-xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut",
            delay: 1,
          }}
        ></motion.div>
      </div>

      {/* If rating is 5, show confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.12}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden border border-white/50"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-48 h-48">
                {/* Animation placeholder - replace with actual Lottie component when available */}
                <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-300 rounded-full flex items-center justify-center text-6xl shadow-lg animate-pulse">
                  <FaHeadset className="text-white" />
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600">
                  How Can We Help You?
                </span>
              </h1>
              <p className="text-slate-700 text-xl leading-relaxed">
                Our team is here to assist you with any questions, concerns, or
                feedback. Choose an option below to get started.
              </p>

              {/* Animated indicator */}
              <motion.div
                className="mt-6 flex items-center text-emerald-600"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mr-2 text-xl"
                >
                  👇
                </motion.div>
                <span className="font-medium">Choose an option below</span>
              </motion.div>
            </div>
          </div>

          {/* Testimonial carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-emerald-800 font-bold">What our users say</h3>
              <div className="flex space-x-1">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-2 h-2 rounded-full ${
                      activeTestimonial === i
                        ? "bg-emerald-500"
                        : "bg-emerald-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4"
              >
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt="User"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 mr-2">
                      {testimonials[activeTestimonial].name}
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(testimonials[activeTestimonial].rating)].map(
                        (_, i) => (
                          <FaStar key={i} />
                        )
                      )}
                    </div>
                  </div>
                  <p className="text-slate-600 italic">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* FAQ Section - Direct display instead of dialog */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10 bg-white rounded-3xl shadow-xl p-8"
        >
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
                className="transition-transform duration-300"
              />
            ))}
          </div>
        </motion.div>

        {/* Support Options Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold mb-6 text-slate-800">
            Choose your support option
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportOptions
              .filter((opt) => opt.key !== "faq")
              .map((opt, index) => (
                <motion.div
                  key={opt.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <SupportCard
                    option={opt}
                    onClick={() => setActiveOption(opt.key)}
                  />
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Active Support Content */}
        <AnimatePresence>
          {activeOption && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 relative overflow-hidden border border-white/30"
            >
              <button
                onClick={() => setActiveOption(null)}
                className="absolute top-4 right-4 text-rose-500 hover:bg-rose-100 rounded-full w-9 h-9 flex items-center justify-center text-2xl font-bold focus:outline-none transition-colors z-10"
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
                  setShowConfetti={setShowConfetti}
                />
              )}

              {activeOption === "chat" && (
                <div className="flex flex-col h-96">
                  <div
                    ref={chatRef}
                    className="flex-1 overflow-y-auto bg-gradient-to-b from-emerald-50 to-cyan-50 rounded-xl p-4 mb-4 text-slate-700 shadow-inner"
                  >
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
                <div>
                  {emailSent ? (
                    <motion.div
                      className="py-10 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-32 h-32 mx-auto mb-6">
                        {/* Animation placeholder - replace with Lottie */}
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
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-medium rounded-xl shadow-lg"
                        onClick={() => setActiveOption(null)}
                      >
                        Close
                      </motion.button>
                    </motion.div>
                  ) : (
                    <form
                      className="space-y-4 py-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setEmailSent(true);
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Your Name
                        </label>
                        <motion.input
                          whileFocus={{
                            boxShadow: "0 0 0 3px rgba(16,185,129,0.2)",
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 transition-shadow"
                          placeholder="Enter your full name"
                          required
                          value={emailForm.name}
                          onChange={(e) =>
                            setEmailForm((f) => ({
                              ...f,
                              name: e.target.value,
                            }))
                          }
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Your Email
                        </label>
                        <motion.input
                          whileFocus={{
                            boxShadow: "0 0 0 3px rgba(16,185,129,0.2)",
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 transition-shadow"
                          placeholder="Enter your email address"
                          type="email"
                          required
                          value={emailForm.email}
                          onChange={(e) =>
                            setEmailForm((f) => ({
                              ...f,
                              email: e.target.value,
                            }))
                          }
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Message
                        </label>
                        <motion.textarea
                          whileFocus={{
                            boxShadow: "0 0 0 3px rgba(16,185,129,0.2)",
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 transition-shadow resize-none"
                          placeholder="How can we help you today?"
                          rows={5}
                          required
                          value={emailForm.message}
                          onChange={(e) =>
                            setEmailForm((f) => ({
                              ...f,
                              message: e.target.value,
                            }))
                          }
                        />
                      </motion.div>
                      <div className="flex justify-end gap-3 pt-2">
                        <motion.button
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#f3f4f6",
                          }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                          onClick={() => setActiveOption(null)}
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-medium rounded-xl shadow-lg"
                        >
                          Send Message
                        </motion.button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {activeOption === "phone" && (
                <div className="flex flex-col items-center py-8 text-center">
                  <motion.div
                    animate={{
                      rotate: [0, -5, 5, -5, 5, 0],
                      y: [0, -2, 2, -2, 2, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "loop",
                      repeatDelay: 3,
                    }}
                    className="text-7xl mb-6"
                  >
                    📱
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 w-full max-w-md shadow-inner mb-6"
                  >
                    <div className="text-3xl font-bold text-slate-800 mb-1">
                      MediElite{" "}
                    </div>
                    <div className="text-slate-600">(800) 123-4567</div>
                  </motion.div>
                  <motion.a
                    href="tel:18006333548"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg flex items-center gap-2 text-lg"
                  >
                    <span>Call Now</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.83a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.93.34 1.87.573 2.83.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </motion.a>
                  <div className="text-slate-600 text-sm mt-6">
                    <div className="font-medium mb-1">
                      Available 24/7 for urgent support
                    </div>
                    <div>Mon-Fri: 8am-9pm ET | Sat-Sun: 9am-6pm ET</div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 bg-amber-50 p-4 rounded-xl text-amber-800 flex items-start gap-3"
                  >
                    <span className="text-xl">💡</span>
                    <p className="text-sm">
                      Prefer a callback instead? Leave your number in our email
                      support form and we'll call you back within 30 minutes!
                    </p>
                  </motion.div>
                </div>
              )}

              {activeOption === "help" && (
                <div className="space-y-6 text-slate-700">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-bold text-blue-700 flex items-center">
                      <span className="mr-2">📘</span> Knowledge Base
                    </h3>
                    <p className="mt-2">
                      Browse our extensive knowledge base to find detailed
                      answers to your questions.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-bold text-purple-700 flex items-center">
                      <span className="mr-2">🎓</span> Video Tutorials
                    </h3>
                    <p className="mt-2">
                      Watch step-by-step video guides on how to use MediElite
                      features.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-bold text-amber-700 flex items-center">
                      <span className="mr-2">⚡</span> Quick Start Guides
                    </h3>
                    <p className="mt-2">
                      Get up to speed quickly with our easy-to-follow quick
                      start guides.
                    </p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
