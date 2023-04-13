import { useState, useEffect } from "react";

function App() {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const storedClicks = localStorage.getItem("clicks");
    if (storedClicks) {
      setClicks(parseInt(storedClicks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clicks", clicks.toString());
  }, [clicks]);

  const handleClick = () => {
    setClicks((prevClicks) => prevClicks + 1);
  };

  return (
    <div>
      <h1>Click count: {clicks}</h1>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

export default App;
