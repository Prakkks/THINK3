
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
  onNext: () => void;
}

export default function AnimatedPopup({ show, onNext }: Props) {
  return (
    <AnimatePresence>
      {show && (
        // <motion.div
        //   key="popup"
        //   initial={{ opacity: 0, y: 80 }}
        //   animate={{ opacity: 1, y: 0 }}
        //   exit={{ opacity: 0, y: 80 }}
        //   transition={{ duration: 0.4 }}
        //   className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white shadow-xl border border-gray-300 p-6 rounded-xl z-50"
        // >
        //   <p className="text-xl mb-3 text-green-700 font-semibold">
        //     🎉 Great job! Ready for the next?
        //   </p>
        //   <button
        //     onClick={onNext}
        //     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        //   >
        //     Next Question →
        //   </button>
        // </motion.div>
         <div className="flex flex-col items-center mt-8 space-y-4">
       <motion.p
         initial={{ opacity: 0, y: 13 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.9, ease: "easeOut" }}
         className="text-yellow-600 text-lg font-semibold select-none"
       >
        
       </motion.p>

       <motion.button
         onClick={onNext}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-8 py-3 rounded-full shadow-lg
                    hover:from-blue-600 hover:to-indigo-700
                    focus:outline-none focus:ring-4 focus:ring-blue-300
                    transition-colors duration-300"
       >
         Next Question →
       </motion.button>
     </div>
      )}
    </AnimatePresence>
  );
}
