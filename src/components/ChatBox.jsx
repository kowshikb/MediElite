import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "Welcome! How can we help you today?",
      timestamp: new Date(),
    },
    {
      id: 2,
      sender: "doctor",
      text: "Hi, I'm Dr. Johnson. I'll be assisting you today.",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate doctor response
    setTimeout(() => {
      const doctorMessage = {
        id: messages.length + 2,
        sender: "doctor",
        text: "Thank you for your message. I understand your concern. Let me help you with that.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, doctorMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden h-[600px] flex flex-col"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-2xl">👨‍⚕️</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Dr. Johnson</h3>
            <span className="text-blue-100 text-sm">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : message.sender === "system"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-green-500 text-white"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-gray-500"
          >
            <span className="text-sm">Dr. Johnson is typing</span>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-gray-500 rounded-full"
            />
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-200"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatBox;
