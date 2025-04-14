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
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === "user"
                  ? "bg-emerald-500 text-white ml-4"
                  : "bg-emerald-50 text-gray-800 mr-4"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span
                className={`text-xs mt-1 block ${
                  message.sender === "user"
                    ? "text-emerald-100"
                    : "text-emerald-600"
                }`}
              >
                {message.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="input-field flex-grow"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn-primary px-6"
          >
            Send
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
