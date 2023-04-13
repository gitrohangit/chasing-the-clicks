import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [clicks, setClicks] = useState(0);
  const [clickData, setClickData] = useState({});

  useEffect(() => {
    const storedClicks = localStorage.getItem("clicks");
    if (storedClicks) {
      setClicks(parseInt(storedClicks));
    }

    const storedClickData = localStorage.getItem("clickData");
    if (storedClickData) {
      setClickData(JSON.parse(storedClickData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clicks", clicks.toString());
    localStorage.setItem("clickData", JSON.stringify(clickData));
  }, [clicks, clickData]);

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
    <div className="container">
      <h1 className="title">Chasing the Clicks</h1>
      <p className="subtitle">Click the button and see where the clicks come from!</p>
      <div className="click-wrapper">
        <button className="click-button" onClick={handleClick}>
          Click me!
        </button>
        <span className="click-count">{clicks}</span>
      </div>
      <table className="click-table">
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
