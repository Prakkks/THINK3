import { useMediaQuery } from "usehooks-ts";

interface Props {
    times: number;
  }
  
  const TimeCounter = ({ times }: Props) => {
    const isSmall = useMediaQuery('(max-width: 640px)');     // Mobile
    const isMedium = useMediaQuery('(min-width: 641px) and (max-width: 1023px)'); // Tablet
    const isLarge = useMediaQuery('(min-width: 1024px)');    // Desktop
  return (
    <div className="flex flex-col items-center gap-4 p-6">
    <div className="relative w-32 h-32">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r= { isSmall ? '20' :"34"}
          stroke="#e5e7eb"
          strokeWidth={ isSmall ? '7' :"10"}
          fill='none'
        />
        <circle
          cx="64"
          cy="64"
          r={ isSmall ? '20' :"34"}
          stroke= { (times > 10) ? "#10b981" : "#ff0000" }
          strokeWidth={ isSmall ? '7' :"10"}
          fill="none"
          strokeDasharray="213.628" // Use proper value = 2 * π * r
          strokeDashoffset={(1 - times / 60) * 213.628}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-light md:text-2xl md:font-bold  text-gray-800">
      { times}
      </div>
      </div>
    </div>    
             
   
  )
}

export default TimeCounter