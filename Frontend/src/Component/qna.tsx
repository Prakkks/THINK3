import React, { useEffect, useRef, useState } from "react";
import type { QuestionProps } from "../Types/type";
import TimeCounter from "./clock";
import AnimatedPopup from "./popUp";
import { AnimatePresence, motion } from "framer-motion";
import ErrorPage from "./errorPage";

const Qna = () => {
  const [trigger, setTrigger] = useState(0);
  const [question, setQuestion] = useState<QuestionProps | "">("");
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [sampleanswers, setSampleAnswers] = useState<string[]>(["", "", ""]);
  const [times, setTimes] = useState(60);
  const [completed, setCompleted] = useState(false);
  const [guessWord, setGuessWord] = useState<string[]>([]);

  function extractanswers(answer: string) {
    const parts = answer.split(",").map((item) => item.trim());
    return parts.some((part) => part.toLowerCase() === input.toLowerCase());
  }

  const handleTrigger = () => {
    setTrigger((prev) => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question || !question.things || question.things.length === 0) return;

    if (extractanswers(question?.things[0].toLowerCase())) {
      setAnswers((prev) => {
        const updated = [...prev];
        updated[0] = input.trim().toLowerCase();
        return updated;
      });
    }
    if (extractanswers(question?.things[1].toLowerCase())) {
      setAnswers((prev) => {
        const updated = [...prev];
        updated[1] = input.trim().toLowerCase();
        return updated;
      });
    }
    if (extractanswers(question?.things[2].toLowerCase())) {
      setAnswers((prev) => {
        const updated = [...prev];
        updated[2] = input.trim().toLowerCase();
        return updated;
      });
    }
    if (input.trim() !== "") {
      setGuessWord((prev) => [...prev, input.trim().toLowerCase()]);
    }
    setInput("");
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchquestions() {
      try {
        // const res = await fetch("http://localhost:5000/api/random_unique");
        const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/endpoint`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setQuestion(data);
            const processedAnswers = data["things"].map((ans: string) => {
              const parts = ans.split(",");
              return parts[0].trim().toLowerCase();
            });
            setSampleAnswers(processedAnswers);
            setError("");
          }
        } else if (res.status === 404) {
          if (isMounted) {
            setError("Something went wrong.");
            setQuestion("");
          }
        } else {
          setError("setError fetching question");
          setQuestion("");
        }
      } catch (err) {
        if (isMounted) {
          setError("Network error");
          setQuestion("");
        }
      }
    }
    fetchquestions();
    return () => {
      isMounted = false;
    };
  }, [trigger]);

  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const sampleanswersRef = useRef(sampleanswers);
  useEffect(() => {
    sampleanswersRef.current = sampleanswers;
  }, [sampleanswers]);

  useEffect(() => {
    setAnswers(["", "", ""]);
    setSampleAnswers(["", "", ""]);
    setGuessWord([]);
    setCompleted(false);
    setTimes(60);

    const countdown = setInterval(() => {
      const currentAnswers = answersRef.current;
      const sampleAnswers1 = sampleanswersRef.current;
      const allAnswered = currentAnswers.every((a) => a !== "");

      setTimes((prev) => {
        if (prev <= 1 || allAnswered) {
          clearInterval(countdown);
          setCompleted(true);

          if (!allAnswered) {
            const filledAnswers = [...currentAnswers];
            for (let i = 0; i < 3; i++) {
              if (filledAnswers[i] === "") filledAnswers[i] = sampleAnswers1[i];
            }
            setAnswers(filledAnswers);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [trigger]);

  return (
    <>
      {error && <ErrorPage message={error} />}
      {question && (
        <AnimatePresence mode="wait">
          <motion.div
            key={trigger}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-full bg-[#FFF9F5] px-4 sm:px-6 md:px-12 py-8 flex flex-col items-center"
          >
            {/* Logo */}
            <header className="mb-8 mt-10 flex justify-center sm:justify-start">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2E2E3A] tracking-tight select-none">
                Think
                <span className="text-[#F76C6C]">3</span>
              </h1>
              <div className="w-16 h-1 bg-[#F76C6C] rounded-full mt-2 ml-3"></div>
            </header>

            {/* Question & Timer */}
            <section className="flex flex-col sm:flex-row items-center sm:justify-between w-full max-w-4xl mb-5 gap-2 sm:gap-6">
              <h2 className="text-2xl sm:text-3xl playfulfont font-bold text-[#2E2E3A] leading-tight flex-1 text-center sm:text-left">
                "{question.title}"
              </h2>
              <div className="mt-1 sm:mt-0 flex justify-center sm:justify-end w-full sm:w-auto">
                <TimeCounter times={times} />
              </div>
            </section>

            {/* Category Badge */}
            <p className="mb-6 px-4 py-1 bg-[#FBE8E8] text-[#F76C6C] rounded-full uppercase text-xs sm:text-sm font-semibold tracking-wide select-none max-w-xs text-center sm:text-left">
              Category: {question.category}
            </p>

            {/* Input & Submit */}
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl flex flex-col gap-3 mb-8 sm:flex-row sm:gap-4"
            >
              <input
                type="text"
                value={input}
                disabled={completed}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your guess here..."
                className="flex-grow rounded-md border border-[#F76C6C] p-2 sm:p-3 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F76C6C] transition"
              />
              <button
                type="submit"
                disabled={completed}
                className="bg-[#4B47A1] hover:bg-[#3a3781] text-white rounded-md px-6 py-2 sm:px-8 sm:py-3 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </form>

            {/* Answers: vertical on small, horizontal on md+ */}
            <div className="w-fullmax-w-4xl flex flex-col sm:flex-row justify-center gap-4 mb-8">
              {answers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`w-full sm:min-w-[100px]  min-w-[90vw] items-center     max-w-xs text-center p-3 rounded-lg font-semibold text-lg
                  ${
                    ans !== "" && !completed
                      ? "bg-[#F76C6C] text-white shadow-md"
                      : "bg-[#D7D3E4] text-[#4B47A1]"
                  }`}
                >
                  {ans || "?"}
                </div>
              ))}
            </div>

            {/* Guessed Words */}
            {guessWord.length > 0 && (
              <section className="max-w-4xl w-full mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-[#2E2E3A] mb-3 select-none">
                  Guessed Words
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                  {guessWord.map((word, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-white text-xs sm:text-sm cursor-default select-none transition
                      ${
                        answers.includes(word)
                          ? "bg-[#4B47A1] shadow-sm"
                          : "bg-[#C4B7D9] text-[#2E2E3A]"
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Next Question Button */}
            <div className="w-full max-w-xl flex justify-center">
              <AnimatedPopup show={completed} onNext={handleTrigger} />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Qna;
