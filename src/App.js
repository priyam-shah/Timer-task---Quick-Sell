import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const defaultState = {
    time: 11,
  };

  const [time, setTime] = useState(defaultState.time);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      // decrement timer every second
      const timer = setTimeout(() => {
        if (time > 0) setTime(time - 1);
      }, 1000);

      // clear timer
      return () => clearTimeout(timer);
    }
  }, [isRunning, time]);

  const resetTimer = () => {
    setTime(defaultState.time);
    setIsRunning(false);
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes}:${seconds}`;
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  return (
    <div className="root">
      <div className="timeContainer">
        <div className={`time ${time <= 10 ? "time-highlight" : ""}`}>
          {formatTime(time)}
        </div>
      </div>

      <div className="buttonContainer">
        {/* Start timer button */}
        <button
          className="button"
          name="start"
          disabled={isRunning}
          onClick={startTimer}
        >
          Start
        </button>

        {/* Stop timer button */}
        <button
          name="stop"
          className="button"
          disabled={!isRunning}
          onClick={stopTimer}
        >
          Stop
        </button>

        {/* Reset timer button */}
        <button name="reset" className="button" onClick={resetTimer}>
          Reset
        </button>
      </div>

      {/* set time */}
      <div className="time-input">
        <h2 className="time-input-text">Set Time </h2>
        <input
          name="time"
          type="number"
          className="time-input-box"
          disabled={isRunning} // disable input when timer is running
          onChange={(e) => setTime(e.target.value)} // set time
        />
      </div>
    </div>
  );
}

export default App;
