import React from "react";
import { motion } from "framer-motion";

const Homepage = () => {
  const handleOpenPDF = (pdfPath) => {
    window.open(pdfPath, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Our Portfolios</h1>
      <p className="text-lg text-center mb-10 max-w-xl">
        Explore the professional portfolios of our talented team members. Click the buttons below to view each portfolio in a new tab.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <h2 className="text-2xl font-semibold mb-2">Sabtian's Portfolio</h2>
          <p className="text-center mb-4">
            Discover Sabtian's work, skills, and accomplishments in software engineering.
          </p>
          <button
            onClick={() => handleOpenPDF("/Sabtian_Portfolio.pdf")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View Portfolio
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <h2 className="text-2xl font-semibold mb-2">Mojila's Portfolio</h2>
          <p className="text-center mb-4">
            Explore Mojila's creative portfolio and her experience in UI/UX design.
          </p>
          <button
            onClick={() => handleOpenPDF("/Mojila_Portfolio.pdf")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            View Portfolio
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Homepage;
