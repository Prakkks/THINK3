
import { useState } from "react";
import HomePage from "./Component/homePage";
import Qna from "./Component/qna";

const App = () =>{
    const [started, setStarted] = useState(false);

  return(
    <>
     {!started ? (
      <HomePage onStart={() => setStarted(true)} />
    ) : (
      <div>
        <Qna  />
      </div>
    )}
    </>
      )
}

export default App