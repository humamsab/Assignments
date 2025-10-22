import { useEffect, useState } from "react"


function App() {
  let [counterVisible, setCounterVisible] = useState(true);

  useEffect(function() {
    setInterval(function(){
      setCounterVisible(c => !c)
    }, 5000);
  }, []);

  return <div>
  Hi
  { counterVisible && <Counter></Counter>}
  Hello
</div>
}



function Counter() {
  const [count, setCount] = useState(0);


  useEffect(function() {
    console.log("on mount");
    let clock = setInterval(function(){
      console.log("from inside setInterval") 
    setCount(count => count + 1);
  }, 1000);

  return function() {
    console.log("on unmount");
    clearInterval(clock);
  }
  }, []);
  
  function increseCounter() {
    setCount(count + 1);
  }
 
  
  
  return <div>
    <h1 id="text">{count}</h1>
    <button onClick={increseCounter}>Increase Counter</button>
  </div>
}

export default App
