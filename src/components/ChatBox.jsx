import React, { useState } from "react";
import { motion } from "framer-motion";

const ChatBox = ({ doctorId, doctorName }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "doctor",
      text: "Welcome! How can we help you today?",
      time: "12:04 AM",
    },
    {
      id: 2,
      sender: "doctor",
      text: "Hi, I'm " + doctorName + ". I'll be assisting you today.",
      time: "12:04 AM",
    },
    {
      id: 3,
      sender: "user",
      text: "Hello Doctor, I have been experiencing headaches frequently this week.",
      time: "12:05 AM",
    },
    {
      id: 4,
      sender: "doctor",
      text: "I understand your concern. Could you tell me more about the nature of these headaches? For example, where is the pain located and how long do they typically last?",
      time: "12:06 AM",
    },
    {
      id: 5,
      sender: "user",
      text: "The pain is usually on one side of my head and lasts for about 2-3 hours. It gets worse with bright lights.",
      time: "12:07 AM",
    },
    {
      id: 6,
      sender: "doctor",
      text: "Based on your description, this could be migraine headaches. I recommend scheduling an in-person appointment for a proper evaluation. Would you like to book an appointment?",
      time: "12:08 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate doctor response
    setTimeout(() => {
      const doctorResponse = {
        id: messages.length + 2,
        sender: "doctor",
        text: `I recommend coming in for a check-up so we can better assess your condition. Would you like to schedule an appointment?`,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setMessages((prev) => [...prev, doctorResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-blue-600 p-4 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
            👨‍⚕️
          </div>
          <div>
            <h2 className="text-xl font-semibold">{doctorName}</h2>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              <span className="text-sm text-blue-100">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === "user"
                  ? "bg-blue-500 text-white ml-12"
                  : "bg-white shadow-sm mr-12"
              }`}
            >
              <p className="text-[15px]">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {message.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 input-field"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Send
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
