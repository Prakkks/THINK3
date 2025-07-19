import React from "react";
import { motion } from "framer-motion";

interface HomeProps {
  onStart: () => void;
}

const HomePage: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200">
      {/* Header */}
      <header className="flex items-center justify-center py-12 border-b border-amber-200">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-amber-800 select-none"
        >
          Think<span className="text-amber-600">3</span>
        </motion.h1>
      </header>

      {/* Main content area */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white max-w-3xl w-full rounded-lg shadow-lg p-10 text-gray-800"
          style={{ boxShadow: "0 10px 25px rgba(245, 158, 11, 0.15)" }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-700">Welcome to Think3</h2>

          <p className="mb-6 leading-relaxed text-gray-700">
            Think3 is a fast-paced word guessing game designed to challenge your brain and reflexes.
            Sharpen your mind by guessing three correct answers within 60 seconds per question.
          </p>

          <ul className="list-disc list-inside space-y-3 text-amber-600 mb-6">
            <li>⏱️ 60 seconds to answer each question</li>
            <li>✔️ Guess 3 correct answers per round</li>
            <li>🎯 Color-coded feedback on your guesses</li>
            
          </ul>

          <p className="text-sm italic text-amber-400 mb-8">
            Ready to test your skills? Click below to start!
          </p>

          <button
            onClick={onStart}
            className="w-full py-3 bg-amber-800 text-white rounded-md font-semibold hover:bg-amber-700 transition shadow-md"
          >
            Start Game →
          </button>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 text-sm border-t border-amber-200 select-none">
        &copy; {new Date().getFullYear()} Think3. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
