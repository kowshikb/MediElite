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
      className="max-w-7xl mx-auto px-4 py-6"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-3">Find Your Doctor</h1>
        <p className="text-blue-100 text-lg">
          Browse through our network of qualified healthcare professionals
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>

          {/* Specialty Filter */}
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="rating">Sort by Rating</option>
            <option value="experience">Sort by Experience</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Availability Toggle */}
        <div className="mt-4 flex items-center space-x-2">
          <input
            type="checkbox"
            id="availableOnly"
            checked={isAvailableOnly}
            onChange={(e) => setIsAvailableOnly(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="availableOnly" className="text-gray-700">
            Show available doctors only
          </label>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Results Stats */}
      <div className="mb-6 text-gray-600">
        Found {filteredDoctors.length} doctor
        {filteredDoctors.length !== 1 ? "s" : ""}
        {selectedSpecialty !== "all" && ` in ${selectedSpecialty}`}
        {selectedLanguage !== "all" && ` speaking ${selectedLanguage}`}
        {isAvailableOnly && " available now"}
      </div>

      {/* Results */}
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
          <span className="text-6xl mb-4 block">🔍</span>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No doctors found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or filters
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DoctorDirectory;
