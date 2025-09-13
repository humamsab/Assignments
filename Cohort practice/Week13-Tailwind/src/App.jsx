import Logo from "./components/Logo";   
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { useState } from "react";

function App() {
  const [birthYear, setBirthYear] = useState("")

  return (
    <div className="h-screen bg-blue-700 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-8">
    <Logo />
    <h1 className="text-2xl font-bold text-white ">
      <span className="text-white ">Webinar.gg</span>
    </h1>
  </div>

        
  <h2 className="text-xl font-semibold text-white mb-2">
    Verify Your Age
  </h2>

        
  <p className="text-gray-300 text-sm mb-6">
    Please confirm your birth year. This data will not be stored.
  </p>

        
         <div className="flex flex-col gap-4 w-full max-w-xs">
          <Input 
            type="text" 
            placeholder="Your Birth Year" 
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
          <Button disabled={!birthYear}>Continue</Button>
        </div>
      </div>
  );
}

export default App;
