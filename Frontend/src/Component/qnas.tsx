import React from 'react'
import { useEffect, useRef, useState } from "react"
import type { QuestionProps } from '../Types/type';
import { game_description } from '../Types/text';
import TimeCounter from './clock';
import NextQuestionButton from './popUp';
import AnimatedPopup from './popUp';
import { AnimatePresence, motion } from 'framer-motion';
import ErrorPage from './errorPage';
// import PopUp from './popUp';


const Qna = () =>  {
    const [trigger,setTrigger] = useState(0);
    const [question,setQuestion] = useState<QuestionProps | ''>('');
    const [error, setError] = useState('');
    const [input, setInput] = useState('');
    const [answers, setAnswers] = useState<string[]>(['','','']);
    const [sampleanswers, setSampleAnswers] = useState<string[]>(['','','']);
    const [times, setTimes] = useState(60);
    const [completed, setCompleted ] = useState(false);
    const [guessWord, setGuessWord] = useState<string[]>([]);
    const [green , setGreen] = useState(false);
    
  
    function extractanswers( answer:string )
    {
  
      
       const parts = answer.split(',').map(item => item.trim());
       
       for (const i of parts) {
        if (i.trim().toLowerCase() == input.toLowerCase())
        {
          return true;
        }
       
        }
      return false;
    }

    const handleTrigger = () => {

    setTrigger((prev)=> prev +1)
    }
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
      e.preventDefault();
      
      if (!question || !question.things || question.things.length === 0) {
      console.log("Question not loaded yet");
      return;
    }
      
     
      if (extractanswers(question?.things[0].toLowerCase()))
      {
        setAnswers((prev)=>{
          const updated = [...prev];
          updated[0] = input.trim().toLowerCase();
          return updated;
        });
      }
        if (extractanswers(question?.things[1].toLowerCase()))
      {
        setAnswers((prev)=>{
          const updated = [...prev];
          updated[1] = input.trim().toLowerCase();
          return updated;
        });
      }
       if(extractanswers(question?.things[2].toLowerCase()))
      {
        setAnswers((prev)=>{
          const updated = [...prev];
          updated[2] = input.trim().toLowerCase();
          return updated;
        });
      }
       if (input.trim() !== '') {
      setGuessWord((prev) => [...prev, input.trim().toLowerCase()]);
      }
      setInput('');
    }
  
  
    useEffect(()=>{
     let isMounted = true;
      async function fetchquestions() {
        try {
  
          const res = await fetch("http://localhost:5000/api/random_unique");
          if (res.ok)
          {
            const data = await res.json();
            if (isMounted)
            {setQuestion(data);
             
              const processedAnswers = data['things'].map((ans:string) => {
                const parts = ans.split(',');
                return parts[0].trim().toLowerCase();
              });
              
              setSampleAnswers(processedAnswers);
            setError('');
            }
          }
          else if (res.status === 404) {
            if (isMounted)  
            {setError("Something went wrong.");
            setQuestion('');}
        } else {
          setError("setError fetching question");
          setQuestion('');
        }
  
        }
        catch (err) {
        if (isMounted)    
        {setError("Network error");
        setQuestion('');}
      }
      }
      // alert('button clicked');
      fetchquestions();
  
      return ()=> {
          isMounted = false;
      };
  
    },[trigger]);
    
    // timer useeffect
  
  // ✅ Track latest answers
  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

   const sampleanswersRef = useRef(sampleanswers);
  useEffect(() => {
    sampleanswersRef.current = sampleanswers;
  }, [sampleanswers]);
  
  
  useEffect(() => {
    // if (!trigger) return;
  
    setAnswers(["", "", ""]);
    setSampleAnswers(['','','']);
    setGuessWord([]);
    setCompleted(false);
    setGreen(false);
    setTimes(60);
  
    const countdown = setInterval(() => {
      const currentAnswers = answersRef.current;
      const sampleAnswers1 = sampleanswersRef.current;
      const allAnswered =
        currentAnswers[0] !== "" &&
        currentAnswers[1] !== "" &&
        currentAnswers[2] !== "";
  
      setTimes((prev) => {
        if (prev <= 1 || allAnswered) {
          clearInterval(countdown);
          setCompleted(true);
  
          // ✅ Autofill only if timer ran out and answers are missing
          if (!allAnswered) {
            const filledAnswers = [...currentAnswers];
            if (filledAnswers[0] === "") filledAnswers[0] = sampleAnswers1[0];
            if (filledAnswers[1] === "") filledAnswers[1] = sampleAnswers1[1];
            if (filledAnswers[2] === "") filledAnswers[2] = sampleAnswers1[2];
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
      {/* <button className="border-2 amber-50 bg-amber-700 p-2 m-2" onClick={()=>{setTrigger((prev)=> prev +1)}}>Click me!</button> */}
       {error && <ErrorPage message={error} />}
       {question && 
       <>
      

    {/* ------------------------------------------------------------------------------------------------------------- */}
        <AnimatePresence mode="wait">
  <motion.div
    key={trigger} // Changing this key triggers animation
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4 }}
    className="w-full px-[5%] md:px-[10%] flex flex-col gap-2 md:gap-5 items-center h-[100vh] bg-amber-50"
  >
    {/* Your question content goes here */}
        <section className='w-full px-[5%] md:px-[10%]  flex flex-col gap-2 md:gap-5 items-center h-[100vh] bg-amber-50 '>
            <p className='inspiration-regular text-3xl md:text-[45px]  lg:text-[70px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent  '> Think3</p>
            {/* <p className=''>Welcome to <span className='text-blue-600 font-semibold'>Think3 </span>{game_description}</p> */}

            <div className=' flex flex-row justify-between w-full p-3'>
                <div className='flex flex-row gap-2 items-center'>
                <p className='text-sm md:text-base'> Category: </p>
                <div className=' border-2 border-blue-300 rounded-xl text-sm md:text-base px-2 py-1 bg-blue-300'>  {question.category} </div>
                </div>
                <div className='items-center'> 
                    <TimeCounter times={times} />
                 </div>
            </div>
            {/* question -------- */}
            <p className='font-semibold text-md md:text-3xl lg:text-4xl playfulfont'> "{question.title}"</p>
            <form onSubmit={handleSubmit} className='w-full text-center items-center p-5  border-b-2 border-b-amber-50 ' >
        <input  type="text" value={input} disabled={completed} onChange={(e)=>{ setInput(e.target.value)} } placeholder="Guess your answer" className=' p-3 md:p-5 text-sm md:text-base ' />
        <button type="submit" className=' px-3 py-2 md:px-4 md:py-3 text-sm md:text-base bg-amber-300 rounded' >Submit</button>
       </form>  
       {/* --------answer section */}
       <div className='flex flex-col gap-2 md:flex-row flex-wrap md:gap-5 justify-around w-full md:mt-3 '>
     
            <p className={` border-2 answer-box ${ answers[0] !== '' && !completed ? 'bg-green-700 text-white' : 'bg-gray-500 text-white' } `}>{answers[0] || ' '}  </p>
            <p className={` border-2 answer-box ${ answers[1] !== '' && !completed ? 'bg-green-700 text-white' : 'bg-gray-500 text-white' } `}>{answers[1] || ' '}  </p>
            <p className={` border-2 answer-box ${ answers[2] !== '' && !completed ? 'bg-green-700 text-white' : 'bg-gray-500 text-white' } `}>{answers[2] || ' '}  </p>
     
       
       </div>
       {/* Guessed word */}
       <div className='flex flex-row gap-2 md:gap-4 flex-wrap items-center text-sm md:text-base md:mt-10'>
        {
          guessWord.length > 0 && <p> Guessed Word:</p>
        }
      {guessWord.length > 0 && guessWord.map((word, index) => (
          <span key={index}className={`py-1 px-3 md:px-4 md:py-2 rounded text-white text-sm md:text-base ${answers.includes(word) ? 'bg-blue-400' : 'bg-gray-400' }`}>
        {word}
      </span>
       ))
        }
        </div>
        {/* <NextQuestionButton onNext={handleTrigger} /> */}
        <AnimatedPopup show={completed} onNext={handleTrigger} />

        </section>
   
    {/* rest of question UI */}
  </motion.div>
</AnimatePresence>
       </>}
      </>
    )
  }

export default Qna