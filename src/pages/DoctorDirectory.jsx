import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DoctorCard from "../components/DoctorCard";
import doctorsData from "../data/doctors.json";

const DoctorDirectory = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    setDoctors(doctorsData.doctors || []);
  }, []);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("all");
    setSelectedLanguage("all");
    setIsAvailableOnly(false);
    setSortBy("rating");
  };

  const specialties = [
    "all",
    ...new Set(doctors.map((doctor) => doctor.specialty)),
  ];
  const languages = [
    "all",
    ...new Set(doctors.flatMap((doctor) => doctor.languages)),
  ];

  const sortDoctors = (docs) => {
    switch (sortBy) {
      case "rating":
        return [...docs].sort((a, b) => b.rating - a.rating);
      case "experience":
        return [...docs].sort(
          (a, b) => parseInt(b.experience) - parseInt(a.experience)
        );
      case "name":
        return [...docs].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return docs;
    }
  };

  const filteredDoctors = sortDoctors(
    doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.subspecialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
      const matchesLanguage =
        selectedLanguage === "all" ||
        doctor.languages.includes(selectedLanguage);
      const matchesAvailability = !isAvailableOnly || doctor.availability;
      return (
        matchesSearch &&
        matchesSpecialty &&
        matchesLanguage &&
        matchesAvailability
      );
    })
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Enhanced Header with improved gradient styling */}
      <div className="relative overflow-hidden glass-card bg-gradient-to-r from-emerald-700 to-green-400 rounded-3xl p-4 md:p-6 mb-6">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
              Find a Doctor, Kowshik Kumar
            </h1>
            <p className="text-blue-100 text-sm md:text-base">
              Browse our network of trusted healthcare professionals
            </p>
          </div>
          <div className="hidden md:block"></div>
        </div>
        {/* Enhanced decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-blue-300 rounded-full filter blur-xl opacity-20"></div>
      </div>

      {/* Filters */}
      <div className="card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
            <span className="absolute left-4 top-3.5 text-gray-400 text-xl">
              🔍
            </span>
          </div>

          {/* Specialty Filter */}
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="input-field"
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty === "all" ? "All Specialties" : specialty}
              </option>
            ))}
          </select>

          {/* Language Filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="input-field"
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language === "all" ? "All Languages" : language}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            <option value="rating">Sort by Rating</option>
            <option value="experience">Sort by Experience</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Availability Toggle */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="availableOnly"
              checked={isAvailableOnly}
              onChange={(e) => setIsAvailableOnly(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor="availableOnly"
              className="text-gray-700 font-medium"
            >
              Show available doctors only
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetFilters}
            className="btn-secondary"
          >
            Reset Filters
          </motion.button>
        </div>
      </div>

      {/* Results Stats */}
      <div className="mb-6 text-gray-600 font-medium px-2">
        Found {filteredDoctors.length} doctor
        {filteredDoctors.length !== 1 ? "s" : ""}
        {selectedSpecialty !== "all" && ` in ${selectedSpecialty}`}
        {selectedLanguage !== "all" && ` speaking ${selectedLanguage}`}
        {isAvailableOnly && " available now"}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
            >
              <DoctorCard doctor={doctor} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredDoctors.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <span className="text-6xl mb-6 block">🔍</span>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No doctors found
          </h3>
          <p className="text-gray-500 text-lg">
            Try adjusting your filters or search terms
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DoctorDirectory;
