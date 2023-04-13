import { useState, useEffect } from "react";

function App() {
  const [clicks, setClicks] = useState(0);
  const [clickData, setClickData] = useState({});

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
    const geo = window.navigator.geolocation;
    geo.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setClickData((prevData) => {
          const key = `${latitude.toFixed(2)},${longitude.toFixed(2)}`;
          const value = (prevData[key] || 0) + 1;
          return { ...prevData, [key]: value };
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div>
      <h1>Click count: {clicks}</h1>
      <button onClick={handleClick}>Click me!</button>
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(clickData).map(([location, clicks]) => (
            <tr key={location}>
              <td>{location}</td>
              <td>{clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
